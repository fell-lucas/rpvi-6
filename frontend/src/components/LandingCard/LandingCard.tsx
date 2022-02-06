import React, { Component } from 'react';

export default class LandingCard extends Component {
  render() {
    return (
      <div className='bg-bg1 flex flex-1 w-full mb-6 text-black'>
        <div className='bg-bg2 flex flex-1 my-4 mx-6 drop-shadow-2xl rounded justify-around items-center p-8 gap-20'>
          {this.props.children}
        </div>
      </div>
    );
  }
}
