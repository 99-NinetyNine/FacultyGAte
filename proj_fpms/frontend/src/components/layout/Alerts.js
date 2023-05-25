import React, { Component, Fragment } from 'react'
import { withAlert } from 'react-alert'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class Alerts extends Component {

    static propTypes = {
        error: PropTypes.object.isRequired,
        message: PropTypes.object.isRequired
    }

    componentDidUpdate(prevProps) {
        const { error, alert, message } = this.props;
        if (error !== prevProps.error) {
            // if (error.msg.title) {
            //     alert.error(`Title: ${error.msg.title.join()}`);
            // }
            // // if(error.status){
            // //     alert.error(`ERROR: ${error.status} `)
            // // }
            // if (error.msg.non_field_errors) alert.error(error.msg.non_field_errors.join());
            // if (error.msg.username) alert.error(error.msg.username.join());
            // if (error.msg.email) alert.error(error.msg.email.join());
            for (var key in error.msg) {
                if (error.msg.hasOwnProperty(key)) {
                  alert.error(error.msg[key])
                }
              }
        }

        if (message !== prevProps.message) {
            if (message.deletePaper) {
                alert.success(message.deletePaper)
            }

            if (message.addPaper) {
                alert.success(message.addPaper)
            }

            if (message.editPaper) {
                alert.success(message.editPaper)
            }


            if (message.passwordNotMatch) alert.error(message.passwordNotMatch)

            if (message.verifyEmail) alert.success(message.verifyEmail)

            if (message.otpSent) alert.success(message.otpSent)

            if (message.passwordReset) alert.success(message.passwordReset)
        }
    }

    render() {
        return ( < Fragment / > )
    }
}

const mapStateToProps = (state) => ({
    error: state.errors,
    message: state.messages
});

export default connect(mapStateToProps)(withAlert()(Alerts))