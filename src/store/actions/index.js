import shortAPI from '../../api/shortAPI';
import { authenticate } from '../../api/googleAuth';

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

export const updateAuthError = (message) => {
   return {
      type: "UPDATE_AUTH_ERROR",
      payload: message
   }
};

export const fetchTimeSpans = () => {
   return async (dispatch) => {
      // Authenticate so we can get a valid ID token
      const authResponse = await authenticate();
      const response = await shortAPI.get('/timespan/read.php', {
         headers: {
            'Authorization': 'Bearer ' + authResponse.idToken
         },
         withCredentials: true
      });
      dispatch({
         type: 'FETCH_TIME_SPANS',
         payload: response.data
      });
   }
};