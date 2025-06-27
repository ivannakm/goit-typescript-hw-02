import axios from "axios";
import { UnsplashResponse } from "../types";

const API_KEY = "wNo0jGutdELg527MuZB1xWr_keHlbUqqHygbGT-htEg";
const BASE_URL = "https://api.unsplash.com";

// Параметри функції getImages
type GetImagesParams = {
  query: string;
  page?: number;
  perPage?: number;
};
export const getImages = async (
  query: string,
  page: number = 1,
  perPage: number = 12
): Promise<UnsplashResponse> => {
  const { data } = await axios.get<UnsplashResponse>(
    `${BASE_URL}/search/photos`,
    {
      params: {
        query,
        page,
        per_page: perPage,
        client_id: API_KEY,
      },
    }
  );
  return data;
};
