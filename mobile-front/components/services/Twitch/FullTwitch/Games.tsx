import { useState, useEffect } from 'react';
import { getTopGames } from '../../../../apiRequest/apiDash';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './FullTwitch';

export type Game = {
	id: string;
	name: string;
	box_art_url: string;
}

export default function Games(props: any) {
	const [games, setGames] = useState<Game[]>([]);

	const clickGame = (game: Game) => {
		props.setDisplayedGameStreams(game);
		props.setDisplayedPage("streams");
	};

	useEffect(() => {
		const fetchData = async () => {
			getTopGames()
				.then(result => {
					let dataArray = result.data;
					let finalArray = dataArray.map((game: any) => {
						let newURL = game.box_art_url
							.replace("{width}", "300")
							.replace("{height}", "300");
						game.box_art_url = newURL;
						return game;
					});
					setGames(finalArray);
				})
				.catch(console.error);
		};
		fetchData();
	}, []);
	return (
		<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
			<Text style={styles.title}>Top Games Live</Text>
			<Text>{'\n'}</Text>
			{games.map((game: any) => (
				<TouchableOpacity onPress={() => clickGame(game)}>
					<Text>{game.name}</Text>
					<Image
						style={{
							width: 300,
							height: 300
						}}
						source={{
							uri: game.box_art_url,
						}}
					/>
					<Text>{'\n'}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}