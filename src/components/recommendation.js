import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import '../styles/recommendation.css';

function Recommendation({ authentication, artists}) {
    const [artistRecommendation, setArtistRecommendation] = useState([{artistImage: "", artistName: "", albumName: ""}]);

    useEffect(() => {
        async function getRecommendation() {
            try {
                const recommendationURL = ''.concat('https://api.spotify.com/v1/recommendations?limit=1&', 'seed_artists=', artists.seedArtists, '&seed_genres=', artists.seedGenres);
                await axios.get(recommendationURL, {
                    headers: {
                        Authorization: 'Bearer ' + authentication
                    }
                }).then((response) => response.data
                ).then((data) =>  data.tracks
                ).then((tracks) => tracks[0]
                ).then((track) => {
                    const recommendation = {albumImage: track.album.images[1].url, artistName: track.artists[0].name, albumName: track.album.name};
                    setArtistRecommendation(recommendation);
                });
            } catch(err) {
                console.log(err);
            }
        }
        
        getRecommendation();
    }, [artists, authentication])

    console.log(artistRecommendation);
    return(
        <>
            <img className="recommendation-album-cover" src={artistRecommendation.albumImage} alt='album cover'/>
            <h3 className="recommendation-album-name">{artistRecommendation.albumName}</h3>
            <p className="recommendation-artist-name">{artistRecommendation.artistName}</p>
        </>
    );
}

export default Recommendation