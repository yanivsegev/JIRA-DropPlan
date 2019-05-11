import axios from 'axios';

export const GET_TOP_REPORTER = 'GET_TOP_REPORTER';
export const GET_TOP_REPORTER_SUCCESS = 'GET_TOP_REPORTER_SUCCESS';

export const getTopReporters = async ({ projectId, dispatch }) => {
  try {
    const result = await axios.get('/top-reporters', {
      params: {
        jwt: window.jwt,
        projectId
      }
    });
    dispatch(getTopReporterSuccess(result.data));
  } catch(e) {
    throw e;
  }
};

export const getTopReporterSuccess = function (response) {
  return { type: GET_TOP_REPORTER_SUCCESS, response };
}

export default function reportersReducer(state, action) {
  switch (action.type) {
    case GET_TOP_REPORTER_SUCCESS:
      return { ...state, topReporters: action.response };
    default:
      return state;
  }
}
