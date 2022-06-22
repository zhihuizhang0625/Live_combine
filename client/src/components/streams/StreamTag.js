import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchStreamsByTag } from '../../actions/stream';
import {clearMessage } from '../../actions/message'
import history  from '../../history';

class StreamTag extends React.Component{
    constructor(props) {
        super(props);
    
        this.state = {
          createLive: false,
          currentUser: undefined,
          render:false
        };
    
      }



    componentDidMount(){
        this.props.fetchStreamsByTag(this.props.match.params.tag)
        const user = this.props.user;
        if (user) {
          this.setState({
            currentUser: user,
            createLive: user.roles.includes("ROLE_BUSINESS"),
          });
        } 

        setTimeout(function() { //Start the timer
            this.setState({render: true}) //After 1 second, set render to true
        }.bind(this), 1000)
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
        if(this.state.render){
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
     }else{
        return(<div></div>)
     }
    }
    renderCreate() {
        if(this.props.isLoggedIn && this.state.createLive){
            return(
                <div style={{ textAlign: 'right'}}>
                    <Link to={`/streams/new`} className="ui button primary">
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
export default connect(mapStateToProps, {fetchStreamsByTag}) (StreamTag);