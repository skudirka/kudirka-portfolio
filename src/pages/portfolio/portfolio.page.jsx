import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Hidden from '@material-ui/core/Hidden';

import {getProjects} from '../../redux/projects/projects.actions';
import {getProjectsSelector} from '../../redux/projects/projects.selectors';

import SkillsBar from '../../components/skills-bar/skills-bar.component';
import SkillsMenu from '../../components/skills-menu/skills-menu.component';
import GridItem from '../../components/grid-item/grid-item.component';
import LoaderPacman from '../../components/loaders/loader-pacman.component';

const useStyles = makeStyles(theme => ({
    portfolio: {
        zIndex: 2,
        position: 'relative'
    },
    cardGrid: {
      paddingTop: theme.spacing(2),
      paddingBottom: theme.spacing(2),
    }
}));

const PortfolioPage = ({projects, fetchProjects}) => {
    
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects])

    const classes = useStyles();

    return (
        <section className={classes.portfolio}>
            <Container className={classes.cardGrid} maxWidth="lg">
                {projects ? (
                    <Fragment>
                        <Hidden smDown>
                            <SkillsBar />
                        </Hidden>
                        <Hidden mdUp>
                            <SkillsMenu />
                        </Hidden>
                        <Grid container spacing={4}>
                            {projects.map(project => (
                                <GridItem key={project.id} project={project} />
                            ))}
                        </Grid>
                    </Fragment>
                ) : (<LoaderPacman />)}
        </Container>
        </section>
    );
}

const mapStateToProps = state => ({
    projects: getProjectsSelector(state)
});

const mapDispatchToProps = dispatch => ({
    fetchProjects: () => dispatch(getProjects())
});

export default connect(mapStateToProps, mapDispatchToProps)(PortfolioPage);