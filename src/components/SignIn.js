import React from 'react';
import { connect } from 'react-redux'
import { updateIsSignedIn, updateName } from '../store/actions';
import { signIn, authenticate, getName } from '../api/googleAuth';

const SignIn = (props) => {
   const handleSignInClick = () => {
      signIn().then(() => {
          authenticate().then(() => {
              props.updateIsSignedIn(true);
              props.updateName(getName());
          })
      }).catch((error) => {
          const reason = error.error ?? 'Unknown';
          if (error.error) {
              console.log(`Sign in failed. Reason: ${reason}`);
          }
      });
   };

   return (
      <div>
         <button className="ui button fluid" style={{backgroundColor: '#ffffff'}} onClick={handleSignInClick}>
            <img alt="sign in with Google" src="http://localhost:3000/images/btn_google_signin_dark_normal_web.png"/>
         </button>
      </div>
   );
};

const mapDispatchToProps = {
    updateIsSignedIn,
    updateName
}

export default connect(null, mapDispatchToProps)(SignIn);