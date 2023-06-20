import React from 'react';
import Container from 'dashboard/components/Container';
import Card from 'dashboard/components/UI/Card';
const Index = () => {
	return (
		<Container>
			<h2>Prepaids Review</h2>
			<div className='grid grid-4 gap-24'>
				<Card>
					<div className='flex align-center gap-4'>
						<h6>Period End Date</h6>
						<select name='period-end-date' id='period-end-date'>
							<option value='May 31, 2023'>May 31, 2023</option>
						</select>
					</div>
				</Card>
				<Card>
					<h3>Card</h3>
				</Card>
				<Card>
					<h3>Card</h3>
				</Card>
				<Card>
					<h3>Card</h3>
				</Card>
			</div>
		</Container>
	);
};

export default Index;
