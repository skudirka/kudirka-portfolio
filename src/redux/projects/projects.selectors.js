import {createSelector} from 'reselect';

export const isLoadingSelector = state => state.isLoading;

const getProjectsSelector = state => state.projects;

export const getAllSkillsSelector = createSelector(
    getProjectsSelector,
    projects => {
        const skillsArray = projects ? projects.reduce((accum, project) => {
            return [
                ...accum,
                ...project.skills
            ];
        }, []) : [];
        // ensure unique values by using Set, then sort alphabetically
        return Array.from( new Set(skillsArray) ).sort((a, b) => a.localeCompare(b));
    }
);

export const getFilteredSkillsSelector = state => state.skillsFilter;

export const getFilteredSkillsSelectorAsString = state => getFilteredSkillsSelector(state).join(',');

export const getIsSkillInFilterSelector = (state, skill) => {
    return createSelector(
        [getFilteredSkillsSelector],
        filteredSkills => {
            switch( skill ){
                case 'ALL' :
                    return !filteredSkills || filteredSkills.length===0;
                default :
                    return filteredSkills && filteredSkills.includes(skill);
            }
        }
    )
    
};

export const getFilteredProjectsSelector = createSelector(
    [getProjectsSelector, getFilteredSkillsSelector, getFilteredSkillsSelectorAsString],
    (projects, skillsFilter) => {
        if( !projects ){
            return null;
        }
        return skillsFilter.length ? projects.filter(project => {
            const intersection = skillsFilter.filter(skill => project.skills.includes(skill));
            return intersection.length > 0;
        }) : projects;
    }
);