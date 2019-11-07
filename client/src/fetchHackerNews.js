import { fetchHackerNewsPending, fetchHackerNewsSuccess, fetchHackerNewsFailure } from './actions';
import { getJson, getApiUrl } from './utils';

const retrieveHackerNews = () => {
  return getJson(`${getApiUrl()}/hn`)
}

export const fetchHackerNews = () => {
  return dispatch => {
    dispatch(fetchHackerNewsPending());
    return retrieveHackerNews().then(hn => {
      return dispatch(fetchHackerNewsSuccess(hn))
    })
    .catch(error => {
      dispatch(fetchHackerNewsFailure(error))
    });
  }
}
