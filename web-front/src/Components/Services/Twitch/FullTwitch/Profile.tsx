import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, InputGroup, FormControl } from 'react-bootstrap';
import { getMyProfile, postDescription } from '../../../../ApiRequest/apiDash';
import { User } from './TwitchHome'
import { EyeOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';

export default function Profile(props: any) {
	const [user, setUser] = useState<User>();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [accessToken] = useState(props.accessToken);
	const [description, setDescription] = useState("");

	const setFetchedUser = (result: any) => {
		result = result.data[0];
		var myUser: User = {
			id: result.id,
			login: result.login,
			displayed_name: result.display_name,
			description: result.description,
			profile_pic_url: result.profile_image_url,
			offline_pic_url: result.offline_image_url,
			email: result.email,
			created_at: new Date(result.created_at).toDateString(),
			view_count: result.view_count
		}
		setUser(myUser);
	}

	useEffect(() => {
		getMyProfile(accessToken)
			.then(result => {
				setFetchedUser(result);
			})
			.catch(console.error);
	}, [accessToken]);

	const updateDescription = () => {
		setIsEditing(false);
		postDescription(accessToken, description)
			.then(response => {
				setFetchedUser(response);
			})
			.catch(console.error);
	}

	const handleInput = (e: any) => {
		setDescription(e.target.value);
	}

	const EditButton = () => (
		<Button className='edit-button' variant="dark" onClick={() => { setIsEditing(true) }}>
			<EditOutlined style={{ position: 'relative', bottom: '4px' }} />
		</Button>
	);

	const SaveButton = () => (
		<Button className='edit-button' variant="dark" onClick={updateDescription}>
			<SaveOutlined style={{ position: 'relative', bottom: '4px' }} />
		</Button>
	);

	return (
		<div>
			<h1 className='title'>My account</h1>
			<Container>
				<Row>
					<Col>
						<Card>
							<Card.Img src={user?.profile_pic_url} />
						</Card>
					</Col>
					<Col>
						<Card className='profile'>
							<Card.Body>
								<div style={{ position: 'fixed' }}>
									{isEditing === false ? <EditButton /> : <SaveButton />}
								</div>
								<Card.Title>{user?.displayed_name}</Card.Title>
								<br />
								{isEditing === false ?
									<Card.Text>
										{user?.description}
									</Card.Text>
									: <InputGroup>
										<FormControl onChange={handleInput} placeholder="Enter description" as="textarea" aria-label="With textarea" />
									</InputGroup>
								}
								<br />
								<Card.Text>
									login : {user?.login}
								</Card.Text>
								<Card.Text>
									user id : {user?.id}
								</Card.Text>
								<Card.Text>
									email : {user?.email}
								</Card.Text>
								<Card.Text>
									account created the {user?.created_at}
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