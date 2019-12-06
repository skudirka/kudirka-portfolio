import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import SkillsMenuContainer from './skills-menu.styles';
import {getAllSkillsSelector, getFilteredSkillsSelector} from '../../redux/projects/projects.selectors';
import {setSkillsFilter} from '../../redux/projects/projects.actions';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      backgroundColor: '#3f51b5',
      color: 'white',
      borderRadius: theme.spacing(1),
      overflow: 'hidden'
    },
}));

const SkillsMenu = ({skills, filteredSkills, setSkills}) => {
    const classes = useStyles();

    const handleChange = event => {
        const val = event.target.value;
        setSkills(val!=='ALL' ? [val] : []);
    };

    const selectedValue = filteredSkills.length ? filteredSkills[0] : 'ALL';

    return (
        <SkillsMenuContainer>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="skills-menu-label">Filter Skills</InputLabel>
                <Select
                    labelId="skills-menu-label"
                    id="skills-menu-filled"
                    value={selectedValue}
                    onChange={handleChange}
                >
                    <MenuItem value="ALL">ALL</MenuItem>
                    {skills.map(skill => {
                        return (
                            <MenuItem key={skill} value={skill}>{skill}</MenuItem>
                        );
                    })}
                </Select>
            </FormControl>
        </SkillsMenuContainer>
    );
};

const mapStateToProps = createStructuredSelector({
    skills: getAllSkillsSelector,
    filteredSkills: getFilteredSkillsSelector
});

const mapDispatchToProps = dispatch => ({
    setSkills: skills => dispatch(setSkillsFilter(skills))
});

export default connect(mapStateToProps, mapDispatchToProps)(SkillsMenu);