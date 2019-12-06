import React, {Fragment, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import ButtonBase from '@material-ui/core/ButtonBase';

import ResponsiveImage from '../responsive-image/responsive-image.component';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
      borderBottom: '1px solid #efefef;'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '95vw',
    maxWidth: '1180px'
  },
}));

const ResponsiveImageModal = ({imageMap, alt}) => {
    
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <Fragment>
            <ButtonBase
                focusRipple
                key={alt}
                onClick={handleOpen} 
                className={classes.button}
            >
                <ResponsiveImage imageMap={imageMap} alt={alt} />
            </ButtonBase>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                timeout: 500,
                }}
            >
                <Fade in={open}>
                <div className={classes.paper}>
                    <ResponsiveImage imageMap={imageMap} alt={alt} />
                </div>
                </Fade>
        </Modal>
      </Fragment>
    )
}

export default ResponsiveImageModal;