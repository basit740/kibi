import React, { useState } from 'react';
import 'styling/Dashboard/components/FAQItem.css';

const Index = ({ question, answer }) => {
	const [toggle, setToggle] = useState(false);
	return (
		<div className={`faq_item ${toggle ? 'open' : ''}`}>
			<div className='faq_item__question'>
				<p>{question}</p>
				<button
					className='faq_item__toggle'
					onClick={(e) => setToggle(!toggle)}
				></button>
			</div>
			<p className='faq_item__answer'>{answer}</p>
		</div>
	);
};

export default Index;
