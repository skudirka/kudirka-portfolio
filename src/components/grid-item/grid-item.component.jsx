import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import ResponsiveImageModal from '../responsive-image-modal/responsive-image-modal.component';

import {getIsProjectVisibleSelector} from '../../redux/projects/projects.selectors';

const useStyles = makeStyles(theme => ({
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardContent: {
      flexGrow: 1,
    }
}));

const GridItem = ({project, isVisible}) => {
    const classes = useStyles();
    console.log('project', project);

    const {name, description, url} = project;
    
    return (
        <Fragment>
            <Grow in={isVisible} timeout={{enter: 400, exit: 300}} mountOnEnter unmountOnExit exit>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <ResponsiveImageModal imageMap={project.image} alt={name} />
                        <CardContent className={classes.cardContent}>
                            <Typography gutterBottom variant="h5" component="h2">
                            {name}
                            </Typography>
                            <Typography>
                            {description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            {url && (
                                <Link href={url} target="_blank" rel="noreferrer" underline="none">
                                    <Button size="small" color="primary">
                                        Launch
                                    </Button>
                                </Link>
                             : null)}
                        </CardActions>
                    </Card>
                </Grid>
            </Grow>
        </Fragment>
    )
};

const mapStateToProps = (state, props) => {
    const projectVisibleSelector = getIsProjectVisibleSelector(state, props.project);
    return {
        isVisible: projectVisibleSelector(state, props)
    }
};

export default connect(mapStateToProps)(GridItem);