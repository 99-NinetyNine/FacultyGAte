import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { login } from '../../actions/auth';

export class Login extends Component {

    state = {
        username: '',
        password: ''

    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.login(this.state.username, this.state.password)
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })

    }

    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }
        const { username, password } = this.state
        return (
            <div className="col-md-6 m-auto">
                <div className="card card body mt-5">
                    <div className="container">

                        <h3 className="text-center mt-3">Sign In</h3>
                        <form onSubmit={this.onSubmit}>

                            <div className="form-group mt-2">
                                <label>Username</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Username"
                                    name="username"
                                    onChange={this.onChange}
                                    value={username} />
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

                            {/* <div className="form-group">
                    <div className="custom-control custom-checkbox">
                    <input type="checkbox" className="custom-control-input" id="customCheck1" />
                    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
                    </div>
                </div> */}
                            <div className="form-group mt-4">
                                <button type="submit" className="btn btn-primary">
                                    Login
                                </button>
                            </div>
                            <p className="text-right mt-3">
                                Don't have an account  ?<Link to="/register">Sign Up </Link>
                            </p>

                            <p className="text-right mt-3">
                                <Link to="/password-reset">Forgot Password ?</Link>
                            </p>

                        </form>

                    </div>

                </div>
            </div>
        );
    }

}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login)