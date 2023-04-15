import { useState, useEffect, useContext } from 'react';
import { Text, Modal, View } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';
import { BnetContext } from '../Context/BnetContext';

export type Player = {
	id: string,
	name: string,
	points: number,
	wins: number,
	losses : number,
	mmr : number
}

export default function Ladder(props: any) {
	const [players, setPlayers] = useState<Player[]>([]);
	const [ladderplayer, setLadderPlayer] = useState<Player>();
	const [show, setShow] = useState<boolean>(false);


	const openPlayerInfo = (player: Player) => {
		setShow(true);
		setLadderPlayer({
			id: player.id,
			name: player.name,
			points: player.points,
			wins: player.wins,
			losses : player.losses,
			mmr : player.mmr
		})
		
	};

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get('http://api.drainboard.tk/services/bnet/SC2Ladder?accessToken=' + props.accessToken);
			let dataArray = result.data.ladderTeams;
			let finalArray = dataArray.map((player:any) => {
				let newPlayer: Player = {
					id : player.teamMembers[0].id,
					name: player.teamMembers[0].displayName,
					points: player.points,
					wins: player.wins,
					losses: player.losses,
					mmr: player.mmr
				}
				return newPlayer;
			});
			setPlayers(finalArray);
		};
		fetchData();
	}, []);
	return (
		<>
			<Text>Top Ladder</Text>
			<Modal visible={show}>
        			<>
						<Text>{ladderplayer?.name}</Text>
						<Text>Points: {ladderplayer?.points}</Text>
						<Text>Wins: {ladderplayer?.wins}</Text>
						<Text>Losses: {ladderplayer?.losses}</Text>
						<Text>MMR: {ladderplayer?.mmr}</Text>
					  	<Button onPress={() => {setShow(false)}}>Close Modal</Button>
					</>
      		</Modal>
			<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',  flexDirection: 'column'}}>
					{players.map((card: Player, key : number) => (
					<View style={{flex:2, flexDirection: 'column'}}>
						<Card>
							<Card.Image onPress={() => { openPlayerInfo(card)}} source={{uri : 'https://cdn0.iconfinder.com/data/icons/essentials-solid-glyphs-vol-1/100/User-Account-512.png'}}/>
							<Card.Divider>
								<Card.Title>#{key + 1} {card?.name}</Card.Title>
							</Card.Divider>
						</Card>
					</View>
				))}
			</View>
		</>
	);
}