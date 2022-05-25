
// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import { createStream } from '../../actions/stream'
// import StreamForm from './StreamForm'

// class StreamCreate extends React.Component{
    
//     onSubmit=(formValues) => {
//         this.props.createStream(formValues)
//     }
//     render(){
//         return (
//             <div>
//                 <h3> create Stream</h3>
//                 <StreamForm onSubmit={this.onSubmit} />
//             </div>
//         )
//     }
// }

// export default connect(null, {createStream})(StreamCreate);


import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { createStream } from "../../actions/stream";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};


// const vusername = (value) => {
//   if (value.length < 3 || value.length > 20) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The username must be between 3 and 20 characters.
//       </div>
//     );
//   }
// };

// const vpassword = (value) => {
//   if (value.length < 6 || value.length > 40) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         The password must be between 6 and 40 characters.
//       </div>
//     );
//   }
// };

class StreamCreate extends Component {
  constructor(props) {
    super(props);
    this.handleCreateStream = this.handleCreateStream.bind(this);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    
    this.state = {
      title : '',
      description: '',
      successful:false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value,
    });
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

    if (this.checkBtn.context._errors.length === 0) {
      this.props
        .dispatch(
          createStream(
              this.state.title,
              this.state.description
          )
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
  const { message } = state.message;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(StreamCreate);