import { useState, useEffect, useContext } from 'react';
import { Modal, Button, Container, Card, CardImg, Row, Col } from 'react-bootstrap';
import { HeartOutlined, DollarCircleOutlined, FireOutlined } from '@ant-design/icons';
import './searchbar.css';
import './Bnet.css';
import axios from 'axios';
import { BnetContext } from '../Context/BnetContext';


type HearthStoneCard = {
	id: string;
	name: string;
	flavorText: string;
	description: string;
	life: number;
	atk: number;
	mana_cost: number;
	image: string;
	imageCard: string;
	imageGold: string;
	
}

export default function CardViewer(props: any) {
	const [displayedCard, setdisplayedCard] = useState<HearthStoneCard>();
	const [search, setSearch] = useState<string>('');
	const [cards, setCards] = useState<HearthStoneCard[]>([]);
	const [show, setShow] = useState<boolean>(false);
	const [gold, setGold] = useState<boolean>(false);
	const { accessToken } = useContext(BnetContext);


	const openCardInfo = (card: HearthStoneCard) => {
		setShow(true);
		setdisplayedCard({
			id: card.id,
			name: card.name,
			flavorText: card?.flavorText,
			description: card?.description,
			atk: card?.atk,
			life: card?.life,
			mana_cost: card?.mana_cost,
			image: card?.image,
			imageCard: card?.imageCard
			.replace("{width}", "500")
			.replace("{height}", "300"),
			imageGold: card?.imageGold
			.replace("{width}", "500")
			.replace("{height}", "300"),
		});
	}

	useEffect(() => {
		const fetchData = async () => {
			if (search !== '') {
				const result = await axios.get('http://api.drainboard.tk/services/bnet/searchCards?search=' + search + '&accessToken=' + accessToken);
				let dataArray = result.data;
				let finalArray = dataArray.map((card : any) => {
				let newTitle = card?.name.length > 66 ? card?.name.substring(0, 66) + '...' : card?.name;
				let newArray: HearthStoneCard = {
					id: card?.id,
					name: newTitle,
					flavorText: card?.flavorText,
					description: card?.text,
					atk: card?.attack,
					life: card?.health,
					mana_cost: card?.manaCost,
					image: card?.cropImage,
					imageCard: card?.image
					.replace("{width}", "500")
					.replace("{height}", "300"),
					imageGold: card?.imageGold
					.replace("{width}", "500")
					.replace("{height}", "300"),
				}
				return newArray;
				});
				setCards(finalArray);
			}
		};
		fetchData();
	}, [search, accessToken]);
	return (
		<div>
			{(search === '') ? <h1 className='title title-color'> Cards Suggestions </h1> : <h1 className='title title-color'>Search Results</h1>}
			<Container fluid>
				<div className="container">
					<input type="text" placeholder="Search for cards..." onChange={(e :any) => {setSearch(e.target.value)}} value={search}/>
    				<div className="search"></div>
  				</div>
				<Modal show={show}>
        			<Modal.Header>
          				<Modal.Title>Card Info</Modal.Title>
        			</Modal.Header>
        			<Modal.Body>
        				<div>
							{(gold === true && displayedCard?.imageGold !== '')? <img alt='goldcard' src={displayedCard?.imageGold}/> : <img alt='card' src={displayedCard?.imageCard}/>}
							<h1>{displayedCard?.name}</h1>
							<h2>ATK: {displayedCard?.atk}</h2>
							<h2>Health: {displayedCard?.life}</h2>
							<h2>Mana Cost: {displayedCard?.mana_cost}</h2>
							{(displayedCard?.description !== undefined) ? <h2 dangerouslySetInnerHTML={{__html:displayedCard.description}}></h2> : null}
							{(displayedCard?.flavorText !== undefined) ? <h2 dangerouslySetInnerHTML={{__html:displayedCard.flavorText}}></h2> : null}
						</div>
        			</Modal.Body>
    				<Modal.Footer>
							<Button variant="primary" onClick={() => {setGold(!gold)}}>Gold Version</Button>
						  	<Button variant="secondary" onClick={() => {setShow(false)}}>Close Modal</Button>
    				</Modal.Footer>
      			</Modal>
				<Row xs={2} sm={2} lg={3} xl={4} xxl={5} className="g-4">
					{cards.map((card: HearthStoneCard) => (
						<Col>
							<Card onClick={() => { openCardInfo(card)}}>
								<CardImg variant="top" src={card?.image} />
								<Card.Body>
									<Card.Title>{card?.name}</Card.Title>
									<Card.Text style={{ fontSize: '120%' }}>
										<div className='d-flex justify-content-between'>
											<div>{card?.name}</div>
											<div style={{ color: 'red' }}>
												<FireOutlined style={{ position: 'relative', bottom: '4px', right: '5px' }} />
												{card?.atk}
											</div>
											<div style={{ color: 'green' }}>
												<HeartOutlined style={{ position: 'relative', bottom: '4px', right: '5px' }} />
												{card?.life}
											</div>
											<div style={{ color: 'blue' }}>
												<DollarCircleOutlined style={{ position: 'relative', bottom: '4px', right: '5px' }} />
												{card?.mana_cost}
											</div>
										</div>
									</Card.Text>
									<Card.Text>{card?.flavorText}</Card.Text>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			</Container>
		</div>
	);
}