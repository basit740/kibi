import React from 'react';

import styles from 'styling/Dashboard/components/WelcomeBanner.module.css';

const WelcomeBanner = ({ title, children }) => {
	return (
		<div className={styles.welcome_banner}>
			<div className={styles.welcome_banner__text_box}>
				<h2 className={styles.welcome_banner__title}>{title}</h2>
				<p className={styles.welcome_banner__description}>{children}</p>
			</div>
			<div className={styles.welcome_banner__img_box}>
				<img
					src='/images/persons-n-calculator.png'
					alt='persons and calculator'
				/>
			</div>
		</div>
	);
};

export default WelcomeBanner;
