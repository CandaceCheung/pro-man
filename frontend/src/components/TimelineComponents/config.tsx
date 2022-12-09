import moment from 'moment';

export const defaultTimeStart = moment().startOf('day');
export const defaultTimeEnd = moment()
  .startOf('day')
  .add(7, 'days');
export const interval = 24 * 60 * 60 * 1000;
