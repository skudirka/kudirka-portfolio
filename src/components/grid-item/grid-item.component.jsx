import React, {Fragment} from 'react';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import ResponsiveImage from '../responsive-image/responsive-image.component';

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

const GridItem = ({project}) => {
    const classes = useStyles();
    console.log('project', project);

    const {name, description} = project;
    
    return (
        <Fragment>
            <Grid item xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                    <ResponsiveImage imageMap={project.image} alt={name} />
                    <CardContent className={classes.cardContent}>
                        <Typography gutterBottom variant="h5" component="h2">
                        {name}
                        </Typography>
                        <Typography>
                        {description}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" color="primary">
                        View
                        </Button>
                        <Button size="small" color="primary">
                        Edit
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Fragment>
    )
};

export default GridItem;