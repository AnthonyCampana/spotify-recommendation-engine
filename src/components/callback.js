import React from "react";
import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import querystring from 'querystring';

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;

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
            console.log("in the fetchToken function");

            try {
                const response = await axios.post(
                    'https://accounts.spotify.com/api/token',
                    querystring.stringify(data),
                    headers
                )
                const { access_token, refresh_token } = response.data;

                window.localStorage.setItem('access_token', access_token);
                window.localStorage.setItem('refresh_token', refresh_token);
                console.log("in the try block");

                navigate('/');
                return 
            } catch(err) {
                console.error("Error fetching the token", err);
                navigate('/?error=invalid_token');
            }
        }

        console.log(process.env);
        console.log(CLIENT_ID);
        console.log(CLIENT_SECRET);
        fetchToken();
    }, [location.search, navigate]);

    return(
        <div>
            Loading...
        </div>
    );
}

export default Callback;