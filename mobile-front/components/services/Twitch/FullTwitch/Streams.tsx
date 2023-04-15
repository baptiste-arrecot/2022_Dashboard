import { useState, useEffect } from 'react';
import { Game } from './Games';
import { getTopStreams } from '../../../../apiRequest/apiDash';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { styles } from './FullTwitch';
// import './../../Reddit/RedditWidgets/searchbar.css'

export type Stream = {
	id: string;
	user_id: string;
	game_name: string;
	user_name: string;
	title: string;
	viewers: number;
	thumbnail_url: string;
}

export const PreviewStream = (props: any) => {
	const openStream = (user_id: string) => {
		props.setDisplayedStream(user_id);
		props.setDisplayedPage("stream");
	}

	return (
		<TouchableOpacity onPress={() => { openStream(props.stream.user_id) }}>
			<Image
				style={{
					width: 250,
					height: 150
				}}
				source={{
					uri: props.stream.thumbnail_url,
				}}
			/>
			<Text>{props.stream.title}</Text>
			<Text>{props.stream.user_name}</Text>
			<Text style={{ color: 'red' }}>Current viewers : {props.stream.viewers}</Text>
			<Text>is playing {props.stream.game_name}</Text>
		</TouchableOpacity>
	);
};

export default function Streams(props: any) {
	const [streams, setStreams] = useState<Stream[]>([]);
	const [displayedGameStreams] = useState<Game>(props.displayedGameStreams);
	const [search, setSearch] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			getTopStreams(displayedGameStreams?.id, ((search !== '') ? search : undefined))
				.then(result => {
					let dataArray = result.data;
					let finalArray = dataArray.map((stream: any) => {
						let newTitle = stream.title.length > 66 ? stream.title.substring(0, 66) + '...' : stream.title;
						let newArray: Stream = {
							id: stream.id,
							user_id: stream.user_id,
							game_name: stream.game_name,
							user_name: stream.user_name,
							title: newTitle,
							viewers: stream.viewer_count,
							thumbnail_url: stream.thumbnail_url
								.replace("{width}", "500")
								.replace("{height}", "300"),
						}
						return newArray;
					})
					setStreams(finalArray);
				})
				.catch(console.error);
		};
		fetchData();
	}, [displayedGameStreams?.id, search]);
	return (
		<View>
			<View style={styles.centeredview}>
				{displayedGameStreams ? <Text style={styles.title}>Top Streams Live for {displayedGameStreams.name}</Text> : <Text style={styles.title}>Top Streams Live</Text>}
				<TextInput
					onChangeText={setSearch}
					value={search}
					placeholder="Enter streamer name"
				/>
			</View>
			<Text>{'\n'}</Text>
			{streams.map((stream: Stream) => (
				<>
					<PreviewStream stream={stream} setDisplayedStream={props.setDisplayedStream} setDisplayedPage={props.setDisplayedPage} />
					<Text>{'\n'}</Text>
				</>
			))}
		</View>
	);
}