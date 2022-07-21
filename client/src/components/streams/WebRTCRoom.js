import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { connect } from "react-redux";
import { createStream } from "../../actions/stream";
import { fetchStream } from '../../actions/stream';
import { RouteComponentProps } from "react-router-dom";
import bcrypt from 'bcryptjs'
import { Peer } from "peerjs";
import { io } from "socket.io-client";
import { add, isFunction } from "lodash";
/* webrtc dependency */
const { v4: uuidV4} = require('uuid');
// const io = require('socket.io-client');


const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

class WebRTCRoom extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
        title : '',
        description: '',
        token:'12345',
        successful:false,
        room_id:this.props.match.params.id,
        };
    }

    defaultProps

    componentDidMount() {
        
        // main part of webrtc

        // specify streamer or viewer. 
        let streamer = false;
        if (this.props.location.state !== undefined) {
            streamer = true;
        }
        console.log("streamer view: " + streamer)
        
        // config
        const socket = io('localhost:3060');
        const videoGrid = document.getElementById('video-grid')
        const myPeer = new Peer()

        const myVideo = document.createElement('video')
        myVideo.muted = true
        const peers = {}

        // try to get video input of the browser
        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            // if streamer allowed, then add the video stream and start a listener
            if (streamer) {
                addVideoStream(myVideo, stream)
                socket.on('user-connected', userId => {
                    console.log("new user coming: " + userId)
                    connectToNewUser(userId, stream)
                })
            }
            // addVideoStream(myVideo, stream)

            // support multi-user, userd for replying to others' call.
            // myPeer.on('call', call => {
            //     // call.answer(stream)
            //     const video = document.createElement('video')
            //     call.on('stream', userVideoStream => {
            //         addVideoStream(video, userVideoStream)
            //         // incomingStreams = true;
            //     })
            // })

            // everytime a user comes in, call each user in this room.
            // socket.on('user-connected', userId => {
            //     console.log("new user coming: " + userId)
            //     connectToNewUser(userId, stream)
            // })

        })
        
        // if this is a viewer, answer the peerjs call from streamer and add the incoming stream here.
        if (!streamer) {
            myPeer.on('call', call => {
                call.answer()
                console.log("I'm answering. And waiting for incoming stream")
                call.on('stream', userVideoStream => {
                    addVideoStream(myVideo, userVideoStream)
                })
            })
        }

        // socket.on('user-disconnected', userId => {
        //     if (peers[userId]) peers[userId].close()
        // })

        // join the same room of socket.io
        myPeer.on('open', id => {
            socket.emit('join-room', this.state.room_id, id)
        })

        // when a new user comes, streamer will use this to peerjs call the new user.
        function connectToNewUser(userId, stream) {
            console.log("calling new user.")
            const call = myPeer.call(userId, stream)

            // const video = document.createElement('video')
            // call.on('stream', userVideoStream => {
            //     addVideoStream(video, userVideoStream)
            // })
            // call.on('close', () => {
            //     video.remove()
            // })

            // useless
            peers[userId] = call
        }

        // add the video stream to the video part.
        function addVideoStream(video, stream) {
            video.srcObject = stream
            video.addEventListener('loadedmetadata', () => {
                video.play()
            })
            videoGrid.append(video)
        }
    }

    render() {
        return(
            <div>
                <h1>{`${this.state.room_id}`}</h1>
                <div id="video-grid"></div>
            </div>
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
  
export default connect(mapStateToProps)(WebRTCRoom);