import React, { Component } from 'react';
import Load from '../images/audio.svg';
import styles from '../styles/loading.module.css';

export default class Loading extends Component {
  render() {
    return (
      <div className={ styles.container }>
        <img src={ Load } alt="a" className={ styles.loadImg } />
        <p className={ styles.p }>Carregando...</p>
      </div>
    );
  }
}
