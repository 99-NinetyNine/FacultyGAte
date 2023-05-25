import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link , Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'

export class Profile extends Component {

    static propTypes = {
        user: PropTypes.object.isRequired,
    }



    render() {

        return (
        <div className="content-section">
            <div className='media mt-2'>
                <img className ="rounded-circle account-img" src ={this.props.user.profile.image} />
                 <div className ='media-body'>
                    <h4 className ="account-heading d-inline">{this.props.user.profile.full_name}</h4>
                    <p className =" fs-6 d-inline text-secondary mx-3">#{this.props.user.id}</p>
                    <h6 className ="text-secondary">{this.props.user.profile.about_me}</h6>
                    <h6 className ="text-secondary">{this.props.user.profile.institute}</h6>
                    <h6 className ="text-secondary">{this.props.user.profile.address}</h6>

                </div>
           </div> 
           {(this.props.user.id == this.props.owner.id)?
                                 (<Link to="/papers">Export Papers</Link>
                                 ):""}          
        </div>
        )
    }
} 
const mapStateToProps = state =>({
    owner: state.auth.user,
})

export default connect(mapStateToProps,{})(Profile);