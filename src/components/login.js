import React from "react";
import { useState } from "react";
import querystring from "querystring";
import '../styles/Login.css'
import SearchForm from "./searchForm";
import Recommendation from "./recommendation";

const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
const REDIRECT_URI = process.env.REACT_APP_REDIRECT_URI;
const AUTH_ENDPOINT = process.env.REACT_APP_AUTH_ENDPOINT;
const SCOPE =  process.env.REACT_APP_SCOPE;

function generateRandomString(length) {
  {
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      randomString += charset[randomIndex];
    }
    return randomString;
  }
}

function Login() {
  const [authentication, setAuthentication] = useState(window.localStorage.getItem("access_token"));
  const [refreshToken, setRefreshToken] = useState(window.localStorage.getItem("refresh_token"));
  const [artists, setArtists] = useState({ seedArtists: '', seedGenres: ''});

  function handleLogin() {
    const state = generateRandomString(16);
    window.location =
      AUTH_ENDPOINT +
      querystring.stringify({
        response_type: "code",
        client_id: CLIENT_ID,
        scope: SCOPE,
        redirect_uri: REDIRECT_URI,
        state: state,
      });
  }

  function handleLogout() {
    window.localStorage.setItem("access_token", "");
    window.localStorage.setItem("refresh_token", "");
  
    setAuthentication(window.localStorage.getItem("access_token"));
    setRefreshToken(window.localStorage.getItem("refresh_token"));
  }

  function changeArtistSearch(ids, genres) {
    setArtists({ seedArtists: ids, seedGenres: genres});
  }

  return ( (authentication === "" && refreshToken === "") ? 
  (
    <div className="authentication-container">
      <h2 className="authentication-status">Not Authenticated </h2>
      <div className="login-container">
        <button className="login" onClick={handleLogin}>Login</button>
      </div>
    </div>
  ) :
  (
    <div className="container">
      <div className="authentication-navbar">
        <h2 className="authentication-message">You are Authenticated </h2>
          <button className="logout" onClick={handleLogout}> Logout </button>
      </div>
      <SearchForm authentication={ authentication} changeArtist={ changeArtistSearch }/>
      <div className="recommendation-container">
        { (artists.seedArtists.length > 0 && artists.seedGenres.length > 0) ? <Recommendation authentication={ authentication } artists={ artists }/> : <></> }
      </div>
    </div>
  ));
}

export default Login;
