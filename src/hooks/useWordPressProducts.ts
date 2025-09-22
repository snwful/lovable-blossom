import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { 
  wpGraphQLClient, 
  EnhancedWPProduct,
  GET_FLASH_SALE_PRODUCTS,
  GET_FEATURED_PRODUCTS,
  GET_PRODUCTS_BY_CATEGORY
} from '@/lib/wordpress';

// Import existing queries from useProducts
import { GET_PRODUCTS, GET_PRODUCT_BY_SLUG } from './useProducts';

interface ProductsResponse {
  products: {
    nodes: EnhancedWPProduct[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string | null;
      endCursor: string | null;
    };
  };
}

interface SingleProductResponse {
  product: EnhancedWPProduct;
}

// Enhanced products hook with better error handling
export const useWordPressProducts = (variables = {}): UseQueryResult<ProductsResponse> => {
  return useQuery({
    queryKey: ['wp-products', variables],
    queryFn: async () => {
      try {
        const data = await wpGraphQLClient.request<ProductsResponse>(GET_PRODUCTS, variables);
        return data;
      } catch (error) {
        console.error('Error fetching WordPress products:', error);
        // Return empty structure on error to prevent app crashes
        return {
          products: {
            nodes: [],
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
              endCursor: null,
            },
          },
        };
      }
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
};

// Flash sale products hook
export const useFlashSaleProducts = (): UseQueryResult<ProductsResponse> => {
  return useQuery({
    queryKey: ['wp-flash-sale-products'],
    queryFn: async () => {
      try {
        return await wpGraphQLClient.request<ProductsResponse>(GET_FLASH_SALE_PRODUCTS, { first: 8 });
      } catch (error) {
        console.error('Error fetching flash sale products:', error);
        return {
          products: {
            nodes: [],
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
              endCursor: null,
            },
          },
        };
      }
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 2,
  });
};

// Featured products hook
export const useFeaturedProducts = (): UseQueryResult<ProductsResponse> => {
  return useQuery({
    queryKey: ['wp-featured-products'],
    queryFn: async () => {
      try {
        return await wpGraphQLClient.request<ProductsResponse>(GET_FEATURED_PRODUCTS, { first: 8 });
      } catch (error) {
        console.error('Error fetching featured products:', error);
        return {
          products: {
            nodes: [],
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
              endCursor: null,
            },
          },
        };
      }
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

// Products by category hook
export const useProductsByCategory = (categoryId: number, variables = {}): UseQueryResult<ProductsResponse> => {
  return useQuery({
    queryKey: ['wp-products-by-category', categoryId, variables],
    queryFn: async () => {
      try {
        return await wpGraphQLClient.request<ProductsResponse>(GET_PRODUCTS_BY_CATEGORY, {
          categoryId,
          ...variables,
        });
      } catch (error) {
        console.error('Error fetching products by category:', error);
        return {
          products: {
            nodes: [],
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
              endCursor: null,
            },
          },
        };
      }
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};

// Single product hook
export const useWordPressProduct = (slug: string): UseQueryResult<EnhancedWPProduct | null> => {
  return useQuery({
    queryKey: ['wp-product', slug],
    queryFn: async () => {
      try {
        if (!slug) return null;
        const data = await wpGraphQLClient.request<SingleProductResponse>(GET_PRODUCT_BY_SLUG, { slug });
        return data.product;
      } catch (error) {
        console.error('Error fetching WordPress product:', error);
        return null;
      }
    },
    enabled: !!slug,
    staleTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
};

// Search products hook
export const useSearchProducts = (searchTerm: string, variables = {}): UseQueryResult<ProductsResponse> => {
  const SEARCH_PRODUCTS = `
    query SearchProducts($search: String!, $first: Int = 20) {
      products(first: $first, where: { status: "publish", search: $search }) {
        nodes {
          databaseId
          slug
          name
          shortDescription
          onSale
          featured
          image {
            sourceUrl
            altText
          }
          productCategories(first: 1) {
            nodes {
              name
              slug
            }
          }
          ... on SimpleProduct {
            price
            regularPrice
            salePrice
            stockStatus
            stockQuantity
          }
          ... on VariableProduct {
            price
            regularPrice
            salePrice
            stockStatus
            stockQuantity
          }
          ... on ExternalProduct {
            price
            regularPrice
            salePrice
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

  return useQuery({
    queryKey: ['wp-search-products', searchTerm, variables],
    queryFn: async () => {
      try {
        if (!searchTerm.trim()) {
          return {
            products: {
              nodes: [],
              pageInfo: {
                hasNextPage: false,
                hasPreviousPage: false,
                startCursor: null,
                endCursor: null,
              },
            },
          };
        }
        
        return await wpGraphQLClient.request<ProductsResponse>(SEARCH_PRODUCTS, {
          search: searchTerm,
          ...variables,
        });
      } catch (error) {
        console.error('Error searching WordPress products:', error);
        return {
          products: {
            nodes: [],
            pageInfo: {
              hasNextPage: false,
              hasPreviousPage: false,
              startCursor: null,
              endCursor: null,
            },
          },
        };
      }
    },
    enabled: !!searchTerm && searchTerm.trim().length > 0,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });
};