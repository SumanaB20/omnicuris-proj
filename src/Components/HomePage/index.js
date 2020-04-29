import React from 'react';
import axios from 'axios';

import VideoPlayer from '../VideoPlayer';
import Modules from '../Modules';
import Experts from '../Experts';

import './HomePage.css';

class HomePage extends React.Component {
  constructor () {
    super ();
    this.state = {
      loading: true,
      courseDetails: {},
      lessonDetails: {},
      selectedItem: '',
      showModal: false,
    };
    this.handleVideoURLChange = this.handleVideoURLChange.bind (this);
    this.handleCloseModal = this.handleCloseModal.bind (this);
    this.handleEndVideo = this.handleEndVideo.bind (this);
  }

  componentDidMount () {
    const thisState = this;
    axios
      .get (
        'https://stgapi.omnicuris.com/api/v3/courses?courseSlug=thyroid-in-pregnancy',
        {
          headers: {
            'Content-Type': 'application/json',
            'hk-access-token': '89e684ac-7ade-4cd8-bbdf-419a92f4cc5f',
          },
        }
      )
      .then (function (response) {
        thisState.setState (prev => ({
          courseDetails: response.data.courseDetails,
          videoURL: response.data.courseDetails.introVideo,
          videoTitle: 'Introduction',
        }));
      })
      .catch (function (error) {
        // handle error
        console.log (error);
      });
    axios
      .get (
        'https://stgapi.omnicuris.com/api/v3/courses/thyroid-in-pregnancy/experts',
        {
          headers: {
            'Content-Type': 'application/json',
            'hk-access-token': '89e684ac-7ade-4cd8-bbdf-419a92f4cc5f',
          },
        }
      )
      .then (function (response) {
        thisState.setState (prev => ({
          expertDetails: response.data.expertDetails,
        }));
      })
      .catch (function (error) {
        console.log (error);
      });
  }
  handleVideoURLChange (url, item, data, title) {
    this.setState (prev => ({
      videoURL: url,
      videoTitle: title,
      lessonDetails: data,
      selectedItem: item,
    }));
    this.handleCloseModal ();
  }
  handleEndVideo () {
    const {lessonDetails, selectedItem} = this.state;
    if (lessonDetails && selectedItem) {
      this.setState (prev => ({
        showModal: true,
      }));
    }
  }
  handleCloseModal () {
    this.setState (prev => ({
      showModal: false,
    }));
  }
  render () {
    const {
      courseDetails,
      expertDetails,
      videoURL,
      videoTitle,
      lessonDetails,
      selectedItem,
      showModal,
    } = this.state;
    console.log (courseDetails);
    if (Object.keys (courseDetails).length === 0) {
      return (
        <div className="error-div">
          <div className="error-title">Nothing Found</div>
        </div>
      );
    }
    return (
      <div id="scroll-bar" className="page-container">
        <div className="header">
          Thyroid in Pregnanacy:
          {' '}
          <span className="sub-header"> Intorduction </span>
        </div>
        <div className="video-modules-container">

          <div className="video-container">
            {
              <VideoPlayer
                selectedTitle={videoTitle}
                videoSrc={videoURL}
                onEndVideo={this.handleEndVideo}
              />
            }
          </div>

          <div className="modules-container">
            <Modules
              moduleList={courseDetails.modules}
              changeVideoURL={this.handleVideoURLChange}
            />
          </div>

        </div>
        <div className="margin-bottom-20 margin-20 w-50">
          <div className="d-flex align-items-center justify-content-between">
            <h2 className="expert-heading">Description</h2>
            <div>
              <i className="fa fa-facebook social-icon" aria-hidden="true" />
              <i className="fa fa-twitter social-icon" aria-hidden="true" />
              <i
                className="fab fa-linkedin-in social-icon"
                aria-hidden="true"
              />
              <i className="fa fa-youtube social-icon" aria-hidden="true" />
              <i className="fa fa-whatsapp social-icon" aria-hidden="true" />
            </div>
          </div>
          <div>
            {courseDetails.description}
          </div>
        </div>
        <div className="expert-container">
          <Experts expertDetails={expertDetails} />
        </div>
        {showModal &&
          <div id="scroll-bar" className="div-modal-overflow">
            <div className="div-modal">
              <div className="close-div">
                <i
                  onClick={this.handleCloseModal}
                  className="fa fa-times close-icon"
                  aria-hidden="true"
                />
              </div>
              <div className="div-block d-flex align-items-center  justify-content-center">
                <i className="fa fa-coins intro-icon" aria-hidden="true" />
                <div className="intro-title">Credit Points Applicable</div>
              </div>
              <div className="div-block">
                <div className="d-flex">
                  <img
                    className="profile-pic"
                    alt="profile-pic"
                    src={selectedItem.moduleExperts[0].profilePic}
                  />
                  <div className="info-div">
                    <span className="item-title">
                      {selectedItem.title} {' - '}{' '}
                    </span>
                    <span className="sub-title">{selectedItem.name}</span>
                    <div className="duration-string">
                      <i
                        className="fa fa-clock-o margin-right-5"
                        aria-hidden="true"
                      />
                      {selectedItem.durationStr}
                    </div>
                  </div>
                </div>
                <div className="margin-top-20">
                  {lessonDetails !== {} &&
                    lessonDetails.map ((lesson, j) => {
                      return (
                        <div
                          className="div-block"
                          key={j}
                          onClick={() =>
                            this.handleVideoURLChange (
                              lesson.content,
                              selectedItem,
                              lessonDetails,
                              lesson.title
                            )}
                        >
                          <div className="d-flex">
                            <img
                              className="profile-pic"
                              alt="profile-pic"
                              src={lesson.chapterExperts[0].profilePic}
                            />
                            <div className="info-div">
                              <span className="item-title">
                                {'Chapter - ' + ++j} {' - '}{' '}
                              </span>
                              <span className="sub-title">
                                {lesson.title}
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
                <h2 className="expert-heading">Accredited By</h2>
                <div>
                  <img
                    className="logo-pic"
                    alt="profile-pic"
                    src={courseDetails.courseOrganizations[0].image}
                  />
                  <div> {courseDetails.courseOrganizations[0].name} </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

export default HomePage;
