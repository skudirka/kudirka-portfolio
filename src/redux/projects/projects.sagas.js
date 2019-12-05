import {call, takeLatest, all, put} from 'redux-saga/effects';
import ProjectsActionTypes from './projects.types';
import {setLoading, setProjects} from './projects.actions';
import {getProjects} from '../../firebase/firebase.utils';

export function* getProjectsSaga(){
    yield put(
        setLoading(true)
    );

    try {
        const projects = yield getProjects();

        yield put(
            setProjects(projects)
        );
    } catch(error){
        console.error(error);
    }

    yield put(
        setLoading(false)
    );
}

export function* onGetProjects(){
    yield takeLatest(ProjectsActionTypes.GET_PROJECTS, getProjectsSaga);
}

export default function* projectsSagas(){
    yield all([
        call(onGetProjects)
    ])
}