const INITIAL_STATE = {
   isSignedIn: null,
   name: null,
   timeSpans: [],
   authError: null
};

// Remember to only use state and action to determine returned state
// Do not mutate input state
// Use lodash _.omit to remove properties from an object
export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case 'UPDATE_IS_SIGNED_IN':
         return {...state, isSignedIn: action.payload}
      case 'UPDATE_NAME':
         return { ...state, name: action.payload };
      case 'UPDATE_AUTH_ERROR':
         return { ...state, authError: action.payload }
      case 'FETCH_TIME_SPANS':
         return { ...state, timeSpans: action.payload };
      default:
         return state;
   }
};
