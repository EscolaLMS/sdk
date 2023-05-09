import React, {
  useContext,
  useCallback,
  useMemo,
  useState,
  forwardRef,
} from "react";
import { EscolaLMSContext } from "../../context";

import { getImageApiPath, getImageCachePath } from "./utils";

interface ImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "onError"> {
  path: string;
  size?: number;
  srcSizes?: number[];
  alt?: string;
  format?: string;
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

const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    { path, size, srcSizes, alt = "LMS Image", format = "webp", ...props },
    imgRef
  ) => {
    const [cached, setCached] = useState(false);
    const { apiUrl, getImagePrefix, getImageSvgPrefix } = useContext(EscolaLMSContext);

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
          getImagePrefix(),
          format
        ),
        apiPath: getImageApiPath(
          apiUrl,
          path,
          size ? { w: size.toString() } : undefined,
          format
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

    const onError = useCallback(
      (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const currentSrc = e.currentTarget.currentSrc;
        setCached(true);

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
      },
      [sizesPaths]
    );

    if (path.includes(".svg")) {
      return (
        <div className="escolalms-image">
          <img
            loading={"lazy"}
            ref={imgRef}
            onError={cached ? undefined : onError}
            src={`${getImageSvgPrefix()}${path}`}
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
          onError={cached ? undefined : onError}
          src={src}
          srcSet={srcSet !== "" ? srcSet : undefined}
          alt={alt}
          {...props}
        />
      </div>
    );
  }
);

export default Image;
