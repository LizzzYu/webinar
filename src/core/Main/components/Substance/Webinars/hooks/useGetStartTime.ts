import moment from 'moment';

export const useGetStartTime = (currentDate: string): string => {
	const new_date = moment(currentDate, 'YYYY-MM-DD HH:mm:ss').add(7, 'days');

	return new_date.format('YYYY/MM/DD hh:mm');
};
