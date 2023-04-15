import { useState, useEffect, useContext } from 'react';
import { Modal, Button, Container, Card, CardImg, Col } from 'react-bootstrap';
import BnetLogo from '../../../../Assets/icons/icon-bnet.png';
import './Bnet.css';
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
	const { accessToken } = useContext(BnetContext);


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
			const result = await axios.get('http://api.drainboard.tk/services/bnet/SC2Ladder?accessToken=' + accessToken);
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
	}, [accessToken]);
	return (
		<div>
			<h1 className='title title-color'>Top Ladder</h1>
			
			<Container fluid>
			<Modal show={show}>
        			<Modal.Header>
          				<Modal.Title>Player Info</Modal.Title>
        			</Modal.Header>
        			<Modal.Body>
        				<div>
							<h1>{ladderplayer?.name}</h1>
							<h2>Wins: {ladderplayer?.wins}</h2>
							<h2>Losses: {ladderplayer?.losses}</h2>
							<h2>Points: {ladderplayer?.points}</h2>
							<h2>MMR: {ladderplayer?.mmr}</h2>
						</div>
        			</Modal.Body>
    				<Modal.Footer>
						  	<Button variant="secondary" onClick={() => {setShow(false)}}>Close Modal</Button>
    				</Modal.Footer>
      			</Modal>
				<Col xs={2} sm={2} lg={3} xl={4} xxl={5} className="g-4 mx-auto">
					{players.map((player: Player, index: number) => (
						<Col>
							<Card onClick={() => openPlayerInfo(player)}>
								<CardImg variant="top" src={BnetLogo} />
								<Card.Body>
									<Card.Title>#{index + 1} {player.name}</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Col>
			</Container>
		</div>
	);
}