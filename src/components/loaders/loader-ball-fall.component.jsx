import React from 'react';
import LoaderBallFallContainer from './loader-ball-fall.styles';

const LoaderBallFall = props => {
    return (
        <LoaderBallFallContainer>
            <div className="la-ball-fall la-3x">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </LoaderBallFallContainer>
    )
}

export default LoaderBallFall;