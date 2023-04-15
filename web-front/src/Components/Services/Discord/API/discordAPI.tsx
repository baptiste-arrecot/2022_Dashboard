const BASE_URL = 'http://api.drainboard.tk';

const request = (path: string, discordToken: string, method: string = 'GET') => {
    return fetch(BASE_URL + path, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'discord_token': discordToken
        },
    }).then(response => {
        if (response.status >= 400) throw new Error(response.statusText);
        return response.json();
    });
};


export const getProfileInfo = async (discordToken: string) => {
    return await request('/services/discord/me/profile', discordToken);
}

export const getGuilds = async (discordToken: string) => {
    return await request('/services/discord/me/guilds', discordToken);
}

export const getChannels = async (guildId: string, discordToken: string) => {
    return await request('/services/discord/guilds/' + guildId + '/channels', discordToken);
}

export const getDM = async (discordToken: string) => {
    return await request('/services/discord/me/dm', discordToken);
}
