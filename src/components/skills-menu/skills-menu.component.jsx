import React, {useState, Fragment} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import FilterListIcon from '@material-ui/icons/FilterList';
import IconButton from '@material-ui/core/IconButton';

import SkillsMenuContainer from './skills-menu.styles';
import {getAllSkillsSelector, getFilteredSkillsSelector} from '../../redux/projects/projects.selectors';
import {setSkillsFilter} from '../../redux/projects/projects.actions';

const useStyles = makeStyles(theme => ({
    formControl: {
      margin: 0,
      overflow: 'hidden'
    },
    select: {
        height: '0',
        width: '1px',
        overflow: 'hidden',
        visibility: 'hidden'
    },
    button: {
        marginLeft: 'auto',
        borderRadius: theme.spacing(1),
    }
}));

const SkillsMenu = ({skills, filteredSkills, setSkills}) => {
    const classes = useStyles();

    const [open, setOpen] = useState(false);

    const handleChange = event => {
        const val = event.target.value;
        const gtag = window['gtag'] || null;
        if( gtag && val ){
            // GA track event
            gtag('event', 'skills_menu_select', {'platform': 'mobile', 'skill': val});
        }
        setSkills(val!=='ALL' ? [val] : []);
        setOpen( false );
    };

    const handleToggle = () => {
        const gtag = window['gtag'] || null;
        setOpen(previousOpen => {
            if( gtag && !previousOpen){
                // GA track event
                gtag('event', 'skills_menu_open', {'platform': 'mobile'});
            }
            return !previousOpen;
        });
    };

    const selectedValue = filteredSkills.length ? filteredSkills[0] : 'ALL';

    return (
        <Fragment>
            <IconButton className={classes.button} edge="end" color="inherit" aria-label="menu" onClick={handleToggle}>
                <FilterListIcon />
            </IconButton>
            <SkillsMenuContainer>
                <FormControl variant="filled" className={classes.formControl}>
                    <Select
                        value={selectedValue}
                        onChange={handleChange} 
                        open={open} 
                        className={classes.select}
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
        </Fragment>
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