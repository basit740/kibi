import React from 'react';
import Container from 'dashboard/components/Container';
import 'styling/Dashboard/pages/FAQ.css';
import FAQHeader from 'dashboard/components/FAQHeader';
import FAQItem from 'dashboard/components/FAQItem';
const Index = () => {
	const faqs = [
		{
			question: 'What is accounting journal entry software?',
			answer:
				'Accounting journal entry software is a computer program designed to assist businesses and accountants in recording financial transactions accurately and efficiently.',
		},
		{
			question: 'Why is accounting journal entry important?',
			answer:
				'Accounting journal entry is important because it provides a systematic way to record financial transactions, ensuring accuracy, accountability, and the ability to generate financial statements.',
		},
		{
			question: 'What are the main components of an accounting journal entry?',
			answer:
				'The main components of an accounting journal entry include the date of the transaction, the accounts involved, the amounts debited or credited, and a brief description of the transaction.',
		},
		{
			question:
				'How does accounting journal entry software help streamline the recording process?',
			answer:
				'Accounting journal entry software automates the process of recording transactions, eliminating manual entry errors, and providing features like templates, auto-population, and integration with other financial systems.',
		},
		{
			question:
				'Can accounting journal entry software generate financial reports?',
			answer:
				'Yes, many accounting journal entry software can generate financial reports by aggregating data from journal entries and presenting them in formats such as balance sheets, income statements, and cash flow statements.',
		},
		{
			question:
				'Is accounting journal entry software suitable for small businesses?',
			answer:
				'Yes, accounting journal entry software can be beneficial for small businesses as it simplifies the recording process, improves accuracy, and provides valuable financial insights.',
		},
		{
			question:
				'Are there any security measures in accounting journal entry software?',
			answer:
				'Yes, reputable accounting journal entry software often includes security measures such as user access controls, data encryption, and regular data backups to protect sensitive financial information.',
		},
		{
			question:
				'Can accounting journal entry software integrate with other business software?',
			answer:
				'Many accounting journal entry software can integrate with other business software like payroll systems, CRM systems, and inventory management tools, allowing for seamless data flow and reducing manual data entry.',
		},
		{
			question:
				'How does accounting journal entry software handle multiple currencies?',
			answer:
				'Accounting journal entry software designed for international businesses typically includes features to handle multiple currencies, such as automatic currency conversions and exchange rate updates.',
		},
		{
			question: 'Can accounting journal entry software be accessed remotely?',
			answer:
				'Yes, many modern accounting journal entry software offer cloud-based solutions, allowing users to access and work on their financial data from anywhere with an internet connection.',
		},
		{
			question:
				'What are some popular accounting journal entry software available in the market?',
			answer:
				'Some popular accounting journal entry software in the market include QuickBooks, Xero, Sage Intacct, NetSuite, and Zoho Books.',
		},
	];
	return (
		<Container>
			<div className='faq'>
				<FAQHeader />
				<div className='mt-32 flex flex-coloum gap-16'>
					{faqs.map((item, index) => (
						<FAQItem
							key={index}
							question={item.question}
							answer={item.answer}
						/>
					))}
				</div>
			</div>
		</Container>
	);
};

export default Index;
