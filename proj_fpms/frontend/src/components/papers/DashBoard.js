import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import PaperForm from './PaperForm'
import Papers from './Papers'
import Profile from '../accounts/Profile'


export class DashBoard extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
    }

    render() {
        return (
            <div>
                <Profile user={this.props.user} />
                <PaperForm />
                <Papers id={this.props.user.id} />

            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.auth.user,
})

export default connect(mapStateToProps, {})(DashBoard);
