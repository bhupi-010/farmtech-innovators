// src/components/GoogleAuthButton.tsx
import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, GoogleLoginResponse, GoogleLoginErrorResponse } from '@react-oauth/google';
import axios from 'axios';


interface GoogleAuthButtonProps {
    onSuccess: (data: any) => void;
    onFailure: (error: any) => void;
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({ onSuccess, onFailure }) => {
    const handleLoginSuccess = async (response: GoogleLoginResponse) => {
        const { credential } = response;
        console.log('Google login response:', credential);

        try {
            // Send the Google token to your backend for verification
            const { data } = await axios.post('/api/auth/google', { token: credential });

            // Handle the response, e.g., storing session info
            console.log('Backend response:', data);
            onSuccess(data); // Optionally pass data to the parent component
        } catch (error) {
            console.error('Google authentication failed:', error);
            onFailure(error); // Optionally handle failure with a callback
        }
    };

    const handleLoginFailure = (error: GoogleLoginErrorResponse) => {
        console.error('Google login failed:', error);
        onFailure(error);
    };

    return (
        <GoogleOAuthProvider clientId="556229374549-3mkbdbsmlhgqfdh4fndl3salhsn2huvb.apps.googleusercontent.com">
            <GoogleLogin
                onSuccess={handleLoginSuccess}
                onError={handleLoginFailure}
                theme="filled_blue"
                size="large"
                shape="rectangular"
            />
        </GoogleOAuthProvider>
    );
};

export default GoogleAuthButton;
