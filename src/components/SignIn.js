import React from 'react';
import { connect } from 'react-redux'
import { signIn } from '../store/actions';

const SignIn = (props) => {
   const handleSignInClick = () => {
      props.signIn();
   };

   return (
      <div>
         <button onClick={handleSignInClick}>
            <img alt="sign in with Google" src="/images/btn_google_signin_dark_normal_web.png"/>
         </button>
      </div>
   );
};

export default connect(null, { signIn })(SignIn);