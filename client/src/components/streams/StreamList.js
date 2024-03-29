import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions/stream'
import {clearMessage } from '../../actions/message'
import history  from '../../history';

class StreamList extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          createLive: false,
          currentUser: undefined,
        };
    
      }



    componentDidMount(){
        const user = this.props.user;
    
        if (user) {
          this.setState({
            currentUser: user,
            createLive: user.roles.includes("ROLE_BUSINESS"),
          });
        }
        this.props.fetchStreams()
    }


    // renderAdmin(stream) {
    //     if(stream.userId === this.props.currentUserId) {
    //         return (
    //             <div className="right floated content">
    //                 <Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
    //                 <Link to = {`/streams/delete/${stream.id}`}className="ui button negative">
    //                     Delete
    //                 </Link>
    //             </div>
    //         )
    //     }
    // }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {/* {this.renderAdmin(stream)} */}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/streams/${stream.id}`} className="header">
                        {stream.title}
                        </Link>
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        })
    }
    renderCreate() {
        if(this.props.isLoggedIn && this.state.createLive){
            return(
                <div style={{ textAlign: 'right'}}>
                    <Link to="/streams/new" className="ui button primary">
                    Create stream
                    </Link>
                </div>
            )
        }
    }
    render() {
        return (
        <div>
            <h2>Live Rooms</h2>
            <div className="ui celled list">{this.renderList()}</div>
            {this.renderCreate()}
        </div>
        )
    }
}
const mapStateToProps=(state) =>{
    return {
        streams: Object.values(state.streams),
        user: state.myAuth.user,
        isLoggedIn: state.myAuth.isLoggedIn
    }
}
export default connect(mapStateToProps, {fetchStreams}) (StreamList);