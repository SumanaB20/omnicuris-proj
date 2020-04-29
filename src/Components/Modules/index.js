import React from 'react';
import axios from 'axios';

import './Modules.css';

class Modules extends React.Component {
  constructor () {
    super ();
    this.state = {
      lessonDetails: {},
      visited: [],
    };
    this.showChapters = this.showChapters.bind (this);
  }

  showChapters (id, moduleData) {
    const {visited} = this.state;
    if (
      typeof this.state['show' + id] === 'undefined' ||
      this.state['show' + id] === false
    ) {
      const thisState = this;
      axios
        .get (
          'https://stgapi.omnicuris.com/api/v3/courses?courseSlug=thyroid-in-pregnancy&moduleId=' +
            id,
          {
            headers: {
              'Content-Type': 'application/json',
              'hk-access-token': '89e684ac-7ade-4cd8-bbdf-419a92f4cc5f',
            },
          }
        )
        .then (function (response) {
          // handle success
          const tempVisit = visited;
          tempVisit.push (id);
          thisState.setState (prev => ({
            ['show' + id]: true,
            visited: tempVisit,
            lessonDetails: response.data.lessonDetails[0].userChapterDetails,
          }));
          for (let i = 0; i < tempVisit.length; i++) {
            if (tempVisit[i] !== id) {
              thisState.setState (prev => ({
                ['show' + tempVisit[i]]: false,
              }));
            }
          }
          thisState.props.changeVideoURL (
            response.data.lessonDetails[0].userChapterDetails[0].content,
            moduleData,
            response.data.lessonDetails[0].userChapterDetails,
            response.data.lessonDetails[0].userChapterDetails[0].title
          );
        })
        .catch (function (error) {
          // handle error
          console.log (error);
        });
    } else {
      this.setState (prev => ({
        ['show' + id]: false,
      }));
    }
  }
  render () {
    const {moduleList} = this.props;
    const {lessonDetails} = this.state;
    return (
      <div id="scroll-bar" className="modules-page-container">
        <div className="div-block d-flex align-items-center">
          <i className="fa fa-info-circle intro-icon" aria-hidden="true" />
          <div className="intro-title">Intrduction</div>
        </div>
        {moduleList &&
          moduleList.map ((item, i) => {
            return (
              <div className="div-block" key={i}>
                <div
                  className="d-flex"
                  onClick={() => this.showChapters (item.id, item)}
                >
                  <img
                    className="profile-pic"
                    alt="profile-pic"
                    src={item.moduleExperts[0].profilePic}
                  />
                  <div className="info-div">
                    <span className="item-title">{item.title} {' - '} </span>
                    <span className="sub-title">{item.name}</span>
                    <div className="duration-string">
                      <i
                        className="fa fa-clock-o margin-right-5"
                        aria-hidden="true"
                      />
                      {item.durationStr}
                    </div>
                  </div>
                </div>

                {this.state['show' + item.id] === true &&
                  <div className="margin-top-20">
                    {lessonDetails !== {} &&
                      lessonDetails.map ((lesson, j) => {
                        return (
                          <div
                            className="div-block"
                            key={j}
                            onClick={() =>
                              this.props.changeVideoURL (
                                lesson.content,
                                item,
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
                  </div>}
              </div>
            );
          })}
      </div>
    );
  }
}

export default Modules;
