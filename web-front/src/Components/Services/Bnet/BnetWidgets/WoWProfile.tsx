import { useState, useEffect, useContext } from 'react';
import { Container, Card, Row, Col } from 'react-bootstrap';
import { ManOutlined, WomanOutlined  } from '@ant-design/icons';
import './Bnet.css';
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
	const { accessToken } = useContext(BnetContext);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get('http://api.drainboard.tk/services/bnet/wowprofile?accessToken=' + accessToken);
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
	}, [accessToken]);
	return (
		<div>
			<h1 className='title'>ACCOUNT: {accountID}</h1>
			<Container fluid>
				<Card>
					<Row xs={2} sm={2} lg={3} xl={4} xxl={5} className="g-4">
					{Characters.map((character: Character) => (
						<Col>
							<Card>
								<Card.Body>
									<Card.Title>
										{(character?.gender !== false) ? <ManOutlined /> : <WomanOutlined />}{character?.name}
										</Card.Title>
									<Card.Text style={{ fontSize: '120%' }}>
										<div className='d-flex flex-column justify-content-between'>
											<div style={{ color: 'blue' }}>
												Class: {character?.class}
											</div>
											<div style={{ color: 'green' }}>
												Race: {character?.race}
											</div>
											<div style={{ color: 'yellow' }}>
												Server: {character?.server}
											</div>
											<div style={{ color: 'red' }}>
												Faction: {character?.faction}
											</div>
										</div>
									</Card.Text>
									<Card.Text>Level: {character?.level}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>

				</Card>
			</Container>
		</div>
	);
}