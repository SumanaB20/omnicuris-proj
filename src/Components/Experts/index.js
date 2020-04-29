import React from 'react';
import ItemsCarousel from 'react-items-carousel';

import './Experts.css';

class Experts extends React.Component {
  constructor () {
    super ();
    this.state = {
      activeItemIndex: 1,
      setActiveItemIndex: 1,
    };
    this.prevBtn = this.prevBtn.bind (this);
    this.nextBtn = this.nextBtn.bind (this);
  }
  prevBtn () {
    const {activeItemIndex} = this.state;
    if (activeItemIndex !== 0) {
      this.setState (prev => ({
        activeItemIndex: this.state.activeItemIndex - 1,
      }));
    }
  }
  nextBtn () {
    const {activeItemIndex} = this.state;
    if (activeItemIndex !== 14) {
      this.setState (prev => ({
        activeItemIndex: this.state.activeItemIndex + 1,
      }));
    }
  }
  render () {
    const {activeItemIndex} = this.state;
    const {expertDetails} = this.props;
    return (
      <div>
        <h2 className="expert-heading margin-20">Expert Panel</h2>
        <div style={{padding: `0 40px`}}>
          <ItemsCarousel
            infiniteLoop={false}
            gutter={12}
            activePosition={'center'}
            chevronWidth={60}
            disableSwipe={false}
            alwaysShowChevrons={false}
            numberOfCards={5}
            slidesToScroll={5}
            outsideChevron={true}
            showSlither={false}
            firstAndLastGutter={false}
            activeItemIndex={activeItemIndex}
            requestToChangeActive={value =>
              this.setState ({activeItemIndex: value})}
            rightChevron={<i className="fas fa-caret-square-right" />}
            leftChevron={<i className="fas fa-caret-square-left" />}
          >
            {expertDetails &&
              expertDetails.map ((item, i) => {
                return (
                  <div className="experts-container" key={i}>
                    <img
                      className="experts-img"
                      src={item.profilePic}
                      alt="profile-pic"
                    />
                    <div className="experts-name">
                      {item.title + ' '} {item.expertName}
                    </div>
                    <div className="experts-qualification">
                      {item.qualification}
                    </div>
                  </div>
                );
              })}
          </ItemsCarousel>
        </div>
      </div>
    );
  }
}

export default Experts;
