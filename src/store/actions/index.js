import shortAPI from '../../api/shortAPI';

export const signIn = () => {
   return {
      type: "SIGN_IN"
   }
};

export const signOut = () => {
   return {
      type: "SIGN_OUT"
   }
};

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