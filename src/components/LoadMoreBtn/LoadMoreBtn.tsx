import css from "./LoadMoreBtn.module.css";

type LoadMoreBtnProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const LoadMoreBtn: React.FC<LoadMoreBtnProps> = ({ onClick }) => {
  return (
    <button className={css.loadMoreBtn} type="button" onClick={onClick}>
      Load More
    </button>
  );
};

export default LoadMoreBtn;
