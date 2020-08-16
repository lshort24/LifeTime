import shortAPI from '../../api/shortAPI';

export const updateIsSignedIn = (isSignedIn) => {
   return {
      type: "UPDATE_IS_SIGNED_IN",
      payload: isSignedIn
   }
}

export const updateName = (name) => {
   return {
      type: "UPDATE_NAME",
      payload: name
   }
};

export const fetchTimeSpans = () => {
   return async (dispatch) => {
      const response = await shortAPI.get('/timespan/read.php');
      dispatch({
         type: 'FETCH_TIME_SPANS',
         payload: response.data
      });
   }
};