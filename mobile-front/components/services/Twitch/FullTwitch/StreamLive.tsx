import { useEffect, useState } from "react";
import { getStream } from "../../../../apiRequest/apiDash";
import { Stream } from "./Streams";
import { View, Text } from 'react-native';
import { styles } from "./FullTwitch";

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
		<View>
			{stream && <StreamRender channel={stream?.user_name ?? ""} />}
			<Text onPress={openUserPage}>
				{stream?.user_name}
			</Text>
			<Text style={styles.title}>{stream?.title}</Text>
		</View>
	);
}

function StreamRender(props: any) {
	return (
		<>
			{/*
			// @ts-ignore */}
			{/* <twitch-stream width="100%" channel={props.channel} playing></twitch-stream> */}
		</>
	);
}