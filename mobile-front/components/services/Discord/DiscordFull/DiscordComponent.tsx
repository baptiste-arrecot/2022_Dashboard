import GuildListComponent from './Layout/GuildList';

const onSelectGuild = (guild: any) => {
    console.log(guild);
}
export default function DiscordComponent() {
    return(
        <GuildListComponent />
    )
}
