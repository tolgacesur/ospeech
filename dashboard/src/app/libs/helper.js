import * as moment from 'moment';

export default {
	formatDate(date) {
		const isToday = moment(date).isSame(moment(), 'day');
		if (isToday) {
			return moment(date).format('HH:mm');
		}

		return moment(date).format('MMMM DD, HH:mm');
	}
}