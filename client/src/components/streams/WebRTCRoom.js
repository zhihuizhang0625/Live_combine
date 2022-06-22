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

    componentDidMount() {
        // const script1 = document.createElement("script");
        // script1.src = "https://unpkg.com/peerjs@1.4.5/dist/peerjs.min.js";
        // script1.defer = true;
        // const socket = io('127.0.0.1:3060');
        const socket = io('localhost:3060');
        const videoGrid = document.getElementById('video-grid')
        // const myPeer = new Peer(undefined, {
        //     host: '/',
        //     port: '3016'
        // })
        // if you don't want to start your peerserver, could just use the default
        const myPeer = new Peer()

        const myVideo = document.createElement('video')
        myVideo.muted = true
        const peers = {}

        navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true
        }).then(stream => {
            addVideoStream(myVideo, stream)

            // support multi-user
            myPeer.on('call', call => {
                call.answer(stream)
                const video = document.createElement('video')
                call.on('stream', userVideoStream => {
                    addVideoStream(video, userVideoStream)
                })
            })

            socket.on('user-connected', userId => {
                connectToNewUser(userId, stream)
            })

        })

        socket.on('user-disconnected', userId => {
            if (peers[userId]) peers[userId].close()
        })

        myPeer.on('open', id => {
            socket.emit('join-room', this.state.room_id, id)
        })

        socket.on('user-connected', userId => {
            console.log('User connected: ' + userId)
        })

        function connectToNewUser(userId, stream) {
            const call = myPeer.call(userId, stream)
            const video = document.createElement('video')
            call.on('stream', userVideoStream => {
                addVideoStream(video, userVideoStream)
            })
            call.on('close', () => {
                video.remove()
            })

            peers[userId] = call
        }

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