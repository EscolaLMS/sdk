import React, { useContext, useRef, useLayoutEffect, useCallback, useMemo, useState } from "react";
import { EscolaLMSContext } from "../../context";
import { getImageApiPath, getImageCachePath } from "./utils";

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  path: string;
  size?: number;
  srcSizes?: number[];
  alt?: string;
}

interface SizeObj {
  cachePath: string;
  apiPath: string;
  size?: number;
  inCache: boolean;
  isDefault: boolean;
}

const getSrc = (sizeObj: SizeObj) => (sizeObj.inCache ? sizeObj.cachePath : sizeObj.apiPath);

const getSrcSet = (srcSetPaths: SizeObj[] = []) =>
  srcSetPaths.map((srcSetPath) => `${getSrc(srcSetPath)} ${srcSetPath.size}w`).join(",");

const Image: React.FC<ImageProps> = ({ path, size, srcSizes, alt = "LMS Image", ...props }) => {
  const { apiUrl } = useContext(EscolaLMSContext);
  const imgRef = useRef<HTMLImageElement>(null);
  const imgSize = useMemo(() => (srcSizes?.[0] ? srcSizes[0] : size), [size, srcSizes]); // can be undefined
  const [shouldGenerate, setShouldGenerate] = useState<boolean>(true);

  const getSizeObj = useCallback(
    (size?: number, isDefault: boolean = false) => ({
      // super important that all param values are strings
      cachePath: getImageCachePath(apiUrl, path, size ? { w: size.toString() } : undefined),
      apiPath: getImageApiPath(apiUrl, path, size ? { w: size.toString() } : undefined),
      size: size,
      inCache: true,
      isDefault,
    }),
    [apiUrl, path],
  );

  // array of all sizes
  const [sizesPaths, setSizesPaths] = useState<SizeObj[]>([
    getSizeObj(imgSize, true),
    ...(srcSizes || []).map((ss) => getSizeObj(ss)),
  ]);

  const src = useMemo<string>(
    () => getSrc(sizesPaths.find((path) => path.isDefault)!),
    [sizesPaths],
  );
  const srcSet = useMemo<string>(
    () => getSrcSet(sizesPaths.filter((path) => !path.isDefault)),
    [sizesPaths],
  );

  useLayoutEffect(() => {
    if (!shouldGenerate) {
      return;
    }
    if (imgRef.current !== null) {
      imgRef.current.onerror = (error) => {
        if (imgRef.current !== null) {
          const currentSrc = imgRef.current.currentSrc;

          // if img is not cached yet, then use generator url
          if (sizesPaths.some((sp) => sp.cachePath === currentSrc)) {
            setShouldGenerate(false);
            setSizesPaths(
              sizesPaths.map((sizeObj) => {
                if (sizeObj.cachePath !== currentSrc) return sizeObj;

                return {
                  ...sizeObj,
                  inCache: false,
                };
              }),
            );
          }
        }
      };
    }
  }, []);

  return (
    <div className="escolalms-image">
      <img
        ref={imgRef}
        src={src}
        srcSet={srcSet !== "" ? srcSet : undefined}
        alt={alt}
        {...props}
      />
    </div>
  );
};

export default Image;
