import React, { Component } from 'react';
import styles from '../styles/notFound.module.css';

export default class NotFound extends Component {
  render() {
    return (
      <div className={ styles.container }>
        <h1>Ops!</h1>
        <p>A página que você está procurando não foi encontrada.</p>
      </div>
    );
  }
}
