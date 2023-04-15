import React, { useEffect } from 'react';

export default function AuthCallback() {
    useEffect(() => {
    // get the URL parameters which will include the auth token
    if (window.opener) {
            const urlParams = new URLSearchParams(window.location.search);
            const params = Object.fromEntries(urlParams);
            window.opener.postMessage(params);
        }
    });
    // some text to show the user
    return <p>Please wait...</p>;
};