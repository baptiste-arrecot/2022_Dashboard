import { useState, useEffect } from 'react';
import { Container, Card, CardImg, Row, Col } from 'react-bootstrap';
import { getTopGames } from '../../../../ApiRequest/apiDash';

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
		<div>
			<h1 className='title'>Top Games Live</h1>
			<Container fluid>
				<Row xs={2} sm={2} lg={3} xl={4} xxl={5} className="g-4">
					{games.map((game: any) => (
						<Col>
							<Card className='card_cliquable' onClick={() => clickGame(game)}>
								<CardImg variant="top" src={game.box_art_url} />
								<Card.Body>
									<Card.Title>{game.name}</Card.Title>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
}