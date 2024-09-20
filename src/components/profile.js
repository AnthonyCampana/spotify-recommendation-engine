import React, { useEffect } from "react";
import axios from "axios";

function Profile({ authentication, changeArtist }) {
    useEffect(() => {

      const artist = ''; 

      async function userProfile() {
        try {
          const profile = await axios.get('https://api.spotify.com/v1/me', {
            headers: {
              Authorization: 'Bearer ' + authentication
            }
          });
          
          console.log(profile);
        } catch(err) {
          console.error(err); 
        }
      }

      async function userTopItems() {
        try {
          const topItems = await axios.get('https://api.spotify.com/v1/me/top/artists?limit=5', {
            headers: {
              Authorization: 'Bearer ' + authentication
            }
          }).then((response) => {
            return response.data
          }).then((data) => {
            return data.items;
          }).then((items) => {
            let artistList = '';
            const totalArtists = Math.floor((Math.random() * items.length) +1);

            for(let i = 0; i < totalArtists; i++) {
              artistList += items[i].id + ',';
            }

            return artistList.substring(0, artistList.length -1); 
          })

          console.log(topItems);
          return topItems;
          //changeArtist('seedArtists', topItems);
        } catch(err) {
          console.log(err);
        }
      }

      async function recommendationGenres() {
        try {
          const genres = await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
            headers: {
              Authorization: 'Bearer ' + authentication
            }
          }).then((response) => {
            return response.data
          }).then((data) => {
            let genresList = '';
            const totalGenres = Math.floor((Math.random() * 5) + 1);

            for(let i =0; i< totalGenres; i++) {
              const selectedGenres = Math.floor(Math.random() * 125);
              if (genresList === '') {
                genresList += data.genres[selectedGenres];
              } else {
                genresList += "," + data.genres[selectedGenres];  
              }
            }
            return genresList
            //changeArtist('seedGenres', genresList);
          });
        } catch(err) {
          console.error(err); 
        }
      }

      //changeArtist('seedArtists', userTopItems(), 'seedGenres', recommendationGenres());
    }, [authentication, changeArtist]);
}

export default Profile