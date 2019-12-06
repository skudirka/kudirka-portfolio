import React, {Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = props => (
    <Fragment>
        <AppBar position="fixed">
            <Toolbar>
            <Typography className="special-font" variant="h5" component="h1" color="inherit" noWrap>
                Kudirka Portfolio
            </Typography>
            </Toolbar>
        </AppBar>
        <Toolbar />
    </Fragment>
);

export default Header;