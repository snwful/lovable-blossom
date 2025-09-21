import { GraphQLClient } from 'graphql-request';
import { siteConfig } from '@headless-storefront/config';

// Create GraphQL client instance
export const wpGraphQLClient = new GraphQLClient(siteConfig.cms.graphqlEndpoint, {
  headers: {
    'Content-Type': 'application/json',
  },
});

// Product queries
export const GET_PRODUCTS = `
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

export const GET_PRODUCT_BY_SLUG = `
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

export const GET_PRODUCT_CATEGORIES = `
  query GetProductCategories($first: Int = 20) {
    productCategories(first: $first, where: { hideEmpty: true }) {
      nodes {
        databaseId
        slug
        name
        description
        count
        image {
          sourceUrl
          altText
        }
        parent {
          node {
            slug
            name
          }
        }
      }
    }
  }
`;

// Helper functions
export const fetchProducts = async (variables = {}) => {
  try {
    const data = await wpGraphQLClient.request(GET_PRODUCTS, variables);
    return data.products;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const fetchProductBySlug = async (slug: string) => {
  try {
    const data = await wpGraphQLClient.request(GET_PRODUCT_BY_SLUG, { slug });
    return data.product;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

export const fetchProductCategories = async () => {
  try {
    const data = await wpGraphQLClient.request(GET_PRODUCT_CATEGORIES);
    return data.productCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Types
export interface WPProduct {
  databaseId: number;
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  regularPrice?: string;
  salePrice?: string;
  onSale: boolean;
  stockStatus: string;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
  galleryImages?: {
    nodes: Array<{
      sourceUrl: string;
      altText?: string;
    }>;
  };
  productCategories?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  price?: string;
  variations?: {
    nodes: Array<{
      databaseId: number;
      name: string;
      price?: string;
      salePrice?: string;
      stockStatus: string;
      attributes?: {
        nodes: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
}

export interface WPCategory {
  databaseId: number;
  slug: string;
  name: string;
  description?: string;
  count: number;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
  parent?: {
    node: {
      slug: string;
      name: string;
    };
  };
}