import shortAPI from "./shortAPI";

const googleApiInit = (clientId) => {
    return new Promise((resolve, reject) => {
        window.gapi.load('auth2', () => {
            window.gapi.auth2.init({clientId}).then(() => {
                resolve();
            }).catch((error) => {
                reject(error);
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

const authenticate = () => {
    return new Promise((resolve, reject) => {
        const idToken = localStorage.getItem('idToken');
        const idTokenExpiresAt = localStorage.getItem('idTokenExpiresAt');
        if (idToken && idTokenExpiresAt) {
            const now = new Date();
            const expiresAt = new Date(parseInt(idTokenExpiresAt));
            if (now < expiresAt) {
                console.log(`Authenticated because the token has not expired yet. It will expire at ${expiresAt}`);
                resolve({
                    authenticated: true,
                    idToken
                });
                return;
            }
        }

        console.log('ID token has expired, fetching a new one.');
        const googleAuth = window.gapi.auth2.getAuthInstance();
        if (!googleAuth || googleAuth.isSignedIn.get() === false) {
            reject(new Error('User is not signed in'));
            return;
        }

        const googleUser = googleAuth.currentUser.get();
        const authResponse = googleUser.getAuthResponse();

        // Validate the id_token
        shortAPI.post('/authenticate.php', {idToken: authResponse.id_token}, {withCredentials: true}).then((response) => {
            // Update cache
            localStorage.setItem('idToken', authResponse.id_token);
            localStorage.setItem('idTokenExpiresAt', authResponse.expires_at);
            resolve({...response.data, idToken});
        }).catch((error) => {
            reject(error);
        })
    });
}

const signOut = () => {
    // Update cache
    localStorage.removeItem('idToken');
    localStorage.removeItem('idTokenExpiresAt');

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

export { googleApiInit, isSignedIn, signIn, signOut, authenticate, getName }