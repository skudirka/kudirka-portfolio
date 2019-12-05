import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SkillsBarContainer from './skills-bar.styles';
import {getAllSkillsSelector, getFilteredSkillsSelector} from '../../redux/projects/projects.selectors';
import {setSkillsFilter} from '../../redux/projects/projects.actions';
import SkillsChip from '../skills-chip/skills-chip.component';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    padding: theme.spacing(0.5),
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));

const SkillsBar = ({skills, filteredSkills, filterSkills}) => {
    const classes = useStyles();

    /*const onChipToggle = skill => {
        console.log('Chip toggle', skill)
        if(skill==='ALL'){
            filterSkills([]);
        } else {
            const idx = filteredSkills.indexOf(skill);
            if( idx!==-1 ){
                // remove
                filteredSkills.splice(idx, 1);
            } else {
                // add
                filteredSkills.push( skill );
            }
            filterSkills( filteredSkills );
        }
    }

    const isActive = skill => {
        switch( skill ){
            case 'ALL' :
                return !filteredSkills || filteredSkills.length===0;
            default :
                return filteredSkills && filteredSkills.includes(skill);
        }
    }

    const getColor = skill => {
        return isActive(skill) ? 'primary' : 'default';
    }*/

    return (
        <SkillsBarContainer>
            <Paper className={classes.root}>
                <SkillsChip 
                    key="ALL" 
                    skill="ALL"
                    className={classes.chip}
                />
                {skills.map(skill => {
                    return (
                        <SkillsChip
                            key={skill}
                            skill={skill}
                            className={classes.chip}
                        />
                    );
                })}
            </Paper>
        </SkillsBarContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    skills: getAllSkillsSelector,
    filteredSkills: getFilteredSkillsSelector
});

const mapDispatchToProps = dispatch => ({
    filterSkills: skills => dispatch(setSkillsFilter(skills))
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillsBar);