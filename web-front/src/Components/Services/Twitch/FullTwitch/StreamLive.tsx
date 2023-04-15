import { Container, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getStream } from "../../../../ApiRequest/apiDash";
import { Stream } from "./Streams";

export default function StreamLive(props: any) {
	const [stream, setStream] = useState<Stream>();

	useEffect(() => {
		getStream(props.channel_id)
			.then(result => {
				let streamdata = result.data[0];
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
	}, [props.channel_id]);

	const openUserPage = () => {
		props.setDisplayedUser(stream?.user_id);
		props.setDisplayedPage("user");
	}

	return (
		<Container className="d-flex justify-content-between">
			<Row>
				<Col sm={8}>
					{stream && <StreamRender channel={stream?.user_name ?? ""} />}
				</Col>
				<Col sm={4}>
					<div className="users-list" style={{ position: 'relative', right: '50px' }}>
						<h1 onClick={openUserPage} style={{ color: 'white' }}>{stream?.user_name}</h1>
					</div>
					<h4 className="title">{stream?.title}</h4>
				</Col>
			</Row>
		</Container>
	);
}

function StreamRender(props: any) {
	return (
		<div>
			{/*
			// @ts-ignore */}
			<twitch-stream width="100%" channel={props.channel} playing></twitch-stream>
		</div>
	);
}