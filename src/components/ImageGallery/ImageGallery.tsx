import css from "./ImageGallery.module.css";
import ImageCard from "../ImageCard/ImageCard";
import { ImageItem } from "../../types";

type ImageGalleryProps = {
  imageList: ImageItem[];
  onImageClick: (image: ImageItem) => void;
};

const ImageGallery: React.FC<ImageGalleryProps> = ({
  imageList,
  onImageClick,
}) => {
  if (!imageList || imageList.length === 0) return null;

  return (
    <ul className={css.gallery}>
      {imageList.map((item) => (
        <li key={item.id} className={css.galleryItem}>
          <div onClick={() => onImageClick(item)}>
            <ImageCard src={item.url} alt={item.alt} />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
