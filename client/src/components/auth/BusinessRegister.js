import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import { connect } from "react-redux";
import { businessRegister } from "../../actions/auth";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

class BusinessRegister extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangeBusinessName = this.onChangeBusinessName.bind(this);
    this.onChangeBusinessWebsite = this.onChangeBusinessWebsite.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);

    this.state = {
      username: "",
      email: "",
      password: "",
      businessName:"",
      businessWebsite:"",
      phoneNumber:"",
      successful: false,
    };
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value,
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value,
    });
  }


  
  onChangeBusinessName(e) {
    this.setState({
      businessName: e.target.value,
    });
  }

  onChangeBusinessWebsite(e) {
    this.setState({
      businessWebsite: e.target.value,
    });
  }


  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }


  handleRegister(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });

    this.form.validateAll();

    const { dispatch, history } = this.props;

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          businessRegister(this.state.username, 
            this.state.email, 
            this.state.password,
            this.state.businessName,
            this.state.businessWebsite,
            this.state.phoneNumber)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
          history.push("/");
          window.location.reload();
        })
        .catch(() => {
          this.setState({
            successful: false,
          });
        });
    }
  }

  render() {
    const { message } = this.props;

    return (
      <div className="col-md-12">
        <div className="card card-container">
          {/* <img
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            alt="profile-img"
            className="profile-img-card"
          /> */}

          <Form
            onSubmit={this.handleRegister}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                    validations={[required, vusername]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChangeEmail}
                    validations={[required, email]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <Input
                    type="password"
                    className="form-control"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChangePassword}
                    validations={[required, vpassword]}
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="businessName">Company </label>
                  <Input
                    type="text"
                    className="form-control"
                    name="businessName"
                    value={this.state.birthday}
                    onChange={this.onChangeBusinessName}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="businessWebsite">businessWebSite </label>
                  <Input
                    type="text"
                    className="form-control"
                    name="businessWebsite"
                    value={this.state.businessWebSite}
                    onChange={this.onChangeBusinessWebsite}
                  />
                </div>


                <div className="form-group">
                  <label htmlFor="phoneNumber">Contact </label>
                  <Input
                    type="text"
                    className="form-control"
                    name="phoneNumber"
                    value={this.state.phoneNumber}
                    onChange={this.onChangePhoneNumber}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Sign Up</button>
                </div>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div className={ this.state.successful ? "alert alert-success" : "alert alert-danger" } role="alert">
                  {message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={(c) => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(BusinessRegister);