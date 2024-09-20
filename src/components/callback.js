import React from "react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import querystring from 'querystring';

const CLIENT_ID = "30151cc0246445efa55f400ed7a0bdeb";
const CLIENT_SECRET = "00758daae6374cf0b8b9fe9061e29f8f";
const REDIRECT_URI = "http://localhost:3000/callback";

const Callback = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const hasFetchedToken = useRef(false);

    useEffect(() => {
        if (hasFetchedToken.current) return;
        hasFetchedToken.current = true;

        const { code, state, error } = querystring.parse(location.search.substring(1));

        if(error) {
            console.log("Authorization error", error);
        }

        if(!state) {
            navigate('/?error=state_mismatch');
            return
        }

        async function fetchToken() {
            const headers = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'))
                }
            }
            const data = {
                code: code,
                redirect_uri: REDIRECT_URI,
                grant_type: 'authorization_code'
            }

            try {
                const response = await axios.post(
                    'https://accounts.spotify.com/api/token',
                    querystring.stringify(data),
                    headers
                )
                const { access_token, refresh_token } = response.data;

                window.localStorage.setItem('access_token', access_token);
                window.localStorage.setItem('refresh_token', refresh_token);

                navigate('/');
            } catch(err) {
                console.error("Error fetching the token", err);
                navigate('/?error=invalid_token');
            }
        }

        fetchToken();
    }, [location.search, navigate]);

    return(
        <div>
            Loading...
        </div>
    );
}

export default Callback;