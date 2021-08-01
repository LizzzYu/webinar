import { getAuthToken } from "../../../../../utils/getAuthToken";

const url = 'https://api.finlogix.com/v1';

export default function useFavorited(webinarId: number[]): Promise<void> | undefined {
  const token = getAuthToken();

  if (token === '') {
    alert('please log in first');
    return;
  }

  return fetch(`${url}/favourites`, {
    method: 'POST',
    headers: {
			'content-type': 'application/json',
      'authorization': `Bearer ${token}`,
		},
    body: JSON.stringify({
      ids: webinarId,
      model:'post',
    }),
  })
  .then((response) => {
    alert(`You are now favouriting post [${webinarId}].`)
    response.json()
  })
  .catch((error) => { console.log(error) })
}
