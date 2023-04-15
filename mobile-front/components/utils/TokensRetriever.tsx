type Tokens =
{
    type: string | null;
    accessToken : string | null;
    refreshToken : string | null;
};

export const TokensRetriever = async (url: string) => {
    const params = new URLSearchParams(url);
    let tokens : Tokens = {
        type: '',
        accessToken: '',
        refreshToken: ''
    };
    if (params.get('type') !== undefined) {
        tokens.type = params.get('type');
        if (params.get("accessToken")) {
            tokens.accessToken = params.get("accessToken");
            if (tokens.accessToken !== null) {
                localStorage.setItem(tokens.type + 'accessToken', tokens.accessToken);
            }
        }
        if (params.get("refreshToken") !== null) {
            tokens.refreshToken = params.get("RefreshToken");
            if (tokens.refreshToken !== null)
                localStorage.setItem(tokens.type + "refreshToken", tokens.refreshToken);
        }
    }
}