import Image from "next/image";
import { useEffect, useState } from "react";

const FallbackImage = ({
  src,
  alt,
  ...props
}: {
  src: StaticImageData | string;
  alt: string;
}) => {
  // StaticImageData is for direct import from local file
  // Guessing string is the one for online extraction e.g. IPFS image
  const [imageSrc, setImageSrc] = useState<StaticImageData | string>();

  useEffect(() => {
    setImageSrc(src);
  }, [src]);

  return (
    <Image
      src={imageSrc ? imageSrc : "/assets/misc/image_not_found.svg"}
      alt={alt}
      layout="fill"
      {...props}
    />
  );
};

export default FallbackImage;
