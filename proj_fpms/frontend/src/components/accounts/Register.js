import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {register} from "../../actions/auth"
import {createMessages} from '../../actions/messages'

export class Register extends Component {

    state={
        username:"",
        email:"",
        password:"",
        password2:"",
        registered: false,
        is_profile: false,

        full_name:"",
        about_me:"",
        institute:"",
        address:""

    }

    static propTypes ={
        register: PropTypes.func.isRequired,
        isAuthenticated:PropTypes.bool

    }

    onSubmit = (e) => {
        e.preventDefault();
        const { username, email, password, password2, registered, is_profile,full_name, about_me, institute, address} = this.state;
        const profile ={ full_name, about_me, institute, address}
        if (password !== password2) {
          this.props.createMessages({ passwordNotMatch: 'Passwords do not match' });
        } else {
          const newUser = {
            username,
            password,
            email,
            profile
            

          };
          this.props.register(newUser);
          this.setState({
              registered: true
          })
        }
      };
    
    
    onSubmit1 =(e)=>{
        e.preventDefault();
        this.setState({
            is_profile: true
        })
    }

    onChange = (e) =>{
        // if(e.target.name =="image"){
        //     this.setState({
        //         [e.target.name]: e.target.files[0]
        //     })
        // }
        // else{
        this.setState({
            [e.target.name] : e.target.value
        })
    // }

    }

    render() {
        if(this.state.registered){
            return <Redirect to ="/login" />
        }
        const {username, email, password, password2} =this.state

        if(this.state.is_profile==false){
        return (
            <div className ="col-md-6 m-auto">
                <div className ="card card body mt-5">
                    <div className="container">

                <h3 className="text-center mt-3">Sign Up</h3>
                <form onSubmit ={this.onSubmit1}> 

                <div className="form-group mt-2">
                    <label>Username</label>
                    <input type="text" 
                    className="form-control" 
                    placeholder="Username"
                    name ="username"
                    onChange ={this.onChange}
                    value= {username} />
                </div>

                
                <div className="form-group mt-2">
                    <label>Email</label>
                    <input type="email" 
                    className="form-control" 
                    placeholder="Email"
                    name="email"
                    onChange={this.onChange}
                    value={email} />
                </div>

                <div className="form-group mt-2">
                    <label>Password</label>
                    <input type="password"
                     className="form-control" 
                     placeholder="password"
                     name="password"
                     onChange={this.onChange}
                     value={password} />
                </div> 
                <div className="form-group mt-2">
                    <label>Confirm Password</label>
                    <input type="password"
                     className="form-control" 
                     placeholder="password"
                     name="password2"
                     onChange={this.onChange}
                     value={password2} />
                </div>


                <button type="submit" 
                    className="btn btn-primary btn-block mt-4">Next</button>
                <p className="forgot-password text-right mt-3">
                    Already have an account <Link to="/login"> Sign In</Link>
                </p>
                </form>
                </div>
                </div>
            </div>
        );
    }



    else{
        return(

            <div className ="col-md-6 m-auto">
            <div className ="card card body mt-5">
                <div className="container">

            <h3 className="text-center mt-3">Sign Up</h3>
            <form onSubmit ={this.onSubmit}> 

            <div className="form-group mt-2">
                <label>Full Name</label>
                <input type="text" 
                className="form-control" 
                placeholder=""
                name ="full_name"
                onChange ={this.onChange}
                value= {this.state.full_name} />
            </div>

            
            <div className="form-group mt-2">
                <label>About Me</label>
                <input type="textarea"
                className="form-control" 
                placeholder=""
                name="about_me"
                onChange={this.onChange}
                value={this.state.about_me} />
            </div>

            <div className="form-group mt-2">
                <label>Affiliated Institute</label>
                <input type="text"
                 className="form-control" 
                 placeholder=""
                 name="institute"
                 onChange={this.onChange}
                 value={this.state.institute} />
            </div> 
            <div className="form-group mt-2">
                <label>Address</label>
                <input type="text"
                 className="form-control" 
                 placeholder=""
                 name="address"
                 onChange={this.onChange}
                 value={this.state.address} />
            </div>


            {/* <div className="form-group mt-2">
                <label>Profile Avatar</label>
                <input type="file"
                 accept="image/*"
                 className="form-control" 
                 placeholder=""
                 name="image"
                 onChange={this.onChange}
                 value={this.state.image} />
            </div> */}


            <button type="submit" 
                className="btn btn-primary btn-block mt-4">Submit</button>
            </form>
            </div>
            </div>
        </div>




        )
    }
}

}

const mapStateToProps = state =>({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {register, createMessages} )(Register)