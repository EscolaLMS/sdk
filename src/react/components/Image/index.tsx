import React, {
  useContext,
  useRef,
  useLayoutEffect,
  useCallback,
  useMemo,
  useState,
} from "react";
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

const getSrc = (sizeObj: SizeObj) =>
  sizeObj.inCache ? sizeObj.cachePath : sizeObj.apiPath;

const getSrcSet = (srcSetPaths: SizeObj[] = []) =>
  srcSetPaths
    .map((srcSetPath) => `${getSrc(srcSetPath)} ${srcSetPath.size}w`)
    .join(",");

const Image: React.FC<ImageProps> = ({
  path,
  size,
  srcSizes,
  alt = "LMS Image",
  ...props
}) => {
  const { apiUrl, getImagePrefix } = useContext(EscolaLMSContext);

  const imgRef = useRef<HTMLImageElement>(null);
  const imgSize = useMemo(
    () => (srcSizes?.[0] ? srcSizes[0] : size),
    [size, srcSizes]
  ); // can be undefined

  const getSizeObj = useCallback(
    (size?: number, isDefault: boolean = false) => ({
      // super important that all param values are strings
      cachePath: getImageCachePath(
        path,
        size ? { w: size.toString() } : undefined,
        getImagePrefix()
      ),
      apiPath: getImageApiPath(
        apiUrl,
        path,
        size ? { w: size.toString() } : undefined
      ),
      size: size,
      inCache: true,
      isDefault,
    }),
    [apiUrl, path]
  );

  // array of all sizes
  const [sizesPaths, setSizesPaths] = useState<SizeObj[]>([
    getSizeObj(imgSize, true),
    ...(srcSizes || []).map((ss) => getSizeObj(ss)),
  ]);

  const src = useMemo<string>(
    () => getSrc(sizesPaths.find((path) => path.isDefault)!),
    [sizesPaths]
  );
  const srcSet = useMemo<string>(
    () => getSrcSet(sizesPaths.filter((path) => !path.isDefault)),
    [sizesPaths]
  );

  useLayoutEffect(() => {
    if (imgRef.current !== null) {
      imgRef.current.onerror = (error) => {
        if (imgRef.current !== null) {
          const currentSrc = imgRef.current.currentSrc;
          imgRef.current.onerror = null;

          // if img is not cached yet, then use generator url
          if (sizesPaths.some((sp) => sp.cachePath === currentSrc)) {
            setSizesPaths(
              sizesPaths.map((sizeObj) => {
                if (sizeObj.cachePath !== currentSrc) return sizeObj;

                return {
                  ...sizeObj,
                  inCache: false,
                };
              })
            );
          }
        }
      };
    }
  }, []);

  if (path.includes(".svg")) {
    return (
      <div className="escolalms-image">
        <img
          loading={"lazy"}
          ref={imgRef}
          src={`${getImagePrefix()}${path}}`}
          alt={alt}
          {...props}
        />
      </div>
    );
  }

  return (
    <div className="escolalms-image">
      <img
        loading={"lazy"}
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
