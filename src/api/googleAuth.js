const googleApiInit = (clientId) => {
    return new Promise((resolve, reject) => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({clientId}).then(() => {
                resolve();
            }).catch(() => {
                reject(new Error ('Google API initialization failed.'));
            });
        });
    })
}

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
    const idToken = localStorage.getItem('idToken');
    const idTokenExpiresAt = localStorage.getItem('idTokenExpiresAt');
    if (idToken && idTokenExpiresAt) {
        const now = new Date();
        const expiresAt = parseInt(idTokenExpiresAt);
        if (now > expiresAt) {
            console.log('ID token has expired, fetching a new one.');
        }
        else {
            return idToken;
        }
    }
    const googleAuth = window.gapi.auth2.getAuthInstance();
    if (!googleAuth || googleAuth.isSignedIn.get() === false) {
        throw new Error('User is not signed in');
    }

    const googleUser = googleAuth.currentUser.get();
    const authResponse = googleUser.getAuthResponse();

    // Update cache
    localStorage.setItem('idToken', authResponse.id_token);
    localStorage.setItem('idTokenExpiresAt', authResponse.expires_at);

    return authResponse.id_token;
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
    return profile.getGivenName();
}

export { googleApiInit, isSignedIn, signIn, signOut, getAuthToken, getName }