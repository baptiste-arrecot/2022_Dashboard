export default {
	mytables: [
		{
			_id: '56d9bf92f9be48771d6fe5b1',
			fullName: 'admin',
			username: 'admin',
			email: 'admin@admin.com',
			password: '$2b$10$GHBuGSq86M4dR4uDqlNF8uY/4MHL7hFFUGWwwx/mxIDHq2Xi.cA5W',
			date: '2021-12-02T19:11:24.526+00:00',
			services: []
		},
		{
			_id: '61aaab23f01fdcc6613f6cf7',
			fullName: 'user1',
			username: 'user1',
			email: 'user1@user1.com',
			password: '$2b$10$GHBuGSq86M4dR4uDqlNF8uY/4MHL7hFFUGWwwx/mxIDHq2Xi.cA5W',
			date: '2021-12-02T19:11:24.526+00:00',
			services: [
				{
					name: 'RiotGame',
					logoUrl: '...',
					widgets: [
						{
							name: 'likedMusic',
							fullName: 'Liked music',
							refreshTime: 10,
							parameters: [],
						},
						{
							name: 'recommendedPlaylist',
							fullName: 'Recommended playlist',
							refreshTime: 10,
							parameters: [],
						},
						{
							name: 'musicPlayer',
							fullName: 'Music player',
							refreshTime: 10,
							parameters: [],
						}
					],
				},
				{
					name: 'Steam',
					logoUrl: '...',
					widgets: [
						{
							name: 'likedVideos',
							fullName: 'Liked videos',
							refreshTime: 10,
							parameters: [],
						},
						{
							name: 'videoPlayer',
							fullName: 'Video player',
							refreshTime: 10,
							parameters: [],
						}
					],
				},
				{
					name: 'Twitch',
					logoUrl: '...',
					widgets: [],
				},
			]
		},
		{
			_id: '61aa9d764e19c70a42cda865',
			fullName: 'user2',
			username: 'user2',
			email: 'user2@user2.com',
			password: '$2b$10$GHBuGSq86M4dR4uDqlNF8uY/4MHL7hFFUGWwwx/mxIDHq2Xi.cA5W',
			date: '2021-12-02T19:11:24.526+00:00',
			services: [
				{
					name: 'RiotGame',
					logoUrl: '...',
					widgets: [
						{
							name: 'likedMusic',
							fullName: 'Liked music',
							refreshTime: 10,
							parameters: [],
						}],
				},
				{
					name: 'Steam',
					logoUrl: '...',
					widgets: [
						{
							name: 'likedVideos',
							fullName: 'Liked videos',
							refreshTime: 10,
							parameters: [],
						},
						{
							name: 'videoPlayer',
							fullName: 'Video player',
							refreshTime: 10,
							parameters: [],
						}
					],
				},
				{
					name: 'Discord',
					logoUrl: '...',
					widgets: [],
				},
			]
		},
	]
};