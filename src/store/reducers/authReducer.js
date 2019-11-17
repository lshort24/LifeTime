const INITIAL_STATE = {
   isSignedIn: null,
   name: null,
   timelines: []
};

// Remember to only use state and action to determine returned state
// Do not mutate input state
// Use lodash _.omit to remove properties from an object
export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case 'SIGN_IN':
         return { ...state, isSignedIn: true };
      case 'SIGN_OUT':
         return { ...state, isSignedIn: false };
      case 'UPDATE_NAME':
         return { ...state, name: action.payload };
      case 'FETCH_TIMELINES':
         return { ...state, timelines: action.payload };
      default:
         return state;
   }
};
