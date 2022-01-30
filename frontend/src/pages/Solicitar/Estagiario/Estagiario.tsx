import React, { Component } from 'react';
import LandingCard from '../../../components/LandingCard/LandingCard';
import OutlinedButton from '../../../components/OutlinedButton/OutlinedButton';
import ProgressBar from '../../../components/ProgressBar/ProgressBar';

export const EstagiarioRoute = '/solicitar/estagiario';

export default class Estagiario extends Component {
  render() {
    return (
      <>
        <ProgressBar items={3} active={1} />
        <LandingCard>
          <div></div>
        </LandingCard>
      </>
    );
  }
}
