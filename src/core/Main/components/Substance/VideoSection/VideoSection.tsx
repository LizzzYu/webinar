import React from 'react';
import arrowRight from '../../../../../assets/right-arrow.png';

import classes from './videoSection.module.scss';

export default function VideoSection(): JSX.Element {
	return (
		<div className={classes.wrapper}>
			<div className={classes.textContent}>
				<p className={classes.textContent__title}>
					Meet Your Host - Alistair Schultz
				</p>
				<p className={classes.textContent__text}>
					With more than 15 years of experience covering both the FX and CFD
					markets, Alistair has extensive knowledge covering algorithmic
					trading, market analysis & an impressive educational background.
				</p>
				<p className={classes.textContent__text}>
					As the author of ‘Essentials for Trading Students – An Overview of the
					Basics for Aspiring Traders’, which was released in 2017, Alistair
					will take any aspiring trader from the basics right through to
					advanced analytics used in institutional funds.
				</p>
				<p className={classes.textContent__text}>
					At the core of Alistair’s teachings is the ability to help each trader
					uncover their &apos;Trading DNA&apos;, helping them flourish with the
					skills and timeframes that work best for them.
				</p>
				<div className={classes.textContent__seeMore}>
					<p className={classes.textContent__text}>See more</p>
					<img src={arrowRight} alt="see_more" />
				</div>
			</div>
			<iframe
				className={classes.videoSec}
				width="560"
				height="315"
				src="https://www.youtube.com/embed/PlCbgZxonJs"
				title="YouTube video player"
				frameBorder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			/> 
		</div>
	);
}
