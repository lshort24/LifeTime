import React from 'react';
import { connect } from 'react-redux'
import { updateIsSignedIn, updateName, updateAuthError } from '../store/actions';
import { signIn, authenticate, getName } from '../api/googleAuth';

const SignIn = (props) => {
    const handleSignInClick = () => {
        signIn().then(() => {
            authenticate().then((response) => {
                if (response.authenticated) {
                    props.updateIsSignedIn(true);
                    props.updateName(getName());
                }
                else {
                    props.updateIsSignedIn(false);
                    props.updateAuthError(response.failReason);
                }
            })
        }).catch((error) => {
            const reason = error.error ?? 'Unknown';
            if (error.error) {
                console.log(`Sign in failed. Reason: ${reason}`);
            }
        });
    };

    const authError = props.authError
        ? <div style={{"textAlign": "center"}}>{props.authError}</div>
        : null;

    return (
        <React.Fragment>
            {authError}
            <div>
                <button className="ui button fluid" style={{backgroundColor: '#ffffff'}} onClick={handleSignInClick}>
                    <img alt="sign in with Google" src="http://localhost:3000/images/btn_google_signin_dark_normal_web.png"/>
                </button>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError
    }
};

const mapDispatchToProps = {
    updateIsSignedIn,
    updateName,
    updateAuthError
}

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);