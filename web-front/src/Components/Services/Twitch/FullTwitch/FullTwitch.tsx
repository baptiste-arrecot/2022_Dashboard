import React, { useState, useEffect, useContext } from 'react';
import './FullTwitch.css';
import Games, { Game } from './Games';
import Streams from './Streams';
import StreamLive from './StreamLive';
import Header from './Header';
import TwitchHome from './TwitchHome';
import Profile from './Profile';
import 'twitch-stream-embed';
import 'bootstrap/dist/css/bootstrap.min.css';
import './theme_twitch.css';
import UserPage from './UserPage';
import { TwitchContext } from '../Context/TwitchContext';

export default function FullTwitch() {
	const [displayedPage, setDisplayedPage] = useState(localStorage.getItem('displayedPage') ? localStorage.getItem('displayedPage') : "home");
	const [displayedStream, setDisplayedStream] = useState(localStorage.getItem('displayedStream') ? localStorage.getItem('displayedStream') : "Joueur_du_grenier");
	const [displayedUser, setDisplayedUser] = useState(localStorage.getItem('displayedUser') ? localStorage.getItem('displayedUser') : "Joueur_du_grenier");
	const [displayedGameStreams, setDisplayedGameStreams] = useState<Game>();
	const { accessToken } = useContext(TwitchContext);

	useEffect(() => {
		localStorage.setItem('displayedPage', displayedPage ?? "games");
	}, [displayedPage])

	useEffect(() => {
		localStorage.setItem('displayedStream', displayedStream ?? "Joueur_du_grenier");
	}, [displayedStream])

	useEffect(() => {
		localStorage.setItem('displayedUser', displayedUser ?? "Joueur_du_grenier");
	}, [displayedUser])

	return (
		<div>
			<Header setDisplayedPage={setDisplayedPage} setDisplayedGameStreams={setDisplayedGameStreams} />
			<br />
			{displayedPage === "home" && <TwitchHome setDisplayedStream={setDisplayedStream} setDisplayedPage={setDisplayedPage} setDisplayedUser={setDisplayedUser} accessToken={accessToken} />}
			{displayedPage === "games" && <Games setDisplayedGameStreams={setDisplayedGameStreams} setDisplayedPage={setDisplayedPage} />}
			{displayedPage === "profile" && <Profile accessToken={accessToken} />}
			{displayedPage === "streams" && <Streams setDisplayedStream={setDisplayedStream} setDisplayedPage={setDisplayedPage} displayedGameStreams={displayedGameStreams} />}
			{displayedPage === "stream" && <StreamLive channel_id={displayedStream} setDisplayedUser={setDisplayedUser} setDisplayedPage={setDisplayedPage} />}
			{displayedPage === "user" && <UserPage user_id={displayedUser} setDisplayedStream={setDisplayedStream} setDisplayedPage={setDisplayedPage} />}
		</div>
	);
}