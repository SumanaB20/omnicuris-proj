import React from 'react';
import './VideoPlayer.css';

class VideoPlayer extends React.Component {
  constructor () {
    super ();
    this.state = {
      showModel: false,
    };
    this.ended = this.ended.bind (this);
  }
  ended () {
    // alert ('ended');
    this.props.onEndVideo ();
  }
  render () {
    return (
      <div className="d-flex flex-grow-1">
        {this.props.videoSrc &&
          <div className="position-relative">
            <div className="video-title">
              {this.props.selectedTitle}
            </div>
            <video
              key={this.props.videoSrc}
              className="videoplayer-container"
              width="100%"
              controls
              autoPlay
              // loop
              muted
              onEnded={this.ended}
            >
              <source src={this.props.videoSrc} type="video/mp4" />
              Your browser does not support HTML video.
            </video>
          </div>}
      </div>
    );
  }
}

export default VideoPlayer;
