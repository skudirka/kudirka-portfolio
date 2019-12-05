import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Chip from '@material-ui/core/Chip';

import {getIsSkillInFilterSelector} from '../../redux/projects/projects.selectors';
import {addSkillFilter, removeSkillFilter, clearSkillFilter} from '../../redux/projects/projects.actions';

const getColor = (bool) => {
    return bool ? 'primary' : 'default';
}

const SkillsChip = ({skill, isSkillInFilter, addSkill, removeSkill, selectAllSkills}) => {
    
    const color = getColor(isSkillInFilter);

    const onChipToggle = () => {
        if(skill==='ALL'){
            if( !isSkillInFilter ){
                selectAllSkills();
            }
        } else {
            if( isSkillInFilter ){
                // remove
                removeSkill(skill);
            } else {
                // add
                addSkill(skill);
            }
        }
    }
    
    return (
        <Fragment>
            <Chip
                key={skill}
                label={skill}
                clickable 
                onClick={onChipToggle} 
                color={color}
            />
        </Fragment>
    )
}

const mapStateToProps = (state, props) => {
    const skillFilterSelector = getIsSkillInFilterSelector(state, props.skill);
    return {
        isSkillInFilter: skillFilterSelector(state, props)
    }
};

const mapDispatchToProps = dispatch => ({
    addSkill: skill => dispatch(addSkillFilter(skill)),
    removeSkill: skill => dispatch(removeSkillFilter(skill)),
    selectAllSkills: () => dispatch(clearSkillFilter())
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillsChip);