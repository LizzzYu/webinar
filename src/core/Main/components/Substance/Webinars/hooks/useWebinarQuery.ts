export interface WebinarResponseType {
	data: {
		title: string;
		content: string;
		created_at: string;
		analysis_snapshot: string;
	};
}

const url = 'https://api.finlogix.com';

export default function useWebinarQuery(webinarId: number): Promise<WebinarResponseType> {
	return fetch(`${url}/v1/posts/${webinarId}`, {
		method: 'GET',
		headers: {
			'content-type': 'application/json',
		},
	})
  .then(response => response.json())
}
