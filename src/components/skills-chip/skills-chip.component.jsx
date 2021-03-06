import React, {Fragment} from 'react';
import {connect} from 'react-redux';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

import {getIsSkillInFilterSelector} from '../../redux/projects/projects.selectors';
import {setSkillsFilter, removeSkillFilter, clearSkillFilter} from '../../redux/projects/projects.actions';

const useStyles = makeStyles(theme => ({
    chip: {
        margin: theme.spacing(.5),
        [theme.breakpoints.up('lg')]: {
            margin: theme.spacing(.75),
        },
    }
}));

const getColor = (bool) => {
    return bool ? 'primary' : 'default';
}

const SkillsChip = ({skill, isSkillInFilter, setSkills, removeSkill, selectAllSkills}) => {
    
    const classes = useStyles();

    const color = getColor(isSkillInFilter);

    const onChipToggle = () => {
        let selected = true;
        let trackSkill = skill;
        if(skill==='ALL'){
            if( !isSkillInFilter ){
                selectAllSkills();
            } else {
                selected = false;
            }
        } else {
            if( isSkillInFilter ){
                // remove
                removeSkill(skill);
                trackSkill = 'ALL';
            } else {
                // add
                setSkills([skill]);
            }
        }
        const gtag = window['gtag'] || null;
        if( gtag && selected ){
            // GA track event
            gtag('event', 'skills_menu_select', {'platform': 'desktop', 'skill': trackSkill});
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
                className={classes.chip}
            />
        </Fragment>
    )
}

const mapStateToProps = (state, props) => {
    const skillFilterSelector = getIsSkillInFilterSelector(state, props.skill);
    return {
        isSkillInFilter: skillFilterSelector(state)
    }
};

const mapDispatchToProps = dispatch => ({
    setSkills: skills => dispatch(setSkillsFilter(skills)),
    removeSkill: skill => dispatch(removeSkillFilter(skill)),
    selectAllSkills: () => dispatch(clearSkillFilter())
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillsChip);