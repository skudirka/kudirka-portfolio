import firebase from 'firebase/app';
import "firebase/analytics";
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';
import parse from 'url-parse';

import firebaseConfig from './firebase.config';

export const SCALED_IMAGE_SIZES = [ // square sizes, so just widths are provided in pixels
    200, 320, 568, 768, 1024, 1112
];

firebase.initializeApp(firebaseConfig);

//export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage().ref();

let imageRootURL;
let imageSuffixURL;

/*export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const {title, items} = doc.data();

        return {
            routeName: encodeURI( title.toLowerCase() ),
            id: doc.id,
            title,
            items
        };
    });

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
};*/

export const getProjects = async () => {
    console.log('getProjects +++++++++++');
    const projectsRef = firestore.collection('projects');

    const querySnapshot = await projectsRef.get();

    /*const projects = await querySnapshot.docs.map(async doc => {
        const {name, client, description, image, skills} = doc.data();
        console.log(doc.id, name, client, description, image, skills);
        const imageSources = await getImage(image);
        return {
            name,
            client,
            description,
            skills,
            image: imageSources
        };
    });*/

    const projects = [];
    for(let doc of querySnapshot.docs){
        const {name, client, description, image, skills, url} = doc.data();
        console.log(doc.id, name, client, description, image, skills);
        const imageSources = await getImage(image);
        projects.push({
            id: doc.id,
            name,
            client,
            description,
            skills,
            image: imageSources,
            url
        });
    }
    /*querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
    });*/
    console.log('projects', projects);

    return projects;
}

/*
    Returns a mapping of the image sources.
*/
export const getImage = async (fileName, imagesRef) => {
    const sizes = new Map();
    const imageRef = storage.child(fileName);
    
    let url;
    if( !imageRootURL ){
        try {
            url = await imageRef.getDownloadURL();
            setImageUrlParts( url, fileName );
        } catch(error){
            url = null;
            handleStorageError('getImage > '+fileName, error)
        }
    } else {
        url = imageRootURL + fileName + imageSuffixURL;
    }
    
    if( url ){
        sizes.set('src', url);

        const scaledFilenames = getScaledFilenames( fileName );
        scaledFilenames.forEach((scaledFilename, idx) => {
            const scaledUrl = getScaledImage(scaledFilename);
            //console.log('scaledFilename', scaledFilename, scaledUrl);
            if( scaledUrl ){
                const size = SCALED_IMAGE_SIZES[idx];
                sizes.set(size, scaledUrl);
            }
        });
    }
    
    return sizes;
}

/*
    Save the core URL parts from the storage get requests, 
    so we can manually construct the rest of the image paths and not have to make more calls.
*/
const setImageUrlParts = (imageUrl, filename) => {
    const url = parse(imageUrl, true);
    const lastIdx = url.pathname.lastIndexOf(filename);
    const basePath = url.pathname.substring(0, lastIdx);
    const query = [];
    for(const prop in url.query){
        if(prop!=='token'){
            query.push(prop+'='+url.query[prop]);
        }
    }
    imageRootURL = url.origin + basePath;
    imageSuffixURL = '?' + query.join('&');
}

/*
    Generate the URL for a scaled image.
*/
export const getScaledImage = fileName => {
    let url;
    if( imageRootURL ){
        url = imageRootURL + 'scaled' + encodeURIComponent('/') + fileName + imageSuffixURL;
    } else {
        throw new Error('getScaledImage should only be called after the main image is fetched.')
    }
    return url;
}

/*
    Generate array scaled filenames from the main filename.
*/
const getScaledFilenames = filename => {
    const idx = filename.lastIndexOf('.');
    const fileRoot = filename.substring(0, idx);
    const extension = filename.substring(idx);
    return SCALED_IMAGE_SIZES.map(size => {
        return fileRoot + '_' + size + 'x' + size + extension;
    });
}

const handleStorageError = (prefix, error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
        case 'storage/object-not-found':
            console.log(prefix, 'File doesn\'t exist', error);
            break;
    
        case 'storage/unauthorized':
            console.log(prefix, 'User doesn\'t have permission to access the object', error);
            break;
    
        default :
            console.log(prefix, 'Unknown error occurred, inspect the server response', error);
            break;
    }
}


export default firebase;