import { useState, useEffect, useContext } from 'react';
import { Text, Modal, View, TextInput } from 'react-native';
import { Card, Button } from 'react-native-elements';
import axios from 'axios';
import { RedditContext } from '../Context/RedditContext';


type RedditPost = {
	id: string;
	name: string;
	description: string;
	url: string;
	image: string;
	user: string,
	videourl: string
}

export default function SubRedditSearcher(props: any) {
	const [search, setSearch] = useState<string>('gigachad');
	const [Posts, setPosts] = useState<RedditPost[]>([]);
	const [vote, setVote] = useState<number>(0);
	const [id, setID] = useState<string>('');
	const [filter, setFilter] = useState<string>('new');

	useEffect(() => {
		const changeVote = async () => {
			axios.request({
					method: 'post',
					url : 'http://api.drainboard.tk/services/reddit/vote',
					params: {
						accessToken: props.accessToken,
						postID: id,
						dir: vote
					}
				}
			).then((res) => {
				// console.log(res); <= debug log
			})
		}
		changeVote();
	}, [vote, id, props.accessToken]);

	useEffect(() => {
		const fetchData = async () => {
			if (search !== '') {
				const result = await axios.get('http://api.drainboard.tk/services/reddit/searchSubreddit?search=' + search + '&filter=' + filter);
				if (result.status !== 200) {
				} else {
					let dataArray = result.data?.data?.children;
					let finalArray = dataArray.map((post: any) => {
						let newArray: RedditPost = {
							id: post?.data?.id,
							name: post.data.title,
							description: post?.data.selftext,
							url: post?.data.permalink,
							image: post?.data?.url,
							user: post?.data?.author,
							videourl: post?.data?.videoURL
						}
						return newArray;
					});
					setPosts(finalArray);
				}
			}
		};
		fetchData();
	}, [search, filter]);
	const changeSearch = (text: string) => {
		setSearch(text);
	};
	return (
		<>
			{(search === '') ? <Text> Subreddit </Text> : <Text>Subreddit : {search}</Text>}
			<TextInput placeholder="Search for cards..." onChangeText={changeSearch} value={search} />
			<Button onPress={() => { setFilter('hot'); }}>Hot</Button>
			<Button onPress={() => { setFilter('new'); }}>New</Button>
			<Button onPress={() => { setFilter('top'); }}>Top</Button>
			<Button onPress={() => { setFilter('rising'); }}>Rising</Button>
			<Text>{'\n'}</Text>
			<Text>{'\n'}</Text>
			<Text>{'\n'}</Text>
			<View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
				{Posts.map((Post: RedditPost) => (
					<View style={{ flex: 2, flexDirection: 'column' }}>
						<Card>
							{(Post.image.includes('https://i')) ? <Card.Image source={{ uri: Post?.image }} /> : null}
							<Card.Divider>
								<Card.Title>{Post?.name}</Card.Title>
								<Text>
									{Post?.description}
								</Text>
								<Text>u/{Post?.user}</Text>
								<Button onPress={() => { setVote(1); setID(Post?.id); }}>Upvote</Button>
								<Button onPress={() => { setVote(-1); setID(Post?.id); }}>Downvote</Button>
							</Card.Divider>
						</Card>
						<Text>{'\n'}</Text>
					</View>
				))}
			</View>
		</>
	);
}