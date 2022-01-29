import React, { Component } from 'react';
import './HeaderGuri.css'
import logo from '../../assets/guri-dtic-logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust, faPowerOff, faSitemap, faUser } from '@fortawesome/free-solid-svg-icons';

export default class HeaderGuri extends Component {
  render() {
    return <div className='header'>
      <img src={logo} alt="logo guri" width={886} height={109}  />
      <div style={{flexGrow: 100}}></div>
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
            <span style={{fontSize: "calc(2vmin)"}}>A-</span>&nbsp;&nbsp;
            <span>A</span>&nbsp;&nbsp;
            <span style={{fontSize: "calc(7px + 2vmin)"}}>A+</span>
          </div>
          <div className='inline-block'>
            <FontAwesomeIcon icon={faAdjust} />
            &nbsp;Contraste
          </div>
          <div className='inline-block'>
            <FontAwesomeIcon icon={faSitemap} />
            &nbsp;Mapa do Site
          </div>
        </div>
      </div>
    </div>;
  }
}
