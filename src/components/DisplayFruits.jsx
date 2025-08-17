// DisplayFruits.jsx
import React from 'react';

function DisplayFruits() {
	const fruits = ['사과', '바나나', '오렌지'];
	return (
		<div>
			<h2>과일 목록</h2>
			<ul>
				{fruits.map((fruit, index) => (
					<li key={index}>{fruit}</li>
				))}
			</ul>
		</div>
	);
}

export default DisplayFruits;
