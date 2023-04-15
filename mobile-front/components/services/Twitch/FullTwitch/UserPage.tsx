import { useState, useEffect } from 'react';
import { getUser, getStream } from '../../../../apiRequest/apiDash';
import { User } from './TwitchHome'
import { Stream } from './Streams';
import { styles } from './FullTwitch';
import { View, Text, Image, TouchableOpacity } from 'react-native';

export default function UserPage(props: any) {
	const [user, setUser] = useState<User>();
	const [stream, setStream] = useState<Stream>();

	useEffect(() => {
		getUser(props.user_id)
			.then(response => {
				response = response.data[0];
				var fetchedUser: User = {
					id: response.id,
					login: response.login,
					displayed_name: response.display_name,
					description: response.description,
					profile_pic_url: response.profile_image_url,
					offline_pic_url: response.offline_image_url,
					email: "",
					created_at: response.created_at,
					view_count: response.view_count
				};
				setUser(fetchedUser);
			})
			.catch(console.error)
		getStream(props.user_id)
			.then(result => {
				let streamdata = result.data[0];
				if (streamdata === undefined)
					return;
				var finaldata: any = {
					id: streamdata.id,
					user_id: streamdata.user_id,
					game_name: streamdata.game_name,
					user_name: streamdata.user_name,
					title: streamdata.title.substring(0, 79),
					viewers: streamdata.viewer_count,
					thumbnail_url: streamdata.thumbnail_url
						.replace("{width}", "500")
						.replace("{height}", "300"),
				};
				setStream(finaldata);
			})
			.catch(console.error)
	}, [props.user_id]);

	const openStream = (user_id: string) => {
		props.setDisplayedStream(user_id);
		props.setDisplayedPage("stream");
	}

	return (
		<View style={styles.centeredview}>
			<Image
				style={{
					width: 200,
					height: 200
				}}
				source={{
					uri: user?.profile_pic_url,
				}}
			/>
			<Text>{'\n'}</Text>
			{user?.offline_pic_url !== "" && stream === undefined ?
				<Image
					style={{
						width: 350,
						height: 225
					}}
					source={{
						uri: user?.offline_pic_url,
					}}
				/> : <></>}
			{stream !== undefined ?
				<TouchableOpacity onPress={() => { openStream(user?.id ?? "") }}>
					<Image
						style={{
							width: 350,
							height: 225
						}}
						source={{
							uri: stream?.thumbnail_url,
						}}
					/>
					<Text style={{ color: 'red' }}>Live right now ! Current viewers : {stream?.viewers}</Text>
				</TouchableOpacity> : <></>}
			<Text>{'\n'}</Text>
			<Text style={styles.title}>{user?.displayed_name}</Text>
			<Text>{user?.description}</Text>
			<Text>{'\n'}</Text>
			<Text style={{ color: 'red' }}>Views : {user?.view_count}</Text>
			<Text>{'\n'}</Text>
		</View>
	)
}