import { getAuthToken } from "../../../../../utils/getAuthToken";

const url = 'https://api.finlogix.com/v1';

export default function useUnfavorited(webinarId: number): Promise<void> | undefined {
  const token = getAuthToken();

  if (token === '') {
    alert('please log in first');
    return;
  }

  return fetch(`${url}/favourites/post/${webinarId}`, {
    method: 'DELETE',
    headers: {
      'authorization': `Bearer ${token}`,
		},
  })
  .then((response) => {
    alert(`You are not favouriting post ${webinarId}.`)
    response.json()
  })
  .catch((error) => { console.log(error) })
}
