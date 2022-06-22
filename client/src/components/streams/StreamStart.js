import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchStreamsByBusinessId, fetchStreams} from "../../actions/stream"
import history from '../../history';
import { Link } from 'react-router-dom';



class StreamStart extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
          currentStream: null,
          currentUser: undefined,
          token: this.props.location.state.token
        };
    
      }

    componentDidMount(){
        this.props.fetchStreamsByBusinessId(this.props.match.params.businessId)
        
    }

    handleCurrentStream() {
         return this.props.streams.map(stream => {
            if(stream.token === this.state.token){
               return(<Link to={`/streams/${stream.id}`} className="header">
                    start live
               </Link>)
            }
        })
    }


    render() {
        console.log(this.state.currentStream)
        return(
          <div>
              <h5>server</h5>
              <p>rtmp://localhost/live</p>
              <h5>your token is</h5>
              <p>{this.props.location.state.token}</p>
              {this.handleCurrentStream()}
          </div>
        )
    }
}
const mapStateToProps= (state) => {
    return {
        streams: Object.values(state.streams),
        user: state.myAuth.user,
        isLoggedIn: state.myAuth.isLoggedIn
    }
}

export default connect(mapStateToProps,{fetchStreamsByBusinessId})(StreamStart);