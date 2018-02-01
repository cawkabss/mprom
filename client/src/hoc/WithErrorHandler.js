import React, { Component } from 'react';
import Wrapper from "./Wrapper";
import {Dialog, RaisedButton} from "material-ui";


const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component{

        state = {
            show: false,
            error: null
        };

        componentWillMount(){
            this.resInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null,
                    show: false
                });

                return req;
            });

            this.reqInterceptor = axios.interceptors.response.use( res => res, error => {
                this.setState({
                    error: error,
                    show: true
                })
            })
        }

        componentWillUnmount(){
            axios.interceptors.request.eject(this.resInterceptor);
            axios.interceptors.response.eject(this.reqInterceptor);
        }

        errorConfirmHandler = () => {
            this.setState({
                error: null,
                show: false
            })
        };

        render(){
            const actions = [
                <RaisedButton className="product-modal-action"
                              label="Ok"
                              onClick={ this.errorConfirmHandler }
                              secondary={true} />
            ];

            return (

                <Wrapper>
                    <Dialog
                        className="product-modal"
                        modal={true}
                        autoScrollBodyContent={true}
                        open={this.state.show}
                        actions={actions}
                    >
                        <h3>Ой! Что-то пошло не так! ;)</h3>
                        <p>{ this.state.error ? this.state.error.message : null }</p>
                        <p>Попробуйте перезагрузить страницу.</p>
                    </Dialog>

                    <WrappedComponent {...this.props}/>
                </Wrapper>
            )
        }
    }
};

export default withErrorHandler;