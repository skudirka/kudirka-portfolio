import ProjectsActionTypes from './projects.types';

export const setLoading = bool => ({
    type: ProjectsActionTypes.SET_LOADING,
    payload: bool
});

export const getProjects = () => ({
    type: ProjectsActionTypes.GET_PROJECTS
});

export const setProjects = projects => ({
    type: ProjectsActionTypes.SET_PROJECTS,
    payload: projects
});

export const setSkillsFilter = skills => ({
    type: ProjectsActionTypes.SET_SKILLS_FILTER,
    payload: skills
});

export const addSkillFilter = skill => ({
    type: ProjectsActionTypes.ADD_SKILL_FILTER,
    payload: skill
});

export const removeSkillFilter = skill => ({
    type: ProjectsActionTypes.REMOVE_SKILL_FILTER,
    payload: skill
});

export const clearSkillFilter = () => ({
    type: ProjectsActionTypes.CLEAR_SKILL_FILTER
});