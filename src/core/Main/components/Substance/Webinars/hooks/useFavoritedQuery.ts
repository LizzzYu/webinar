import { getAuthToken } from '../../../../../utils/getAuthToken';

/* eslint-disable @typescript-eslint/no-explicit-any */
const url = 'https://api.finlogix.com';

export default function useFavoritedQuery(): Promise<any> | undefined {
	const token = getAuthToken();

	if (token === '') {
		alert('please log in first');
    return;
	}

	return fetch(`${url}/v1/posts?favourited=1&author=userId`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${token}`,
		},
	})
		.then((res) => res.json())
		.then((data) => {
			const value = Object.values(data);
			return value;
		});
}
