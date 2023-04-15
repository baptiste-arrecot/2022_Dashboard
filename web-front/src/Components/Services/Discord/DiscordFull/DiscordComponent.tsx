import NavigationComponent from './Layout/Navigation';
import ChannelListComponent from './Layout/ChannelList';
import ChatComponent from './Layout/Chat'; 

const onSelectGuild = (guild: any) => {
    console.log(guild);
}
export default function DiscordComponent() {

   
    return(
        <NavigationComponent>
            <ChannelListComponent />
            <ChatComponent />
        </NavigationComponent>
    )
}
