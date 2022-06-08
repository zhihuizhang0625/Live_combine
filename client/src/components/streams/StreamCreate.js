import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { createStream } from "../../actions/stream";
import { fetchStream } from '../../actions/stream';
import bcrypt from 'bcryptjs'

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


class StreamCreate extends Component {
  constructor(props) {
    super(props);
    this.handleCreateStream = this.handleCreateStream.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    
    this.state = {
      businessId:this.props.user.businessId,
      title : '',
      description: '',
      token:'12345',
      successful:false
    };
  }



  onChangeTitle(e) {
  
    this.setState({
      title: e.target.value,
    });
    const token = Math.floor(Math.random()*10000)+Math.random().toString(36).slice(2, 7);
    this.setState({
      token: token,
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }


  handleCreateStream(e) {
    e.preventDefault();

    this.setState({
      successful: false,
    });
  

    this.form.validateAll();

    const { dispatch, history } = this.props;


    var stream = {
      title: this.state.title,
      description: this.state.description,
      token:this.state.token
    };

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          createStream(this.state.businessId,stream)
        )
        .then(() => {
          this.setState({
            successful: true,
          });
          history.push({pathname:"/streams/start",state:{token:this.state.token}});
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
            onSubmit={this.handleCreateStream}
            ref={(c) => {
              this.form = c;
            }}
          >
            {!this.state.successful && (
              <div>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="title"
                    value={this.state.title}
                    onChange={this.onChangeTitle}
                    validations={[required]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <Input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={this.state.description}
                    onChange={this.onChangeDescription}
                    validations={[required]}
                  />
                </div>

               

                <div className="form-group">
                  <button className="btn btn-primary btn-block">Create</button>
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
  const { isLoggedIn } = state.myAuth;
  const {user} = state.myAuth;
  const { message } = state.message;
  return {
    isLoggedIn,
    user,
    message,
  };
}

export default connect(mapStateToProps)(StreamCreate);