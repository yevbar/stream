import { fetchTwitterPending, fetchTwitterSuccess, fetchTwitterFailure } from './actions';
import { getJson, getApiUrl } from './utils';

const retrieveTwitter = () => {
  return getJson(`${getApiUrl()}/twitter`)
}

export const fetchTwitter = () => {
  return dispatch => {
    dispatch(fetchTwitterPending());
    return retrieveTwitter().then(tweets => {
      return dispatch(fetchTwitterSuccess(tweets))
    })
    .catch(error => {
      dispatch(fetchTwitterFailure(error))
    });
  }
}
