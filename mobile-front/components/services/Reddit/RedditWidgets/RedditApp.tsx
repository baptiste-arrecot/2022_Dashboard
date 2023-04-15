import { useState, useEffect, useContext } from 'react';
import { Text } from 'react-native'
import SubRedditSearcher from './Feed';
import Profile from './Profile';
import { StoreContext } from '../../../utils/Store';

export default function RedditWidget() {
	const [accessToken, setAccessToken] = useState("");
	const { servicesAuth } = useContext(StoreContext);

	useEffect(() => {
		console.log('servicesAuth', servicesAuth);
		const auth = servicesAuth?.Reddit;
		if (auth) {
			setAccessToken(auth.accessToken);
		}
	}, [servicesAuth]);
	
	console.log('accessToken', accessToken);
	if (accessToken === "") return <></>;
	return (
		<>
			<Text>{'\n'}</Text>
			<Profile accessToken={accessToken}/>
			<SubRedditSearcher accessToken={accessToken}/>
		</>
	);
}
