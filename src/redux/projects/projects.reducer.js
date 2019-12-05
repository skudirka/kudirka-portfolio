import ProjectsActionTypes from './projects.types';

const INITIAL_STATE = {
    projects: null,
    skillsFilter: [], // list of skills to filter against
    isLoading: true
};

const projectsReducer = (state=INITIAL_STATE, action) => {
    switch( action.type ){

        case ProjectsActionTypes.SET_PROJECTS :
            return {
                ...state,
                projects: action.payload
            };

        case ProjectsActionTypes.ADD_SKILL_FILTER :
                return {
                    ...state,
                    skillsFilter: [
                        ...state.skillsFilter,
                        action.payload
                    ]
                };

        case ProjectsActionTypes.REMOVE_SKILL_FILTER :
                return {
                    ...state,
                    skillsFilter: state.skillsFilter.filter(skill => skill!==action.payload)
                };

        case ProjectsActionTypes.CLEAR_SKILL_FILTER :
                return {
                    ...state,
                    skillsFilter: []
                };

        case ProjectsActionTypes.SET_SKILLS_FILTER :
                return {
                    ...state,
                    skillsFilter: action.payload ? action.payload : []
                };
        
        case ProjectsActionTypes.SET_LOADING :
            return {
                ...state,
                isLoading: action.payload
            };

        default :
            return state;
    }
};

export default projectsReducer;