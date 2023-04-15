import { useState, useEffect, useContext } from 'react';
import { Text, Modal, View, TextInput } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { HeartOutlined, DollarCircleOutlined, FireOutlined } from '@ant-design/icons';
import { WebView } from 'react-native-webview';
import { BnetContext } from '../Context/BnetContext';
import axios from 'axios';

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
				const result = await axios.get('http://api.drainboard.tk/services/bnet/searchCards?search=' + search + '&accessToken=' + props.accessToken);
				let dataArray = result.data;
				let finalArray = dataArray.map((card: any) => {
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
	}, [search]);
	const changeSearch = (text: string) => {
		setSearch(text);
	};
	return (
		<>
			{(search === '') ? <Text> Cards Suggestions </Text> : <Text> Search Results </Text>}
			<TextInput placeholder="Search for cards..." onChangeText={changeSearch} value={search} />
			<Modal visible={show}>
				<>
					{(gold === true && displayedCard?.imageGold != '') ? <img src={displayedCard?.imageGold} /> : <img src={displayedCard?.imageCard} />}
					<Text>{displayedCard?.name}</Text>
					<Text>ATK: {displayedCard?.atk}</Text>
					<Text>Health: {displayedCard?.life}</Text>
					<Text>Mana Cost: {displayedCard?.mana_cost}</Text>
					{(displayedCard?.description !== undefined) ? <WebView originWhitelist={['*']} source={{ html: displayedCard.description }} /> : null}
					{(displayedCard?.flavorText !== undefined) ? <WebView originWhitelist={['*']} source={{ html: displayedCard.flavorText }} /> : null}
					<Button onPress={() => { setGold(!gold) }}>Gold Version</Button>
					<Button onPress={() => { setShow(false) }}>Close Modal</Button>
				</>
			</Modal>
			<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
				{cards.map((card: HearthStoneCard) => (
					<View style={{ flex: 2, flexDirection: 'column' }}>
						<Card>
							<Card.Image onPress={() => { openCardInfo(card) }} source={{ uri: card?.image }} />
							<Card.Divider>
								<Card.Title>{card?.name}</Card.Title>
								<View>
									<FireOutlined style={{ position: 'relative', bottom: '4px', right: '5px' }} />
									{card?.atk}
									<HeartOutlined style={{ position: 'relative', bottom: '4px', right: '5px' }} />
									{card?.life}
									<DollarCircleOutlined style={{ position: 'relative', bottom: '4px', right: '5px' }} />
									{card?.mana_cost}
								</View>
								<Text>{card?.flavorText}</Text>
							</Card.Divider>
						</Card>
					</View>
				))}
			</View>
		</>
	);
}