import { useState } from "react";
import "./App.css";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import SearchBar from "./components/SearchBar/SearchBar";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { getImages } from "./apiService/unsplash";
import ImageModal from "./components/ImageModal /ImageModal";
import { ImageItem, UnsplashImage, UnsplashResponse } from "./types";

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState("");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  //  Функція для пошуку зображень
  const handleSearch = async (newQuery: string): Promise<void> => {
    setQuery(newQuery);
    setPage(1);
    setLoading(true);
    setError("");
    try {
      const data: UnsplashResponse = await getImages(newQuery, 1);
      setImages(formatImages(data.results));
    } catch {
      setError("Failed to load images.");
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async (): Promise<void> => {
    const nextPage = page + 1;
    setLoading(true);
    try {
      const data: UnsplashResponse = await getImages(query, nextPage);
      setImages((prev) => [...prev, ...formatImages(data.results)]);
      setPage(nextPage);
    } catch {
      setError("Failed to load more images.");
    } finally {
      setLoading(false);
    }
  };

  const formatImages = (results: UnsplashImage[]): ImageItem[] =>
    results.map((img) => ({
      id: img.id,
      url: img.urls.small,
      alt: img.alt_description || "Image",
      fullUrl: img.urls.regular,
      author: img.user.name,
      likes: img.likes,
      description: img.description || img.alt_description || "No description",
    }));

  const openModal = (imageData: ImageItem) => {
    setSelectedImage(imageData);
    setIsModalOpen(true);
  };

  const closeModal = (): void => {
    setIsModalOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery imageList={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {isModalOpen && selectedImage && (
        <ImageModal
          isOpen={isModalOpen}
          onClose={closeModal}
          image={selectedImage}
        />
      )}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
    </>
  );
}

export default App;
