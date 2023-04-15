import { useState, useEffect } from 'react';
import SubRedditSearcher from './Feed';
import Profile from './Profile';
import Header from './Header'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function RedditWidget() {
	const [displayedPage, setDisplayedPage] = useState(localStorage.getItem('displayedPage') ? localStorage.getItem('displayedPage') : "CardViewer");


	useEffect(() => {
		localStorage.setItem('displayedPage', displayedPage ?? "Feed");
	}, [displayedPage])
	return (
		<div>
			<Header setDisplayedPage={setDisplayedPage}/>
			<br />
			{displayedPage === "profile" && <Profile/>}
			{displayedPage === "Feed" && <SubRedditSearcher/>}
		</div>
	);
}