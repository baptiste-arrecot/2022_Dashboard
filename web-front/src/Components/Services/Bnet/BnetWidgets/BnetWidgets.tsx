import { useState, useEffect } from 'react';
import Ladder from './Ladder';
import CardViewer from './CardSearch';
import WoWProfile from './WoWProfile';
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function BnetWidget() {
	const [displayedPage, setDisplayedPage] = useState(localStorage.getItem('displayedPage') ? localStorage.getItem('displayedPage') : "CardViewer");


	useEffect(() => {
		localStorage.setItem('displayedPage', displayedPage ?? "CardViewer");
	}, [displayedPage])
	
	return (
		<div>
			<Header setDisplayedPage={setDisplayedPage}/>
			<br />
			{displayedPage === "Ladder" && <Ladder/>}
			{displayedPage === "profile" && <WoWProfile/>}
			{displayedPage === "CardViewer" && <CardViewer setDisplayedPage={setDisplayedPage}/>}
		</div>
	);
}