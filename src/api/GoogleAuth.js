const clientId = '';

const isSignedIn = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    if (googleAuth) {
        return googleAuth.isSignedIn.get();
    }
    return false;
}

const signIn = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    return googleAuth.signIn();
}

const getAuthToken = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    if (!googleAuth || googleAuth.isSignedIn.get() === false) {
        throw new Error('User is not signed in');
    }

    const googleUser = googleAuth.currentUser.get();
    const authResponse = googleUser.getAuthResponse();
    return {
        idToken: authResponse.id_token,
        expiresIn: authResponse.expires_in,
        expiresAt: authResponse.expires_at
    }
}

const signOut = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    return googleAuth.signOut();
}


const getName = () => {
    const googleAuth = window.gapi.auth2.getAuthInstance();
    if (!googleAuth || googleAuth.isSignedIn.get() === false) {
        return '';
    }

    const googleUser = googleAuth.currentUser.get();
    const profile = googleUser.getBasicProfile();
    console.log('profile', profile);
    return profile.getGivenName();
}

export { clientId, isSignedIn, signIn, signOut, getAuthToken, getName }