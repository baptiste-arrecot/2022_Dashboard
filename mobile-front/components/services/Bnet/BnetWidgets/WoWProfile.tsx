import { useState, useEffect, useContext } from 'react';
import { Text, Modal, View } from 'react-native';
import { Card, SearchBar, Button } from 'react-native-elements';
import { HeartOutlined, DollarCircleOutlined, FireOutlined } from '@ant-design/icons';
import { ManOutlined, WomanOutlined  } from '@ant-design/icons';
import axios from 'axios';
import { BnetContext } from '../Context/BnetContext';

export type Character = {
	id: string,
	name: string,
	level: number,
	gender: boolean,
	class: string,
	race: string,
	faction: string,
	server: string
}

export default function WoWProfile(props: any) {
	const [Characters, setCharacters] = useState<Character[]>([]);
	const [accountID, setAccountID] = useState<string>('');

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get('http://api.drainboard.tk/services/bnet/wowprofile?accessToken=' + props.accessToken);
			let dataArray = result.data.wow_accounts[0].characters;
			setAccountID(result.data.wow_accounts[0].id);
			let finalArray = dataArray.map((character:any) => {
				let newCharacter: Character = {
					id : character.id,
					name: character.name,
					level: character.level,
					gender: character.gender.type,
					class: character.playable_class.name,
					race: character.playable_race.name,
					faction: character.faction.type,
					server: character.realm.name
				}
				return newCharacter;
			});
			setCharacters(finalArray);
		};
		fetchData();
	}, []);
	return (
		<>
			<Text>ACCOUNT: {accountID}</Text>
			<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
				{Characters.map((character: Character) => (
					<View style={{flex:1, flexDirection: 'column'}}>
						<Card>
							<Card.Divider>
								<Card.Title>{character?.name}</Card.Title>
								<Text>
									Class: {character?.class}
									Race: {character?.race}
									Server: {character?.server}
									Faction: {character?.faction}
								</Text>
								<Text>Level: {character?.level}</Text>
							</Card.Divider>
						</Card>
					</View>
				))}
			</View>
		</>
	);
}