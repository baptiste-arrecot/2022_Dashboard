import { useState, useEffect } from 'react';
import { Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { getFollowedStreams, getFollowedUsers, getMyProfile, getUser } from '../../../../apiRequest/apiDash';
import { styles } from './FullTwitch';
import { PreviewStream, Stream } from './Streams';

export type User = {
	id: string,
	login: string,
	displayed_name: string,
	description: string,
	profile_pic_url: string,
	offline_pic_url: string,
	email: string,
	created_at: string,
	view_count: number
}

export default function TwitchHome(props: any) {
	const [followedStreams, setFollowedStreams] = useState<Stream[]>([]);
	const [followedUsers, setFollowedUsers] = useState<User[]>([]);
	const [user, setUser] = useState<User>();
	const [accessToken] = useState(props.accessToken);

	const displayUser = (user_id: String) => {
		props.setDisplayedUser(user_id);
		props.setDisplayedPage("user");
	}

	useEffect(() => {
		getMyProfile(accessToken)
			.then(result => {
				result = result.data[0];
				var myUser: User = {
					id: result.id,
					login: result.login,
					displayed_name: result.display_name,
					description: result.description,
					profile_pic_url: result.profile_image_url,
					offline_pic_url: "",
					email: result.email,
					created_at: result.created_at,
					view_count: result.view_count
				}
				setUser(myUser);
				getFollowedStreams(accessToken, myUser.id)
					.then(result => {
						let dataArray = result.data;
						let finalArray = dataArray.map((stream: any) => {
							let newArray: Stream = {
								id: stream.id,
								user_id: stream.user_id,
								game_name: stream.game_name,
								user_name: stream.user_name,
								title: stream.title,
								viewers: stream.viewer_count,
								thumbnail_url: stream.thumbnail_url
									.replace("{width}", "500")
									.replace("{height}", "300"),
							}
							return newArray;
						});
						setFollowedStreams(finalArray);
					})
					.catch(console.error);
				getFollowedUsers(myUser.id)
					.then(result => {
						Promise.all(result.data.map(async (user: any) => {
							let response = await getUser(user.to_id);
							response = response.data[0];
							var fetchedUser: User = {
								id: response.id,
								login: response.login,
								displayed_name: response.display_name,
								description: response.description,
								profile_pic_url: response.profile_image_url,
								offline_pic_url: "",
								email: "",
								created_at: response.created_at,
								view_count: response.view_count
							};
							return fetchedUser;
						}))
							.then((followedUsers: User[]) => {
								setFollowedUsers(followedUsers);
							})
					});
			})
			.catch(console.error);
	}, [accessToken]);

	return (
		<>
			<Text>Welcome, {user?.displayed_name} !</Text>
			<Text>{'\n'}</Text>
			<ScrollView>

				<Text style={styles.title}>Followed Streams</Text>
				<Text>{'\n'}</Text>
				<>
					{followedStreams.map((stream: Stream) => (
						<>
							<PreviewStream stream={stream} setDisplayedStream={props.setDisplayedStream} setDisplayedPage={props.setDisplayedPage} />
							<Text>{'\n'}</Text>
						</>
					))}
				</>
				<Text style={styles.title}>Followed Users</Text>
				<Text>{'\n'}</Text>
				<>
					{followedUsers.map((user_followed: User) => (
						<>
							<TouchableOpacity style={{ flexDirection: 'row' }} onPress={() => { displayUser(user_followed.id) }}>
								<Image
									style={{
										width: 100,
										height: 100
									}}
									source={{
										uri: user_followed.profile_pic_url,
									}}
								/>
								<Text style={{ color: 'black' }}>{user_followed.displayed_name}</Text>
							</TouchableOpacity>
							<Text>{'\n'}</Text>
						</>
					))}
				</>
			</ScrollView>
		</>
	)
}