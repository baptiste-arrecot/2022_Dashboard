import { useState, useEffect, useContext } from 'react';
import { Text, Modal, View, TextInput } from 'react-native';
import { Card } from 'react-native-elements';
import axios from 'axios';
import { RedditContext } from '../Context/RedditContext';

type RedditProfile = {
	name: string;
	description: string;
	PPurl: string;
	karma: number;
}

export default function Profile(props: any) {
	const [profile, setProfile] = useState<RedditProfile>();

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get('http://api.drainboard.tk/services/reddit/Profile?accessToken=' + props.accessToken);
			// accessToken);
			setProfile({
				name: result?.data.name,
				description: result?.data.subreddit.public_description,
				PPurl: result?.data.icon_img.split("?")[0],
				karma: result?.data.total_karma
			})
		};
		fetchData();
	}, [/*props.accessToken*/]);
	return (
		<>
			<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Text>Reddit Account</Text>
				<Card.Image source={{ uri: profile?.PPurl }} />
				<Card.Divider>
					<Card.Title>u/{profile?.name}</Card.Title>
					<Text>
						DESCRIPTION: {profile?.description}
					</Text>
					<Text>Karma: {profile?.karma}</Text>
				</Card.Divider>
			</View>
		</>
	);
}