import { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getUser, getStream } from '../../../../ApiRequest/apiDash';
import { User } from './TwitchHome'
import { Stream } from './Streams';
import { UserOutlined, EyeOutlined } from '@ant-design/icons';

export default function UserPage(props: any) {
	const [user, setUser] = useState<User>();
	const [stream, setStream] = useState<Stream>();

	useEffect(() => {
		getUser(props.user_id)
			.then(response => {
				response = response.data[0];
				var fetchedUser: User = {
					id: response.id,
					login: response.login,
					displayed_name: response.display_name,
					description: response.description,
					profile_pic_url: response.profile_image_url,
					offline_pic_url: response.offline_image_url,
					email: "",
					created_at: response.created_at,
					view_count: response.view_count
				};
				setUser(fetchedUser);
			})
			.catch(console.error)
		getStream(props.user_id)
			.then(result => {
				let streamdata = result.data[0];
				if (streamdata === undefined)
					return;
				var finaldata: any = {
					id: streamdata.id,
					user_id: streamdata.user_id,
					game_name: streamdata.game_name,
					user_name: streamdata.user_name,
					title: streamdata.title.substring(0, 79),
					viewers: streamdata.viewer_count,
					thumbnail_url: streamdata.thumbnail_url
						.replace("{width}", "500")
						.replace("{height}", "300"),
				};
				setStream(finaldata);
			})
			.catch(console.error)
	}, [props.user_id]);

	const openStream = (user_id: string) => {
		props.setDisplayedStream(user_id);
		props.setDisplayedPage("stream");
	}

	return (
		<div>
			<Container>
				<Row>
					<Col>
						<Card>
							<Card.Img src={user?.profile_pic_url} />
						</Card>
					</Col>
					<Col>
						{user?.offline_pic_url !== "" && stream === undefined ?
							<Card className='offline-img'>
								<Card.Img src={user?.offline_pic_url} />
							</Card> : <></>}
						{stream !== undefined ?
							<Card className='card_cliquable' onClick={() => {openStream(user?.id ?? "")}}>
								<Card.Img src={stream?.thumbnail_url} />
								<div style={{ color: 'red' }}>
									Live right now !     .
									<UserOutlined style={{ position: 'relative', bottom: '4px', right: '5px' }} />
									{stream?.viewers}
								</div>
							</Card> : <></>}
						<br />
						<br />
						<Card className='desc'>
							<h1>{user?.displayed_name}</h1>
							<Card.Body>
								<Card.Text style={{fontSize: 22}}>
									{user?.description}
								</Card.Text>
								<div style={{ color: 'red' }}>
									<EyeOutlined style={{ position: 'relative', bottom: '4px', right: '5px' }} />
									{user?.view_count}
								</div>
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</div>
	)
}