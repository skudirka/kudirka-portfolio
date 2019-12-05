import React, {useRef} from 'react';

import ResponsiveImageContainer from './responsive-image.styles';

import useLazyLoad from '../../hooks/useLazyLoad';

const ResponsiveImage = ({imageMap, alt}) => {
    
    const imageRef = useRef();

    const {src, srcset, sizes} = useLazyLoad(imageRef, imageMap);
    
    return (
        <ResponsiveImageContainer>
            <img ref={imageRef} src={src} sizes={sizes} srcSet={srcset} alt={alt} />
        </ResponsiveImageContainer>
    )
}

export default ResponsiveImage;