import React from 'react';
import {useAuth0} from "@auth0/auth0-react";
import {Button} from '@material-ui/core';

export const LoginButton = () => {
    const { loginWithRedirect } = useAuth0();
    return (
        <Button 
            onClick={() => loginWithRedirect()} >
        Log in
        </Button>
    );
};

export const LogoutButton = () => {
    const { logout } = useAuth0();
    return (
        <Button
        onClick={()=>
            logout({
                returnTo: window.location.origin,
            })}>
        Log Out
        </Button>
    )
}