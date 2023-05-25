import React, { Component } from 'react'
import { Navbar, Form, FormControl, Button, Nav, NavDropdown } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

export class Header extends Component {

  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  render() {
    const { isAuthenticated, user } = this.props.auth
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-print-none">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">FacultyGate</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            {isAuthenticated ? (
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#/profile">Profile</a>
                </li>
                <li className="nav-item">
                  <a onClick={this.props.logout} aria-current="page" className=" nav-link active" href="#/login">Log Out</a>
                </li>
              </ul>) : (<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#/register">Register</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#/login">Login</a>
                </li>
              </ul>)}

          </div>
        </div>
      </nav>

    )
  }
}


const mapStateToProps = state => ({
  auth: state.auth
})


export default connect(mapStateToProps, { logout })(Header)
