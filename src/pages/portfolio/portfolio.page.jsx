import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

import {getProjects} from '../../redux/projects/projects.actions';
import {getProjectsSelector} from '../../redux/projects/projects.selectors';

import SkillsBar from '../../components/skills-bar/skills-bar.component';
import GridItem from '../../components/grid-item/grid-item.component';
import LoaderBallFall from '../../components/loaders/loader-ball-fall.component';

const useStyles = makeStyles(theme => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    }
}));

const PortfolioPage = ({projects, fetchProjects}) => {
    
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects])

    const classes = useStyles();

    return (
        <section className="portfolio" steve={null}>
            <Container className={classes.cardGrid} maxWidth="md">
                {projects ? (
                    <Fragment>
                        <SkillsBar />
                        <Grid container spacing={4}>
                            {projects.map(project => (
                                <GridItem key={project.id} project={project} />
                            ))}
                        </Grid>
                    </Fragment>
                ) : (<LoaderBallFall />)}
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