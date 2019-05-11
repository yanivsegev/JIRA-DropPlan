import axios from 'axios';

export const GET_TOP_REPORTER_START = 'GET_TOP_REPORTER_START';
export const GET_TOP_REPORTER_DONE = 'GET_TOP_REPORTER_DONE';
export const GET_TOP_REPORTER_SUCCESS = 'GET_TOP_REPORTER_SUCCESS';

export const getTopReporters = async ({ projectId, dispatch }) => {
  try {
    await dispatch({ type: 'GET_TOP_REPORTER_START' });
    const result = await axios.get('/top-reporters', {
      params: {
        jwt: window.jwt,
        projectId
      }
    });
    dispatch(getTopReporterSuccess(result.data));
    dispatch({ type: 'GET_TOP_REPORTER_DONE' });
  } catch(e) {
    dispatch({ type: 'GET_TOP_REPORTER_DONE' });
    throw e;
  }
};

export const getTopReporterSuccess = function (response) {
  return { type: GET_TOP_REPORTER_SUCCESS, response };
}

export default function reportersReducer(state, action) {
  switch (action.type) {
    case GET_TOP_REPORTER_START:
      return {
        ...state,
        isLoading: true
      };
    case GET_TOP_REPORTER_SUCCESS:
      return {
        ...state,
        topReporters: action.response
      };
    case GET_TOP_REPORTER_DONE:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}
