/**
 * Site Configuration
 * 
 * Central configuration for the headless storefront.
 * This file contains all configurable aspects of the site
 * that might need to be changed between environments or for migration.
 */

export interface SiteConfig {
  /**
   * Core site information
   */
  site: {
    /** Site name displayed in title, meta tags, etc. */
    name: string;
    /** Primary domain for the site (without protocol) */
    domain: string;
    /** Full URL to the site (with protocol) */
    url: string;
    /** Site description for meta tags */
    description: string;
    /** Default site logo path (relative to WP uploads or absolute URL) */
    logo: string;
  };
  
  /**
   * CMS integration configuration
   */
  cms: {
    /** WordPress base URL */
    wpUrl: string;
    /** GraphQL endpoint for WordPress */
    graphqlEndpoint: string;
    /** WooCommerce Store API base path */
    storeApiPath: string;
    /** Image upload directory pattern for remotePatterns config */
    uploadPath: string;
  };
  
  /**
   * Localization settings
   */
  localization: {
    /** Default language code (HTML lang attribute) */
    language: string;
    /** Default locale for OpenGraph and schema.org */
    locale: string;
    /** Number formatting locale */
    numberFormat: string;
    /** Default currency code */
    currency: string;
    /** Default currency symbol */
    currencySymbol: string;
  };
  
  /**
   * Analytics configuration
   */
  analytics: {
    /** Google Analytics 4 Measurement ID */
    ga4Id?: string;
    /** Other analytics providers */
    providers?: Record<string, any>;
  };
  
  /**
   * Social media accounts
   */
  social: {
    /** Facebook page username */
    facebook?: string;
    /** Twitter/X handle (without @) */
    twitter?: string;
    /** Instagram handle */
    instagram?: string;
  };
  
  /**
   * Cache configuration
   */
  cache: {
    /** Default revalidation time in seconds */
    defaultRevalidate: number;
    /** Revalidation times for different entity types (in seconds) */
    revalidationTimes: {
      product: number;
      category: number;
      collection: number;
      page: number;
    };
  };
}

/**
 * Default site configuration
 * Override with environment variables where needed
 */
export const siteConfig: SiteConfig = {
  site: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'Mae Thuan Store',
    domain: process.env.NEXT_PUBLIC_DOMAIN || 'localhost:3000',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION || 'Your trusted online shopping destination in Thailand',
    logo: process.env.NEXT_PUBLIC_SITE_LOGO || '/logo.png',
  },
  
  cms: {
    wpUrl: process.env.NEXT_PUBLIC_WP_URL || 'https://demo.wp.com',
    graphqlEndpoint: process.env.WP_GRAPHQL_ENDPOINT || 'https://demo.wp.com/graphql',
    storeApiPath: '/wp-json/wc/store/v1',
    uploadPath: '/wp-content/uploads/**',
  },
  
  localization: {
    language: process.env.NEXT_PUBLIC_LANGUAGE || 'th',
    locale: process.env.NEXT_PUBLIC_LOCALE || 'th_TH',
    numberFormat: process.env.NEXT_PUBLIC_NUMBER_FORMAT || 'th-TH',
    currency: process.env.NEXT_PUBLIC_CURRENCY || 'THB',
    currencySymbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL || '฿',
  },
  
  analytics: {
    ga4Id: process.env.NEXT_PUBLIC_GA4_ID,
  },
  
  social: {
    facebook: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK,
    twitter: process.env.NEXT_PUBLIC_SOCIAL_TWITTER,
    instagram: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM,
  },
  
  cache: {
    defaultRevalidate: 60, // 1 minute
    revalidationTimes: {
      product: 300, // 5 minutes
      category: 300, // 5 minutes
      collection: 300, // 5 minutes
      page: 3600, // 1 hour
    },
  },
};

/**
 * Helper functions for configuration
 */

/** Get full URL with protocol */
export function getFullUrl(path: string = ''): string {
  const baseUrl = siteConfig.site.url.replace(/\/$/, '');
  const cleanPath = path.replace(/^\//, '');
  return cleanPath ? `${baseUrl}/${cleanPath}` : baseUrl;
}

/** Format price with Thai Baht currency */
export function formatPrice(
  amount: number,
  options: Intl.NumberFormatOptions = {}
): string {
  return new Intl.NumberFormat(siteConfig.localization.numberFormat, {
    style: 'currency',
    currency: siteConfig.localization.currency,
    ...options,
  }).format(amount);
}

/** Get image configuration for Next.js */
export function getImageConfig() {
  return {
    remotePatterns: [
      {
        protocol: 'https' as const,
        hostname: siteConfig.cms.wpUrl.replace(/^https?:\/\//, ''),
        pathname: siteConfig.cms.uploadPath,
      },
      {
        protocol: 'https' as const,
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
      {
        protocol: 'https' as const,
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
  };
}