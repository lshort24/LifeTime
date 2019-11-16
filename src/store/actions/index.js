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