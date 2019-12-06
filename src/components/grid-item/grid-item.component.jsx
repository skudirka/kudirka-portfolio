import React, {Fragment} from 'react';
import {connect} from 'react-redux';

import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grow from '@material-ui/core/Grow';
import ResponsiveImageModal from '../responsive-image-modal/responsive-image-modal.component';
import BadgeLive from '../badges/badge-live.component';

import {getIsProjectVisibleSelector} from '../../redux/projects/projects.selectors';

const useStyles = makeStyles(theme => ({
    header: {
        marginBottom: theme.spacing(1)
    },
    cardGrid: {
      paddingTop: theme.spacing(8),
      paddingBottom: theme.spacing(8),
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
    },
    cardActionRight: {
        marginLeft: 'auto !important',
    },
    statusButton: {
        minWidth: 0,
    },
    client: {
        lineHeight: theme.spacing(2.25)+'px', // 18px
        marginBottom: theme.spacing(1.5) // 12px
    },
    cardContent: {
      flexGrow: 1,
    },
    chip: {
        height: '20px',
        marginRight: '2px',
        marginBottom: '2px',
    },
    divider: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        marginLeft: 0,
        marginRight: 0
    }
}));

const GridItem = ({project, isVisible}) => {
    const classes = useStyles();
    console.log('project', project);

    const {name, description, url, client, source, status} = project;

    const checkStatus = status ? status.toLowerCase() : null;
    let isLive = false;
    switch( checkStatus ){
        case 'live' :
        case 'demo' :
        case 'online' :
            isLive = true;
            break;
        default :
            isLive = false; 
    }

    // get unique list, then sort
    const sortedChips = project.skills ? Array.from(new Set(project.skills)).sort((a, b) => a.localeCompare(b)) : null;
    
    return (
        <Fragment>
            <Grow in={isVisible} timeout={{enter: 500, exit: 500}} mountOnEnter unmountOnExit exit>
                <Grid item xs={12} sm={6} md={4}>
                    <Card className={classes.card}>
                        <ResponsiveImageModal imageMap={project.image} alt={name} />
                        <CardContent className={classes.cardContent}>
                            <Box className={classes.header}>
                                <Typography variant="h6" component="h2">
                                    {name}
                                </Typography>
                                {client ? (
                                    <Typography className={classes.client} variant="overline" display="block" color="secondary">
                                        {client}
                                    </Typography>
                                ) : (null)}
                            </Box>
                            <Typography variant="body2">
                                {description}
                            </Typography>
                            {sortedChips ? (
                                <Fragment>
                                    <Divider variant="middle" className={classes.divider} />
                                    <Box>
                                        {sortedChips.map(skill => (
                                            <Chip
                                                key={`${name}_${skill}`}
                                                label={skill} 
                                                variant="outlined" 
                                                size="small" 
                                                disabled 
                                                className={classes.chip}
                                            />
                                        ))}
                                    </Box>
                                </Fragment>
                            ) : (null)}
                        </CardContent>
                        <CardActions>
                            {url && (
                                <Link href={url} target="_blank" rel="noreferrer" underline="none">
                                    <Button size="small" color="primary">
                                        View
                                    </Button>
                                </Link>
                             : null)}
                             {source && (
                                <Link href={source} target="_blank" rel="noreferrer" underline="none">
                                    <Button size="small" color="primary">
                                        Source
                                    </Button>
                                </Link>
                             : null)}
                             {status && isLive && (
                                <BadgeLive
                                    overlap="circle"
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    variant="dot"
                                    className={classes.cardActionRight}
                                >
                                    <Button className={classes.statusButton} size="small" disabled aria-label={`Status: ${status}`}>{status}</Button>
                                </BadgeLive>
                             : null)}
                             {status && !isLive && (
                                <div className={classes.cardActionRight}>
                                    <Button className={classes.statusButton} size="small" disabled aria-label={`Status: ${status}`}>{status}</Button>
                                </div>
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
        isVisible: projectVisibleSelector(state)
    }
};

export default connect(mapStateToProps)(GridItem);