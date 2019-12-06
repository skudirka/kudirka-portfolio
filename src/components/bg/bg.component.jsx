import React, {useState, useEffect, useCallback, useRef} from 'react';

import BgContainer from './bg.styles';
import ResponsiveImage from '../responsive-image/responsive-image.component';
import {debounce} from 'lodash';
import ratioUtil, {Size} from '../../classes/ratio-util';

const isValidSize = dimension => !!dimension;

const Bg = ({imageMap, alt}) => {

    const [imageNaturalWidth, setImageNaturalWidth] = useState(0);
    const [imageNaturalHeight, setImageNaturalHeight] = useState(0);
    
    const [imageWidth, setImageWidth] = useState(0);
    const [imageHeight, setImageHeight] = useState(0);

    const [containerWidth, setContainerWidth] = useState(0);
    const [containerHeight, setContainerHeight] = useState(0);

    const containerRef = useRef();

    const checkSize = useCallback(naturalSize => {
        if( containerRef.current ){
            const {clientWidth, clientHeight} = containerRef.current;
            let change = false;
            
            if(isValidSize(clientWidth) && clientWidth!==containerWidth){
                setContainerWidth(clientWidth);
                change = true;
            }
            if(isValidSize(clientHeight) && clientHeight!==containerHeight){
                setContainerHeight(clientHeight);
                change = true;
            }

            if( change || naturalSize ){
                const natWidth = naturalSize ? naturalSize.width : imageNaturalWidth;
                const natHeight = naturalSize ? naturalSize.height : imageNaturalHeight;
                if(isValidSize(natWidth) && isValidSize(natHeight) && isValidSize(clientWidth) && isValidSize(clientHeight)){
                    // ready for image sizing
                    const size = ratioUtil.scaleToFill(new Size(natWidth, natHeight), new Size(clientWidth, clientHeight));
                    setImageWidth( size.width );
                    setImageHeight( size.height );
                }
            }
        }
        
    }, [containerRef, containerHeight, containerWidth, imageNaturalHeight, imageNaturalWidth]);

    useEffect(() => {
        // mounting
        const handleResize = debounce(() => {
            checkSize();
        }, 100);
        window.addEventListener('resize', handleResize);
        checkSize();

        return () => {
            // unmounting
            window.removeEventListener('resize', handleResize);
        }
    }, [checkSize]);

    const onImageLoad = e => {
        const img = e.target;
        const {naturalWidth, naturalHeight} = img;
        let change = false;
        if(isValidSize(naturalWidth) && naturalWidth!==imageNaturalWidth){
            setImageNaturalWidth(naturalWidth);
            change = true;
        }
        if(isValidSize(naturalHeight) && naturalHeight!==imageNaturalHeight){
            setImageNaturalHeight(naturalHeight);
            change = true;
        }
        if( change ){
            checkSize( new Size(naturalWidth, naturalHeight) );
        }
    }
    
    const imgStyle = {
        width: isValidSize(imageWidth) ? (imageWidth + 'px') : '100vw',
        height: isValidSize(imageHeight) ? (imageHeight + 'px') : '100vh',
        minWidth: '100vw',
        minHeight: '100vh'
    }

    return (
        <BgContainer ref={containerRef} className="bgComponent">
            <div className="imageContainer">
                <div className="imageAlign">
                    <div style={imgStyle}>
                        <ResponsiveImage onImageLoad={onImageLoad} imageMap={imageMap} alt={alt} skipLazyLoad />
                    </div>
                </div>
            </div>
        </BgContainer>
    )
}


Bg.images = [
    ['bg_mountain.jpg', 'https://firebasestorage.googleapis.com/v0/b/kudirka-d3b6b.appspot.com/o/bg_mountain.jpg?alt=media&token=416b3ba1-b9a5-4d4e-aa72-d67986b79809'],
    ['bg_wet_window.jpg', 'https://firebasestorage.googleapis.com/v0/b/kudirka-d3b6b.appspot.com/o/bg_wet_window.jpg?alt=media&token=037de387-3c2c-44c3-a625-00cc32ed0d52'],
    ['bg_blurred_lights.jpg', 'https://firebasestorage.googleapis.com/v0/b/kudirka-d3b6b.appspot.com/o/bg_blurred_lights.jpg?alt=media&token=976b8ba4-3122-4087-bfb2-847cd3fc3da3'],
    //['bg_firestation.jpg', 'https://firebasestorage.googleapis.com/v0/b/kudirka-d3b6b.appspot.com/o/bg_firestation.jpg?alt=media&token=9220b7e9-ce16-44fe-b431-5154992e3b15'],
    ['bg_bridge_zoom.jpg', 'https://firebasestorage.googleapis.com/v0/b/kudirka-d3b6b.appspot.com/o/bg_bridge_zoom.jpg?alt=media&token=e0865551-4d72-46a3-814a-d4e983877f91'],
];

export default Bg;