import React from 'react';
import 'styling/Dashboard/components/JournalEntry.css';

import { formatMoney } from 'accounting-js';
const Index = ({ items }) => {
	return (
		<div className='journal_entry'>
			{items.map((item, index) => (
				<div className='journal_entry__item' key={index}>
					<label
						htmlFor='jounrnal_entry__label'
						className='jounrnal_entry__label'
					>
						{item.title}
					</label>
					<span className='journal_entry__data'>
						{typeof item.data === 'number' ? formatMoney(item.data) : item.data}
					</span>
				</div>
			))}

			<div className='journal_entry__actions'>
				<button className='journal_entry__btn journal_entry__btn--fill'>
					Download to Excel
				</button>
				<button className='journal_entry__btn journal_entry__btn--outlined'>
					Reopen Period
				</button>
			</div>
		</div>
	);
};

export default Index;
