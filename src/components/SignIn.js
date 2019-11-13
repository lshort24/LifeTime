import React from 'react';

const SignIn = () => {
   const handleSignInClick = () => {
      const googleAuth = window.gapi.auth2.getAuthInstance();
      googleAuth.signIn();
   };

   return (
      <div>
         <button onClick={handleSignInClick}>Sign In </button>
      </div>
   );
};

export default SignIn;