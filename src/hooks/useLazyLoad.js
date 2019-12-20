import {useState, useEffect, useCallback} from 'react';
import 'intersection-observer';
import placeholder from '../assets/placeholder-image.png';
import SrcMap from '../classes/src-map';
import {debounce} from 'lodash';

const lazyLoadedRefs = new Map();

const ioObserver = new window.IntersectionObserver((entries, itemObserver) => {
    entries.forEach(entry => {
        if( entry.isIntersecting ){
            const observable = observables.find( entry.target );
            if( observable ){
                observable.callback();
            }
        }
    })
}, {
    rootMargin: '33.33%'
});
ioObserver.POLL_INTERVAL = 100; // Time in milliseconds.


// Use this wrapper class so we can add a callback.
class ObservableElement {
    constructor(element, callback){
        this.element = element;
        this.callback = callback;
        this.observing = true;
        ioObserver.observe( element );
    }

    unobserve = () => {
        if( this.observing ){
            this.observing = false;
            ioObserver.unobserve( this.element );
        }
    }
}

// Master list class of observables
class ObservableList {
    constructor(){
        this.list = [];
    }

    add = (element, callback) => {
        const obj = new ObservableElement(element, callback);
        this.list.push( obj );
        return obj;
    };

    find = element => {
        return this.list.find(observable => observable.element===element);
    }

    remove = observable => {
        const idx = this.list.indexOf(observable);
        if( idx !== -1 ){
            observable.unobserve();
            this.list.splice(idx, 1);
        }
        if( idx===-1 ){
            console.log('REMOVED ', this.list);
        }
        
        return this.list;
    }
}
// Master list of Observables
const observables = new ObservableList();

const hasAlreadyLazyLoaded = src => lazyLoadedRefs.has(src);

const useLazyLoad = (reference, srcMapping, skipLazyLoad, placeholderSrc=placeholder) => {

    const srcMap = new SrcMap(srcMapping);

    const hasLoaded = skipLazyLoad || hasAlreadyLazyLoaded(srcMap.src);

    const initialState = {
        src: hasLoaded ? srcMap.src : placeholderSrc,
        srcset: hasLoaded ? srcMap.srcSet : null,
        sizes: null,
        loaded: hasLoaded
    }

    const [srcPath, setSrcPath] = useState(initialState.src);
    const [srcset, setSrcset] = useState(initialState.srcset);

    const [loaded, setLoaded] = useState(initialState.loaded);
    const [sizes, setSizes] = useState(initialState.sizes);

    const checkSize = useCallback(force => {
        if( loaded || force ){
            setSizes( Math.max(reference.current.clientWidth, 100) + 'px' );
        }
    }, [reference, loaded]);

    const startObserving = useCallback(() => {
        let needsObserving = (srcPath===placeholderSrc);
        let stopObserving;

        if( needsObserving ){
            
            const observable = observables.add( reference.current, () => {
                stopObserving();

                // lazy-load
                lazyLoadedRefs.set(srcMap.src, true); // unique to this project, only care if this particular image has already loaded. Other project you may just stick to reference object.
                setLoaded(true);
                // maintain this order of setting sizes, srcset, then src
                checkSize(true);
                setSrcset( srcMap.srcSet );
                setSrcPath( srcMap.src );
            });
            stopObserving = () => {
                if(needsObserving){
                    needsObserving = false;
                    observables.remove( observable );
                }
            };
        }

        return stopObserving;
    }, [reference, srcMap, placeholderSrc, srcPath, checkSize]);

    useEffect(() => {
        // mounting
        let stopObserving = startObserving();

        const handleResize = debounce(() => {
            checkSize();
        }, 100);
        window.addEventListener('resize', handleResize);
        checkSize();

        return () => {
            // unmounting
            window.removeEventListener('resize', handleResize);
            if( stopObserving ){
                stopObserving();
                stopObserving = null;
            }
        }
    }, [startObserving, checkSize]);

    return {
        src: srcPath,
        srcset,
        sizes,
        loaded
    };
}

export default useLazyLoad;