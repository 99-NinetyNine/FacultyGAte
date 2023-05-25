import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Papers from './Papers'
import Profile from '../accounts/Profile.js'
import { Fragment } from 'react'

class DetailUser extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,

    }



    render() {


        return (
            <div>


                {(this.props.user.id != null && this.props.user.profile != null) ?
                    <Fragment>
                        <Profile user={this.props.user} />
                        <Papers id={this.props.match.params.id} />
                    </Fragment>
                    : ""}



            </div>
        )
    }


}


const mapStateToProps = state => ({
    user: state.profiles.profile,
    // user:state.auth.user
})


export default connect(mapStateToProps, {})(DetailUser)


