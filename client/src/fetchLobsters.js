import { fetchLobstersPending, fetchLobstersSuccess, fetchLobstersFailure } from './actions';
import { getJson, getApiUrl } from './utils';

const retrieveLobsters = () => {
  return getJson(`${getApiUrl()}/lobsters`)
}

export const fetchLobsters = () => {
  return dispatch => {
    dispatch(fetchLobstersPending());
    return retrieveLobsters().then(posts => {
      return dispatch(fetchLobstersSuccess(posts));
    })
    .catch(error => {
      dispatch(fetchLobstersFailure(error));
    });
  }
}
