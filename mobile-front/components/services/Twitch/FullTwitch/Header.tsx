import { View, Text } from 'react-native';

export default function Header(props: any) {

	const changePage = (page: string) => {
		if (page === "streams") {
			props.setDisplayedGameStreams("");
		}
		props.setDisplayedPage(page);
	};

	return (
		<>
			<View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'aquamarine' }}>
				<Text>{'\n'}</Text>
				<Text onPress={() => changePage("home")}>Home</Text>
				<Text onPress={() => changePage("games")}>Games</Text>
				<Text onPress={() => changePage("streams")}>Streams</Text>
				<Text onPress={() => changePage("profile")}>My account</Text>
				<Text>{'\n'}</Text>
			</View>
			<Text>{'\n'}</Text>
		</>
	);
}