import './ImageContainer.css';

const ImageContainer = ({ imgContain, classes, src }: any) => {
  return (
    <div className={imgContain}>
      <img className={classes} alt="snakeladder" src={src}></img>
    </div>
  );
};

export default ImageContainer;
