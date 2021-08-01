import { AnyAction } from 'redux';
import { getAuthToken } from '../../core/utils/getAuthToken';
import { LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../actions/types';

const user = getAuthToken();

const initialState = user
	? { isLoggedIn: true, user }
	: { isLoggedIn: false, user: null };

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function (state = initialState, action: AnyAction) {
	const { type, payload } = action;

	switch (type) {
		case LOGIN_SUCCESS:
			return {
				...state,
				isLoggedIn: true,
				user: payload.user,
			};
		case LOGIN_FAIL:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		case LOGOUT:
			return {
				...state,
				isLoggedIn: false,
				user: null,
			};
		default:
			return state;
	}
}
