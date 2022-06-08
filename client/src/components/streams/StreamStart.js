import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreambyToken} from "../../actions/stream"
import history from '../../history';
import { Link } from 'react-router-dom';



class StreamStart extends React.Component{

  
  
    render() {
        return(
          <div>
              <h5>server</h5>
              <p>rtmp://localhost/live</p>
              
              <h5>your token is</h5>
              <p>{this.props.location.state.token}</p>
              <p>{this.props.user.businessId}</p>
              <p></p>
              <button><Link to={"/"}>start live</Link></button>
          </div>
        )
    }
}
const mapStateToProps= (state) => {
  const { isLoggedIn } = state.myAuth;
  const {user} = state.myAuth;
  const { message } = state.message;
  return {
    isLoggedIn,
    user,
    message,
  };
}

export default connect(mapStateToProps)(StreamStart);