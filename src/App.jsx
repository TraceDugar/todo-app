import React from 'react';
import { useContext } from 'react';
import { settingsContext } from './'

import ToDo from './Components/ToDo/ToDo';

export default class App extends React.Component {
  render() {
    return (
      <ToDo />
    );
  }
}