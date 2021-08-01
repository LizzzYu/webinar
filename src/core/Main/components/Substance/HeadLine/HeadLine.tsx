import React from 'react';
import classes from './headLine.module.scss';

export default function HeadLine(): JSX.Element {
  return (
    <div className={classes.headline__wrapper}>
      <h1 className={classes.headline__title}>Forex Webinars</h1>
      <p className={classes.headline__text}>Whether you are new to foreign exchange trading or already have some market experience, we believe that a solid FX trading education is vital to your success as a trader.</p>
    </div>
  );
}