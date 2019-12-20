import React, {Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';

import SkillsMenu from '../skills-menu/skills-menu.component';

const useStyles = makeStyles(theme => ({
    header: {
        [theme.breakpoints.down('xs')]: {
            fontSize: '20px'
        },
    },
    
}));

const Header = props => {
    const classes = useStyles();

    return (
        <Fragment>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography className={`special-font ${classes.header}`} variant="h5" component="h1" color="inherit">
                        Kudirka Portfolio
                    </Typography>
                    <Hidden mdUp>
                        <SkillsMenu />
                    </Hidden>
                </Toolbar>
            </AppBar>
            <Toolbar />
        </Fragment>
    )
};

export default Header;