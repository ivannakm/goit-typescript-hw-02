// Base image format used in your UI components
export type ImageItem = {
  id: string;
  url: string;
  fullUrl: string;
  alt: string;
  author: string;
  likes: number;
  description: string;
};

// Raw image format returned by Unsplash API
export type UnsplashImage = {
  id: string;
  alt_description: string | null;
  description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  user: {
    name: string;
    portfolio_url: string | null;
  };
  likes: number;
};

// Structure of Unsplash API response
export type UnsplashResponse = {
  total: number;
  total_pages: number;
  results: UnsplashImage[];
};
