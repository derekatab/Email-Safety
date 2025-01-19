'use client';

import { useEffect } from 'react';
import 'firebaseui/dist/firebaseui.css';
import { GithubAuthProvider, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../../../firebase/clientApp';

// Configuring the Firebase interface

function SignInScreen() {
    useEffect(() => {
        const firebaseui = require('firebaseui');
        const uiConfig = {
            signInSuccessUrl: '/dashboard',
            signInOptions: [
                EmailAuthProvider.PROVIDER_ID,
                GithubAuthProvider.PROVIDER_ID,
            ],
        };
        const ui = !firebaseui.auth.AuthUI.getInstance() ? new firebaseui.auth.AuthUI(auth) : firebaseui.auth.AuthUI.getInstance();
        ui.start('#firebaseui-auth-container', uiConfig);
    }
        , []);
    return (
        <div>
            <h1>Sign In</h1>
            <div id="firebaseui-auth-container"></div>
        </div>
    );
}




export default SignInScreen;
