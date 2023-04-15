import { useState, useEffect, useContext } from 'react';
import { View, Text } from 'react-native';
import Ladder from './Ladder';
import CardViewer from './CardSearch';
import WoWProfile from './WoWProfile';
import { StoreContext } from '../../../utils/Store';


export default function BnetWidget() {
	const [accessToken, setAccessToken] = useState("");
	const { servicesAuth } = useContext(StoreContext);

	useEffect(() => {
		const auth = servicesAuth?.Reddit;
		if (auth) {
			setAccessToken(auth.accessToken);
		}
	}, [servicesAuth]);

	if (accessToken === "") return <></>;
	return (
		<View>
			<Text>{'\n'}</Text>
			<Ladder accessToken={accessToken}/>
			<Text>{'\n'}</Text>
			<WoWProfile accessToken={accessToken}/>
			<Text>{'\n'}</Text>
			<CardViewer accessToken={accessToken}/>
		</View>
	);
}