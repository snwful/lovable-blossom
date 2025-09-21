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

const GET_PRODUCT_CATEGORIES = `
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

const fetchProductCategories = async () => {
  try {
    const data = await wpGraphQLClient.request(GET_PRODUCT_CATEGORIES);
    return data.productCategories;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchProductCategories(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};