import React from 'react';
import MenuItem from './MenuItem.jsx';
import styles from '../../../../styling/Dashboard/Sidebar/Menu.module.css';
import IconCompanySettings from './icons/CompanySettings';
import IconPrepaidsReview from './icons/PrepaidsReview';
import IconJournalEntries from './icons/JournalEntries';
import IconAmortizationWaterfall from './icons/AmortizationWaterfall';
const menuItems = [
	{
		title: 'Company Settings',
		to: '/dashboard/company-settings',
		icon: <IconCompanySettings />,
	},
	{
		title: 'Prepaids Review',
		to: '/dashboard/prepaids-review',
		icon: <IconPrepaidsReview />,
	},
	{
		title: 'Journal Entries',
		to: '/dashboard/journal-entries',
		icon: <IconJournalEntries />,
	},
	{
		title: 'Amortization Waterfall',
		to: '/dashboard/amortization-waterfall',
		icon: <IconAmortizationWaterfall />,
	},
];

const Index = ({ decrease }) => {
	return (
		<div className={`${styles.menu} ${decrease ? styles.decrease : ''}`}>
			<h6 className={styles.menu__title}>MENU</h6>
			<ul className={styles.menu__items}>
				{menuItems.map((item, index) => (
					<MenuItem
						title={item.title}
						key={index}
						icon={item.icon}
						decrease={decrease}
						to={item.to}
					/>
				))}
			</ul>
		</div>
	);
};

export default Index;
