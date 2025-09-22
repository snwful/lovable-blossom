// Enhanced WordPress GraphQL client with better error handling and type safety

const WP_GRAPHQL_ENDPOINT = 'https://www.maethuan.com/graphql';

interface GraphQLError {
  message: string;
  locations?: Array<{ line: number; column: number }>;
  path?: string[];
}

interface GraphQLResponse<T = any> {
  data?: T;
  errors?: GraphQLError[];
  extensions?: any;
}

// Enhanced GraphQL client with better error handling
export const wpGraphQLClient = {
  request: async <T = any>(query: string, variables: Record<string, any> = {}): Promise<T> => {
    try {
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
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }

      const result: GraphQLResponse<T> = await response.json();
      
      if (result.errors && result.errors.length > 0) {
        const errorMessage = result.errors
          .map(error => error.message)
          .join(', ');
        throw new Error(`GraphQL Error: ${errorMessage}`);
      }
      
      if (!result.data) {
        throw new Error('No data received from GraphQL endpoint');
      }
      
      return result.data;
    } catch (error) {
      console.error('WordPress GraphQL Error:', error);
      throw error;
    }
  }
};

// Get Flash Sale Products Query
export const GET_FLASH_SALE_PRODUCTS = `
  query GetFlashSaleProducts($first: Int = 8) {
    products(first: $first, where: { status: "publish", onSale: true }) {
      nodes {
        databaseId
        slug
        name
        shortDescription
        onSale
        featured
        totalSales
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
    }
  }
`;

// Get Featured Products Query
export const GET_FEATURED_PRODUCTS = `
  query GetFeaturedProducts($first: Int = 8) {
    products(first: $first, where: { status: "publish", featured: true }) {
      nodes {
        databaseId
        slug
        name
        shortDescription
        onSale
        featured
        totalSales
        averageRating
        reviewCount
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
    }
  }
`;

// Get Products by Category Query
export const GET_PRODUCTS_BY_CATEGORY = `
  query GetProductsByCategory($categoryId: Int!, $first: Int = 12, $after: String) {
    products(
      first: $first, 
      after: $after, 
      where: { 
        status: "publish", 
        categoryId: $categoryId 
      }
    ) {
      nodes {
        databaseId
        slug
        name
        shortDescription
        onSale
        featured
        totalSales
        image {
          sourceUrl
          altText
        }
        productCategories {
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

// Enhanced Product interface with more complete data
export interface EnhancedWPProduct {
  databaseId: number;
  slug: string;
  name: string;
  shortDescription?: string;
  description?: string;
  onSale: boolean;
  featured?: boolean;
  totalSales?: number;
  averageRating?: number;
  reviewCount?: number;
  price?: string;
  regularPrice?: string;
  salePrice?: string;
  stockStatus?: 'IN_STOCK' | 'OUT_OF_STOCK' | 'ON_BACKORDER';
  stockQuantity?: number;
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
      databaseId?: number;
      name: string;
      slug: string;
      image?: {
        sourceUrl: string;
        altText?: string;
      };
    }>;
  };
  productTags?: {
    nodes: Array<{
      name: string;
      slug: string;
    }>;
  };
  variations?: {
    nodes: Array<{
      databaseId: number;
      name: string;
      price?: string;
      regularPrice?: string;
      salePrice?: string;
      stockStatus: string;
      stockQuantity?: number;
      attributes?: {
        nodes: Array<{
          name: string;
          value: string;
        }>;
      };
    }>;
  };
  // External product fields
  externalUrl?: string;
  buttonText?: string;
  // Group product fields
  addToCartText?: string;
  addToCartDescription?: string;
}

// Utility functions for price calculations
export const getProductPrice = (product: EnhancedWPProduct): number => {
  const salePrice = parseFloat(product.salePrice || '0');
  const regularPrice = parseFloat(product.regularPrice || '0');
  const price = parseFloat(product.price || '0');
  
  if (product.onSale && salePrice > 0) {
    return salePrice;
  }
  
  return price > 0 ? price : regularPrice;
};

export const getProductOriginalPrice = (product: EnhancedWPProduct): number | null => {
  if (!product.onSale) return null;
  
  const regularPrice = parseFloat(product.regularPrice || '0');
  return regularPrice > 0 ? regularPrice : null;
};

export const getProductDiscount = (product: EnhancedWPProduct): number => {
  const currentPrice = getProductPrice(product);
  const originalPrice = getProductOriginalPrice(product);
  
  if (!originalPrice || currentPrice >= originalPrice) return 0;
  
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

// Format Thai Baht currency
export const formatTHB = (amount: number): string => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Check if product is in stock
export const isProductInStock = (product: EnhancedWPProduct): boolean => {
  return product.stockStatus === 'IN_STOCK' && (product.stockQuantity || 0) > 0;
};

// Get product badges
export const getProductBadges = (product: EnhancedWPProduct): string[] => {
  const badges: string[] = [];
  
  if (product.featured) badges.push('แนะนำ');
  if (product.onSale) badges.push(`ลด ${getProductDiscount(product)}%`);
  if ((product.totalSales || 0) > 100) badges.push('ขายดี');
  if (!isProductInStock(product)) badges.push('สินค้าหมด');
  
  return badges;
};