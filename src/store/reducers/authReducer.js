const INITIAL_STATE = {
   isSignedIn: null,
   name: null
};

export default (state = INITIAL_STATE, action) => {
   switch(action.type) {
      case 'SIGN_IN':
         return { ...state, isSignedIn: true };
      case 'SIGN_OUT':
         return { ...state, isSignedIn: false };
      case 'UPDATE_NAME':
         return { ...state, name: action.payload };
      default:
         return state;
   }
};
