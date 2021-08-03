/* eslint-disable @typescript-eslint/no-explicit-any */
// const url = '/v1';
const url = 'https://api.finlogix.com';

export default function useWebinarListQuery(currentPage: number): Promise<any> {
	return fetch(`${url}/v1/posts?per_page=12&page=${currentPage}&favourited=0`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
		},
	})
  .then(res => res.json())
  .then(data =>  {
    const value = Object.values(data);
    return value;
  })
}
