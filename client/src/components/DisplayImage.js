import React, { useEffect, useState } from "react";

const DisplayImage = ({ blob }) => {
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    if (blob) {
      const url = URL.createObjectURL(blob);
      setImageUrl(url);
    }
  }, [blob]);

  return <img src={imageUrl} alt="product image" />;
};

export default DisplayImage;
