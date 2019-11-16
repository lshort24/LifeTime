import React from 'react';

const SignIn = () => {
   const handleSignInClick = () => {
      const googleAuth = window.gapi.auth2.getAuthInstance();
      googleAuth.signIn();
   };

   return (
      <div>
         <button onClick={handleSignInClick}>
            <img alt="sign in with Google" src="/images/btn_google_signin_dark_normal_web.png"/>
         </button>
      </div>
   );
};

export default SignIn;