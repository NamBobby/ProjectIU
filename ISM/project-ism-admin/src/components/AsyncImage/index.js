import React from "react";
import ContentLoader from "react-content-loader";
import "./styles.scss";

const Loading = () => (
  <ContentLoader
    speed={2}
    width={800}
    height={860}
    viewBox="0 0 800 860"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="-38" y="0" rx="2" ry="2" width="860" height="860" />
  </ContentLoader>
);

const AsyncImage = (props) => {
  const [loadedSrc, setLoadedSrc] = React.useState(null);
  React.useEffect(() => {
    setLoadedSrc(null);
    if (props.src) {
      const handleLoad = () => {
        setLoadedSrc(props.src);
      };
      const image = new Image();
      image.addEventListener("load", handleLoad);
      image.src = props.src;
      return () => {
        image.removeEventListener("load", handleLoad);
      };
    }
  }, [props.src]);
  if (loadedSrc === props.src) {
    return <img {...props} />;
  }
  return (
    <div className={"aync-image-loading " + props?.placeholderClassName}>
      <Loading />
    </div>
  );
};
export default AsyncImage;
