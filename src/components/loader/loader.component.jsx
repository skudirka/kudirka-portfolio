import React from 'react';
import LoaderContainer from './loader.styles';

const Loader = props => {
    return (
        <LoaderContainer>
            <div className="la-ball-fall la-3x">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </LoaderContainer>
    )
}

export default Loader;