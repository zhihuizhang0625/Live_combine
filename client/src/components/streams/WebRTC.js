import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { createStream } from "../../actions/stream";
import { fetchStream } from '../../actions/stream';
import bcrypt from 'bcryptjs'
import { Link } from "react-router-dom";
import { v4 as uuidv4} from "uuid";
/* webrtc dependency */
// const { v4: uuidV4} = require('uuid');


const io = require('socket.io-client');


const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

class WebRTC extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        title : '',
        description: '',
        token:'12345',
        successful:false
        };
    }

    

    render() {

        return (
            <h1>
                <Link to={`/webrtc/${uuidv4()}`} >Start WebRTC</Link>
            </h1>
        )
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
  
export default connect(mapStateToProps)(WebRTC);