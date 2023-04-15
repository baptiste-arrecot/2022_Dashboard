import React, { useState, useContext, useEffect } from 'react';
import Games, { Game } from './Games';
import Streams from './Streams';
import StreamLive from './StreamLive';
import Header from './Header';
import TwitchHome from './TwitchHome';
import Profile from './Profile';
import { StyleSheet } from 'react-native';
import UserPage from './UserPage';
import { TwitchContext } from '../Context/TwitchContext';
import { StoreContext } from '../../../utils/Store';

export default function FullTwitch() {
	const [displayedPage, setDisplayedPage] = useState("home");
	const [displayedStream, setDisplayedStream] = useState("Joueur_du_grenier");
	const [displayedUser, setDisplayedUser] = useState("Joueur_du_grenier");
	const [displayedGameStreams, setDisplayedGameStreams] = useState<Game>();
	// const { accessToken } = useContext(TwitchContext);
	const [accessToken, setAccessToken] = useState("");
	const { servicesAuth } = useContext(StoreContext);


	
	useEffect(() => {
		console.log('servicesAuth', servicesAuth);
		const auth = servicesAuth?.Twitch;
		if (auth) {
			setAccessToken(auth.accessToken);
		}
	}, [servicesAuth]);
	
	console.log('accessToken', accessToken);
	if (accessToken === "") return <></>;
	return (
		<>
			<Header setDisplayedPage={setDisplayedPage} setDisplayedGameStreams={setDisplayedGameStreams} />
			{displayedPage === "home" && <TwitchHome setDisplayedStream={setDisplayedStream} setDisplayedPage={setDisplayedPage} setDisplayedUser={setDisplayedUser} accessToken={accessToken} />}
			{displayedPage === "games" && <Games setDisplayedGameStreams={setDisplayedGameStreams} setDisplayedPage={setDisplayedPage} />}
			{displayedPage === "profile" && <Profile accessToken={accessToken} />}
			{displayedPage === "streams" && <Streams setDisplayedStream={setDisplayedStream} setDisplayedPage={setDisplayedPage} displayedGameStreams={displayedGameStreams} />}
			{displayedPage === "stream" && <StreamLive channel_id={displayedStream} setDisplayedUser={setDisplayedUser} setDisplayedPage={setDisplayedPage} />}
			{displayedPage === "user" && <UserPage user_id={displayedUser} setDisplayedStream={setDisplayedStream} setDisplayedPage={setDisplayedPage} />}
		</>
	);
}

export const styles = StyleSheet.create({
	title: {
		'fontSize': 20
	},
	centeredview: { 
		display: 'flex', 
		justifyContent: 'center', 
		alignItems: 'center' 
	}
})