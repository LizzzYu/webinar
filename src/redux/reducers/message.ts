import { AnyAction } from 'redux';
import { SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types';

const initialState = {};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function useMessage(state = initialState, action: AnyAction) {
	const { type, payload } = action;

	switch (type) {
		case SET_MESSAGE:
			return { message: payload };

		case CLEAR_MESSAGE:
			return { message: '' };

		default:
			return state;
	}
}
