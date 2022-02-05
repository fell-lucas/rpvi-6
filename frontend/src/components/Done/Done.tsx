import React, { Component } from 'react';

import { Button } from '..';

type DoneProps = {
  btnText: string;
  btnLink: string;
};

export default class Done extends Component<DoneProps> {
  render() {
    return (
      <div className='text-center flex flex-col justify-between gap-8'>
        <div>
          <h1>{this.props.children}</h1>
          <hr className='m-12' />
          <div className='px-40'>
            <Button link={this.props.btnLink} type='filled'>
              {this.props.btnText}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
