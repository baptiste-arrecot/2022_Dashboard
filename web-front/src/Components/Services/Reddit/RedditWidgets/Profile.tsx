import { useState, useEffect, useContext } from 'react';
import { Container, Card, CardImg } from 'react-bootstrap';
import './searchbar.css';
import './Reddit.css';
import axios from 'axios';
import { RedditContext } from '../Context/RedditContext';


type RedditProfile = {
	name: string;
	description: string;
	PPurl: string;
	karma: number;
}

export default function Profile(props: any) {
	const [profile, setProfile] = useState<RedditProfile>();
	const { accessToken } = useContext(RedditContext);

	useEffect(() => {
		const fetchData = async () => {
			const result = await axios.get('http://api.drainboard.tk/services/reddit/Profile?accessToken=' + accessToken);
			setProfile({
				name: result?.data.name,
				description: result?.data.subreddit.public_description,
				PPurl: result?.data.icon_img.split("?")[0],
				karma: result?.data.total_karma
			})
		};
		fetchData();
	}, [accessToken]);
	return (
		<div>
			<h1 className='title title-color'> Reddit Account </h1>
			<Container fluid>
					<Card className="card-account mx-auto">
						<CardImg variant="top" src={profile?.PPurl} />
						<Card.Body>
							<Card.Title>u/{profile?.name}</Card.Title>
							<Card.Text style={{ fontSize: '120%' }}>
								<div className='d-flex card-text'>
									<div>DESCRIPTION: {profile?.description}</div>
								</div>
							</Card.Text>
							<Card.Text>Karma: {profile?.karma}</Card.Text>
						</Card.Body>
					</Card>
			</Container>
		</div>
	);
}