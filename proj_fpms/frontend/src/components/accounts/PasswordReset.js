import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link , Redirect} from 'react-router-dom'
import PropTypes from 'prop-types'
import { resetPassword, resetConfirm } from '../../actions/auth';

export class PasswordReset extends Component {

    state ={
        email: "",
        username:"",
        otp:"",
        newPass:"",

        reset: true, 
        confirm:true,
        redirect: false
    }

    static propTypes = {
        resetPassword: PropTypes.func.isRequired,
        resetConfirm: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = (e)=> {
        e.preventDefault()
        this.props.resetPassword(this.state.email)
        this.setState({
            reset:false
        })
    }

    onSubmit1 =(e) =>{
        e.preventDefault()
        this.props.resetConfirm(this.state.username, this.state.otp, this.state.newPass)
        this.setState({
            redirect : true
        })

    
    }

    onConfirm = (e) =>{
        e.preventDefault()
        this.setState({
            confirm : false
        })
    }

    onChange = (e) =>{
        this.setState({
            [e.target.name] : e.target.value
        })

    }


    render() {
        if (this.state.redirect){
            return <Redirect to ="/" />
        }
        return (
            
             <div className ="col-md-6 m-auto">
                {(this.state.reset)? (
                <div className ="card card body mt-5">
               
                <div className ="container">

                <h3 className="text-center mt-3">Reset Password</h3>
                <form onSubmit ={this.onSubmit}> 

                <div className="form-group mt-2">
                    <label>Email</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Email"
                    name ="email"
                    onChange ={this.onChange}
                    value= {this.state.email} />
                </div>
             <div className="form-group mt-4">
            <button type="submit" className="btn btn-primary my-2">
              Submit
            </button>
          </div>
                </form>
                </div>

             </div>):
                (<div className ="card card body mt-5">
               
              
               <div className ="container">

               <h3 className="text-center mt-3">Use OTP to reset password</h3>
               <form onSubmit ={this.onSubmit1}> 
               
               {(this.state.confirm)?(<div>
               <div className="form-group mt-2">
                   <label>Enter your OTP </label>
                   <input type="text" 
                   className="form-control" 
                   placeholder="OTP"
                   name ="otp"
                   onChange ={this.onChange}
                   value= {this.state.otp} />
               </div>
            <div className="form-group mt-4">
           <button type="button" onClick ={this.onConfirm} className="btn btn-primary my-2">
             Next
           </button>
         </div>  
         </div> ):(
             <div>
                   <div className="form-group mt-2">
                   <label>Username</label>
                   <input type="text" 
                   className="form-control" 
                   placeholder="Username"
                   name ="username"
                   onChange ={this.onChange}
                   value= {this.state.username} />
               </div>

               <div className="form-group mt-2">
                   <label>New Password</label>
                   <input type="password" 
                   className="form-control" 
                   placeholder="New Password"
                   name ="newPass"
                   onChange ={this.onChange}
                   value= {this.state.newPass} />
               </div>

               <div className="form-group mt-4">
            <button type="submit" className="btn btn-primary my-2">
              Submit
            </button>
          </div>
             </div>
         )}
               </form>
               </div>

           
            </div>
    )}
            </div>
        
        )}

}
const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {resetPassword, resetConfirm})(PasswordReset)
