import React from 'react';
import LoaderPacmanContainer from './loader-pacman.styles';

const LoaderPacman = props => {
    return (
        <LoaderPacmanContainer>
            <div className="la-pacman la-3x">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </LoaderPacmanContainer>
    )
}

export default LoaderPacman;