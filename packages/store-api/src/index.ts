import { siteConfig } from '@headless-storefront/config';

class StoreAPIClient {
  private baseUrl: string;
  private headers: HeadersInit;

  constructor() {
    this.baseUrl = siteConfig.cms.storeApiPath;
    this.headers = {
      'Content-Type': 'application/json',
    };
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    const response = await fetch(url, {
      headers: this.headers,
      ...options,
    });

    if (!response.ok) {
      throw new Error(`Store API Error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  // Cart endpoints
  async getCart() {
    return this.request('/cart');
  }

  async addToCart(productId: number, quantity: number = 1, variation: any[] = []) {
    return this.request('/cart/add-item', {
      method: 'POST',
      body: JSON.stringify({
        id: productId,
        quantity,
        variation,
      }),
    });
  }

  async updateCartItem(key: string, quantity: number) {
    return this.request(`/cart/items/${key}`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeCartItem(key: string) {
    return this.request(`/cart/items/${key}`, {
      method: 'DELETE',
    });
  }

  async clearCart() {
    return this.request('/cart/items', {
      method: 'DELETE',
    });
  }

  // Checkout endpoints
  async createOrder(orderData: any) {
    return this.request('/checkout', {
      method: 'POST',
      body: JSON.stringify(orderData),
    });
  }

  async getShippingMethods() {
    return this.request('/cart/shipping-rates');
  }

  async applysCoupon(code: string) {
    return this.request('/cart/coupons', {
      method: 'POST',
      body: JSON.stringify({ code }),
    });
  }

  async removeCoupon(code: string) {
    return this.request(`/cart/coupons/${code}`, {
      method: 'DELETE',
    });
  }

  // Products endpoints (Store API also provides product data)
  async getProducts(params: URLSearchParams = new URLSearchParams()) {
    return this.request(`/products?${params.toString()}`);
  }

  async getProduct(id: number) {
    return this.request(`/products/${id}`);
  }

  async getProductCategories() {
    return this.request('/products/categories');
  }
}

export const storeApiClient = new StoreAPIClient();

// Types
export interface CartItem {
  key: string;
  id: number;
  quantity: number;
  name: string;
  short_description: string;
  description: string;
  sku: string;
  low_stock_remaining: number | null;
  backorders_allowed: boolean;
  show_backorder_badge: boolean;
  sold_individually: boolean;
  permalink: string;
  images: Array<{
    id: number;
    src: string;
    thumbnail: string;
    srcset: string;
    sizes: string;
    name: string;
    alt: string;
  }>;
  variation: Array<{
    attribute: string;
    value: string;
  }>;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: string | null;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
    raw_prices: {
      precision: number;
      price: string;
      regular_price: string;
      sale_price: string;
    };
  };
  totals: {
    line_subtotal: string;
    line_subtotal_tax: string;
    line_total: string;
    line_total_tax: string;
    currency_code: string;
    currency_symbol: string;
    currency_minor_unit: number;
    currency_decimal_separator: string;
    currency_thousand_separator: string;
    currency_prefix: string;
    currency_suffix: string;
  };
}