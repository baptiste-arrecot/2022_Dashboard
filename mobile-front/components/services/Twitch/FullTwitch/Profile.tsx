import { useState, useEffect } from 'react';
import { getMyProfile, postDescription } from '../../../../apiRequest/apiDash';
import { User } from './TwitchHome'
import { View, Text, Image, TextInput, Button } from 'react-native';
import { styles } from './FullTwitch';

export default function Profile(props: any) {
	const [user, setUser] = useState<User>();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [accessToken] = useState(props.accessToken);
	const [description, setDescription] = useState("");

	const setFetchedUser = (result: any) => {
		result = result.data[0];
		var myUser: User = {
			id: result.id,
			login: result.login,
			displayed_name: result.display_name,
			description: result.description,
			profile_pic_url: result.profile_image_url,
			offline_pic_url: result.offline_image_url,
			email: result.email,
			created_at: new Date(result.created_at).toDateString(),
			view_count: result.view_count
		}
		setUser(myUser);
	}

	useEffect(() => {
		getMyProfile(accessToken)
			.then(result => {
				setFetchedUser(result);
			})
			.catch(console.error);
	}, [accessToken]);

	const updateDescription = () => {
		setIsEditing(false);
		postDescription(accessToken, description)
			.then(response => {
				setFetchedUser(response);
			})
			.catch(console.error);
	}

	const handleInput = (e: any) => {
		setDescription(e.target.value);
	}

	const EditButton = () => (
		<Button
			onPress={() => { setIsEditing(true) }}
			title="Edit"
			color="#841584"
			accessibilityLabel="Learn more about this purple button"
		/>
	);

	const SaveButton = () => (
		<Button
			onPress={updateDescription}
			title="Update"
			color="#841584"
			accessibilityLabel="Learn more about this purple button"
		/>
	);

	return (
		<View style={styles.centeredview}>
			<Text style={styles.title}>My account</Text>
			<Text>{'\n'}</Text>
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
			<Text>{user?.displayed_name}</Text>
			<Text>{'\n'}</Text>
			{isEditing === false ?
				<Text>
					{user?.description}
				</Text>
				: <TextInput
				onChangeText={setDescription}
				value={description}
				placeholder="Enter description"
				/>
			}
			<Text>{'\n'}</Text>
			<Text>
				login : {user?.login}
			</Text>
			<Text>
				user id : {user?.id}
			</Text>
			<Text>
				email : {user?.email}
			</Text>
			<Text>
				account created the {user?.created_at}
			</Text>
			<Text style={{ color: 'red' }}>Current viewers : {user?.view_count}</Text>
			<Text>{'\n'}</Text>
			{isEditing === false ? <EditButton /> : <SaveButton />}
			<Text>{'\n'}</Text>
		</View >
	)
}