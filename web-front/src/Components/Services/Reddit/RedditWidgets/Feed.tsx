import { useState, useEffect, useContext } from 'react';
import { Button, Container, Card, CardImg, Col } from 'react-bootstrap';
import './searchbar.css';
import './Reddit.css';
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
	const { accessToken } = useContext(RedditContext);

	useEffect(() => {
		const changeVote = async () => {
			axios.request({
					method: 'post',
					url : 'http://api.drainboard.tk/services/reddit/vote',
					params: {
						accessToken: accessToken,
						postID: id,
						dir: vote
					}
				}
			).then((res) => {
				// console.log(res); <= debug log
			})
		}
		changeVote();
	}, [vote, id, accessToken]);

	useEffect(() => {
		const fetchData = async () => {
			if (search !== '') {
				const result = await axios.get('http://api.drainboard.tk/services/reddit/searchSubreddit?search=' + search + '&filter=' + filter);
				if (result.status !== 200) {
				} else {
					let dataArray = result.data?.data?.children;
					let finalArray = dataArray.map((post : any) => {
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


	return (
		<div>
			{(search === '') ? <h1 className='title title-color'> Subreddit </h1> : <h1 className='title title-color'>Subreddit : {search}</h1>}
			<Container fluid>
				<div className="container">
					<input type="text" placeholder="Search for posts..." onChange={(e :any) => {setSearch(e.target.value)}} value={search}/>
    				<div className="search"></div>
  				</div>
				<Button onClick={() => {setFilter('hot');}}>Hot</Button>
				<Button onClick={() => {setFilter('new');}}>New</Button>
				<Button onClick={() => {setFilter('top');}}>Top</Button>
				<Button onClick={() => {setFilter('rising');}}>Rising</Button>
				<br />
				<br />
				<br />
				<Col xs={2} sm={4} lg={6} xl={6} xxl={6} className="g-4 mx-auto">
					{Posts.map((Post: RedditPost) => (
						<div>
							<Card>
								{(Post.image.includes('https://i'))? <CardImg variant="top" src={Post?.image}/> :  null}
								<Card.Body>
									<Card.Title>{Post?.name}</Card.Title>
									<Card.Text style={{ fontSize: '120%' }}>
										<div className='d-flex justify-content-between'>
											<div>{Post?.description}</div>
										</div>
									</Card.Text>
									<Card.Text>u/{Post?.user}</Card.Text>
									<Card.Text><a href={'https://new.reddit.com/' + Post?.url}>https://new.reddit.com{Post?.url}</a></Card.Text>
									<Button onClick={() => {setVote(1); setID(Post?.id);}}>Upvote</Button>
									<Button onClick={() => {setVote(-1);setID(Post?.id);}}>Downvote</Button>
								</Card.Body>
							</Card>
							<br />
						</div>
					))}
				</Col>
			</Container>
		</div>
	);
}