import React from 'react';
import {
    Button,
    Dialog,
    DialogContent,
    DialogActions,
    withStyles
} from "material-ui-next";

import ProductCard from "./ProductCard";

const styles = theme => (
    {
        fullWidth: {
            maxWidth: '100%',

            [theme.breakpoints.up('sm')]: {
                maxWidth: '80%'
            }
        },

        actions: {
            justifyContent: 'center'
        }
    }
);

const Modal = props => {

    const {
        isOpen,
        handleClose,
        selectedProduct,
        createOrderHandler,
        classes,
        fullScreen
    } = props;

    return (
        <Dialog
            classes={{
                fullWidth: classes.fullWidth
            }}
            fullScreen={fullScreen}
            maxWidth={false}
            fullWidth={true}
            open={isOpen}
            onBackdropClick={handleClose}
        >
            <DialogContent>
                <ProductCard selectedProduct={selectedProduct}/>
            </DialogContent>
            <DialogActions className={classes.actions}>
                <Button
                    raised
                    onClick={handleClose}
                    color="secondary"
                >
                    Закрыть
                </Button>
                <Button
                    raised
                    color="primary"
                    onClick={() => createOrderHandler(selectedProduct)}
                >
                    Оформить заказ
                </Button>
            </DialogActions>
        </Dialog>
    )
};

export default withStyles(styles)(Modal);