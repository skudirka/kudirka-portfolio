import React from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import SkillsBarContainer from './skills-bar.styles';
import {getAllSkillsSelector} from '../../redux/projects/projects.selectors';
import SkillsChip from '../skills-chip/skills-chip.component';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(.75),
    }
}));

const SkillsBar = ({skills}) => {
    const classes = useStyles();

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
                        />
                    );
                })}
            </Paper>
        </SkillsBarContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    skills: getAllSkillsSelector
});

export default connect(mapStateToProps)(SkillsBar);