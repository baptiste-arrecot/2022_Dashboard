import axios from "axios";

const api_base = "http://api.drainboard.tk"

export const request = async (user, { method, url, params, data }) => {
  return new Promise((resolve, reject) => {
    axios.request({
      headers: {
        'Content-Type': 'application/json',
        ...(user !== null ? { Authorization: 'bearer' + user.jwt } : {}),
      },
      method: method,
      url: api_base + url,
      params,
      data
    }).then(response => {
      resolve(response.data)
    }).catch(err => reject(err));
  })
}

export const postLogin = (username, password) => (
  request(null, {
    method: 'POST',
    url: '/auth/login',
    data: {
      username: username,
      isGoogleAuth: false,
      email: '',
      password: password
    }
  })
);

export const postRegister = (username, password) => (
  request(null, {
    method: 'POST',
    url: '/auth/register',
    data: {
      username: username,
      isGoogleAuth: false,
      email: '',
      password: password
    }
  })
);

export const getTopStreams = (game_id, search) => (
  request(null, {
    method: 'GET',
    url: '/services/Twitch/topstreams/' + game_id + '/' + search,
  })
);

export const getStream = (user_id) => (
  request(null, {
    method: 'GET',
    url: '/services/Twitch/stream/' + user_id,
  })
);

export const getTopGames = () => (
  request(null, {
    method: 'GET',
    url: '/services/Twitch/topgames/',
  })
);

export const getUser = (user_id) => (
  request(null, {
    method: 'GET',
    url: '/services/Twitch/user/' + user_id,
  })
);

export const getFollowedUsers = (user_id) => (
  request(null, {
    method: 'GET',
    url: '/services/Twitch/followedusers/' + user_id,
  })
);

export const getMyProfile = (access_token) => (
  request(null, {
    method: 'GET',
    url: '/services/Twitch/myprofile/' + access_token,
  })
);

export const getFollowedStreams = (access_token, user_id) => (
  request(null, {
    method: 'GET',
    url: '/services/Twitch/followedstreams/' + access_token + '/' + user_id,
  })
);

export const postDescription = (access_token, new_description) => (
  request(null, {
    method: 'POST',
    url: '/services/Twitch/update_description/' + access_token,
    data: {
      new_description: new_description,
    }
  })
);
