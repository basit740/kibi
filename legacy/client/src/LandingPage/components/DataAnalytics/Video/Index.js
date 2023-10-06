import React, { useState, useRef } from 'react';
import '../../../../styling/LandingPage/DataAnalytics/Video.css';
const Index = () => {
	const [isPlaying, setIsPlaying] = useState(false);
	const videoRef = useRef(null);
	const handlePlay = () => {
		setIsPlaying(true);
		videoRef.current.play();
	};

	const handlePause = () => {
		setIsPlaying(false);
		videoRef.current.pause();
	};
	return (
		<div className='video-container'>
			<video
				ref={videoRef}
				className='video'
				src='/videos/accounting.mp4'
				loop
				// controls={isPlaying}
			/>
			{!isPlaying && (
				<button className='play-button' onClick={handlePlay}>
					<img src='/icons/Mask.png' alt='' className='play-button__icon' />
				</button>
			)}
		</div>
	);
};

export default Index;
