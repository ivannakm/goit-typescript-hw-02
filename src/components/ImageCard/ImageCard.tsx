import css from "./ImageCard.module.css";

type ImageCardProps = {
  src: string;
  alt: string;
};

const ImageCard: React.FC<ImageCardProps> = ({ src, alt }) => {
  return (
    <div className={css.imageWrapper}>
      <img src={src} alt={alt} loading="lazy" className={css.image} />
    </div>
  );
};

export default ImageCard;
