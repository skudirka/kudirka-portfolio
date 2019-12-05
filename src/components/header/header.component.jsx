import React, {Fragment} from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const Header = props => (
    <Fragment>
        <AppBar position="relative">
            <Toolbar>
            <Typography variant="h6" color="inherit" noWrap>
                Steve Kudirka
            </Typography>
            </Toolbar>
        </AppBar>
    </Fragment>
);

export default Header;