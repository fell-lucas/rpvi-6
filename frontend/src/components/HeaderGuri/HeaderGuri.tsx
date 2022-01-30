import {
  faAdjust,
  faPowerOff,
  faSitemap,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';

import logo from '../../assets/guri-dtic-logo.png';

import './HeaderGuri.css';

export default class HeaderGuri extends Component {
  render() {
    return (
      <div className='header'>
        <img src={logo} alt='logo guri' width={886} height={109} />
        <div style={{ flexGrow: 100 }}></div>
        <div className='rightMenu'>
          <div className='userMenu'>
            <span>00:00:00</span>
            <div className='inline-block userItem'>
              <FontAwesomeIcon icon={faUser} />
              &nbsp;****************
            </div>
            <div className='inline-block'>
              <FontAwesomeIcon icon={faPowerOff} />
              &nbsp;Sair
            </div>
          </div>
          <div className='accessibilityMenu'>
            <div className='accessibilityText'>
              <span style={{ fontSize: 'calc(1.5vmin)' }}>
                <b>A-</b>
              </span>
              &nbsp;&nbsp;
              <span>
                <b>A</b>
              </span>
              &nbsp;&nbsp;
              <span style={{ fontSize: 'calc(5px + 2vmin)' }}>
                <b>A+</b>
              </span>
            </div>
            <div className='inline-block'>
              <FontAwesomeIcon icon={faAdjust} />
              &nbsp;<b>Contraste</b>
            </div>
            <div className='inline-block'>
              <FontAwesomeIcon icon={faSitemap} />
              &nbsp;<b>Mapa do Site</b>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
