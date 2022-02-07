import {
  faAdjust,
  faPowerOff,
  faSitemap,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import React, { Component } from 'react';

import logo from '../../assets/guri-dtic-logo.png';

export default class HeaderGuri extends Component {
  render() {
    return (
      <div
        className={classNames(
          'bg-bg1',
          'flex',
          'mt-6',
          'p-2',
          'px-10',
          'items-center',
          'justify-items-stretch',
          'text-primary'
        )}
      >
        <img src={logo} alt='logo guri' width={886} height={109} />
        <div className={classNames('flex-grow')}></div>
        <div className={classNames('flex', 'flex-col', 'gap-6')}>
          <div
            className={classNames(
              'flex',
              'justify-evenly',
              'bg-primary',
              'rounded-2xl',
              'p-2',
              'text-white'
            )}
          >
            <span>00:00:00</span>
            <div className={classNames('inline-block', 'border-x-2', 'px-3')}>
              <FontAwesomeIcon icon={faUser} />
              &nbsp;****************
            </div>
            <div className={classNames('inline-block')}>
              <FontAwesomeIcon icon={faPowerOff} />
              &nbsp;Sair
            </div>
          </div>
          <div className={classNames('flex', 'items-baseline', 'gap-8')}>
            <div>
              <span className={classNames('cursor-pointer', 'text-sm')}>
                <b>A-</b>
              </span>
              &nbsp;&nbsp;
              <span className={classNames('cursor-pointer')}>
                <b>A</b>
              </span>
              &nbsp;&nbsp;
              <span className={classNames('cursor-pointer', 'text-2xl')}>
                <b>A+</b>
              </span>
            </div>
            <div className={classNames('inline-block')}>
              <FontAwesomeIcon icon={faAdjust} />
              &nbsp;<b>Contraste</b>
            </div>
            <div className={classNames('inline-block')}>
              <FontAwesomeIcon icon={faSitemap} />
              &nbsp;<b>Mapa do Site</b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
