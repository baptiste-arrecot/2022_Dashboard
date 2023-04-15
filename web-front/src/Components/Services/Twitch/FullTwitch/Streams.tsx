import { useState, useEffect } from 'react';
import { Container, Card, CardImg, Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { UserOutlined } from '@ant-design/icons';
import { Game } from './Games';
import { getTopStreams } from '../../../../ApiRequest/apiDash';
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
		<Card className='card_cliquable' onClick={() => { openStream(props.stream.user_id) }}>
			<CardImg variant="top" src={props.stream.thumbnail_url} />
			<Card.Body>
				<Card.Title>{props.stream.title}</Card.Title>
				<Card.Text style={{ fontSize: '120%' }}>
					<div className='d-flex justify-content-between'>
						<div>{props.stream.user_name}</div>
						<div style={{ color: 'red' }}>
							<UserOutlined style={{ position: 'relative', bottom: '4px', right: '5px' }} />
							{props.stream.viewers}
						</div>
					</div>
				</Card.Text>
				<Card.Text>is playing {props.stream.game_name}</Card.Text>
			</Card.Body>
		</Card>
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
					console.log(dataArray);
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
		<div>
			{displayedGameStreams ? <h1 className='title'>Top Streams Live for {displayedGameStreams.name}</h1> : <h1 className='title'>Top Streams Live</h1>}
			<Container fluid>
				<InputGroup>
					<FormControl onChange={(e: any) => setSearch(e.target.value)} placeholder="Enter streamer name" aria-label="Search" aria-describedby="basic-addon2"/>
				</InputGroup>
				<br />
				<Row xs={2} sm={2} lg={3} xl={4} xxl={5} className="g-4">
					{streams.map((stream: Stream) => (
						<Col>
							<PreviewStream stream={stream} setDisplayedStream={props.setDisplayedStream} setDisplayedPage={props.setDisplayedPage} />
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
}