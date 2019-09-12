/* eslint-disable no-undef */
import React from 'react';
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {
        state = {
            error: null
        }

        componentDidMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                });
                return req;
            });

            this.resInterceptor = axios.interceptors.response.use(res => res, err => {
                console.log(err);
                this.setState({
                    error: err
                });
                // return Promise.reject(err);
            });
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        closeErrorHandler = () => {
            this.setState({
                error: null
            });
        }

        render () {   
            return <React.Fragment>
                <Modal show={this.state.error} modalClosed={this.closeErrorHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </React.Fragment>;
        }
    }
}

export default withErrorHandler;