import { useQuery } from '@tanstack/react-query';

// WordPress GraphQL client - simplified version for testing
const WP_GRAPHQL_ENDPOINT = 'https://www.maethuan.com/graphql';

const wpGraphQLClient = {
  request: async (query: string, variables = {}) => {
    const response = await fetch(WP_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL Error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(result.errors[0]?.message || 'GraphQL query failed');
    }
    
    return result.data;
  }
};

// Product queries
const GET_PRODUCTS = `
  query GetProducts($first: Int = 12, $after: String) {
    products(first: $first, after: $after, where: { status: "publish" }) {
      nodes {
        databaseId
        slug
        name
        shortDescription
        description
        regularPrice
        salePrice
        onSale
        stockStatus
        image {
          sourceUrl
          altText
        }
        galleryImages {
          nodes {
            sourceUrl
            altText
          }
        }
        productCategories {
          nodes {
            name
            slug
          }
        }
        ... on SimpleProduct {
          price
        }
        ... on VariableProduct {
          price
          variations {
            nodes {
              databaseId
              name
              price
              salePrice
              stockStatus
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
`;

const GET_PRODUCT_BY_SLUG = `
  query GetProductBySlug($slug: ID!) {
    product(id: $slug, idType: SLUG) {
      databaseId
      slug
      name
      shortDescription
      description
      regularPrice
      salePrice
      onSale
      stockStatus
      image {
        sourceUrl
        altText
      }
      galleryImages {
        nodes {
          sourceUrl
          altText
        }
      }
      productCategories {
        nodes {
          name
          slug
        }
      }
      ... on SimpleProduct {
        price
      }
      ... on VariableProduct {
        price
        variations {
          nodes {
            databaseId
            name
            price
            salePrice
            stockStatus
            attributes {
              nodes {
                name
                value
              }
            }
          }
        }
      }
    }
  }
`;

// Helper functions
const fetchProducts = async (variables = {}) => {
  try {
    const data = await wpGraphQLClient.request(GET_PRODUCTS, variables);
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

const fetchProductBySlug = async (slug: string) => {
  try {
    const data = await wpGraphQLClient.request(GET_PRODUCT_BY_SLUG, { slug });
    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// React Query hooks
export const useProducts = (variables = {}) => {
  return useQuery({
    queryKey: ['products', variables],
    queryFn: () => fetchProducts(variables),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (slug: string) => {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: () => fetchProductBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
  });
};

export const useFlashSaleProducts = () => {
  return useQuery({
    queryKey: ['products', 'flash-sale'],
    queryFn: () => fetchProducts({ first: 8 }),
    staleTime: 2 * 60 * 1000, // 2 minutes for flash sale
  });
};