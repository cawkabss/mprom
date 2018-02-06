import React, { Component } from 'react';
import Wrapper from "./Wrapper";
import {Button, Dialog,DialogTitle, DialogActions, DialogContent, Typography} from "material-ui-next";

const withErrorHandler = (WrappedComponent) => {

    return class extends Component {
        render() {
            const {error, confirmErrorHandler} = this.props;

            return (

                <Wrapper>
                    <WrappedComponent {...this.props}/>

                    <Dialog
                        open={!!error}
                        onBackdropClick={confirmErrorHandler}
                    >
                        <DialogTitle>Ошибка!</DialogTitle>
                        <DialogContent>
                            <Typography>
                                {error && error.response ? error.response.data : 'Что-то пошло не так... '}
                            </Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button
                                color="secondary"
                                onClick={confirmErrorHandler}
                            >
                                Ok
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Wrapper>
            )
        }
    }
};

export default withErrorHandler;