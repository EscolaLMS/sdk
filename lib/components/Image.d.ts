import React from "react";
interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    path: string;
    size?: number;
    srcSizes?: number[];
    alt?: string;
}
declare const Image: React.FC<ImageProps>;
export default Image;
