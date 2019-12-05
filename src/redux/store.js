import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import projectsReducer from './projects/projects.reducer';
import projectsSagas from './projects/projects.sagas';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
if( process.env.NODE_ENV === 'development' ){
    middlewares.push( logger );
}

const store = createStore(projectsReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(projectsSagas);

export default store;