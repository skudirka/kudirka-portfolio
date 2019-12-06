import React, {useRef} from 'react';

import ResponsiveImageContainer from './responsive-image.styles';

import useLazyLoad from '../../hooks/useLazyLoad';

const ResponsiveImage = ({imageMap, alt, onImageLoad, skipLazyLoad}) => {
    
    const imageRef = useRef();

    const {src, srcset, sizes} = useLazyLoad(imageRef, imageMap, skipLazyLoad);

    const onImageLoadHandler = e => {
        if( onImageLoad && typeof onImageLoad === 'function' ){
            onImageLoad(e);
        }
    }
    
    return (
        <ResponsiveImageContainer>
            <img ref={imageRef} src={src} sizes={sizes} srcSet={srcset} alt={alt} onLoad={onImageLoadHandler} />
        </ResponsiveImageContainer>
    )
}

export default ResponsiveImage;