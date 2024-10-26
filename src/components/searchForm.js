import React from "react";
import { useEffect, useState, useRef } from "react";
import GenreSelection from "./genreSelection";
import axios from "axios";
import '../styles/SearchForm.css'

export default function SearchForm({ authentication, changeArtist }) {
    const [artistImage, setArtistImage] = useState([{index: 0, artistId: '', image: '', active: false}]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const genres = useRef([]); 

    useEffect(() => {
        async function userTopItems() {
          try {
              await axios.get('https://api.spotify.com/v1/me/top/artists?limit=5', {
              headers: {
                Authorization: 'Bearer ' + authentication
              }
            }).then((response) => {
              return response.data
            }).then((data) => {
              return data.items;
            }).then((items) => {
              const artistImageUrl = items.map(( item, index ) => {
                return {
                  artistId: item.id,
                  index: index,
                  image: item.images[2].url,
                  active: false
              }});

              setArtistImage(artistImageUrl);
            })
          } catch(err) {
            console.error(err);
          }
        }
  
        async function recommendationGenres() {
          try {
                await axios.get('https://api.spotify.com/v1/recommendations/available-genre-seeds', {
              headers: {
                Authorization: 'Bearer ' + authentication
              }
            }).then((response) => {
              return response.data
            }).then((data) => {
              genres.current = data.genres.map((genre, index) => {
                return {
                  "genre": genre,
                  "index": index
                }
              });
            });
          } catch(err) {
            console.error(err); 
          }
        }

        /*
        async function userProfile() {
          try {
            const profile = await axios.get('https://api.spotify.com/v1/me', {
              headers: {
                Authorization: 'Bearer ' + authentication
              }
            });
          } catch(err) {
            console.error(err); 
          }
        }
        */

        userTopItems();
        recommendationGenres()
      }, [authentication]);

    function changeGenreList( newGenres ) {
      const newGenreList = newGenres.map((genreObject) => genreObject.genre)
      setSelectedGenres(newGenreList)
    } 

    function handleActiveChange(button, index) {
      button.preventDefault();

      const mutatedArtistImage = artistImage.map((image) => {
        if (image.index === index) {
          image.active = !(image.active);
        }
        return image
      })
      setArtistImage(mutatedArtistImage);      
    };

    function handleSubmit(formData) {
      formData.preventDefault();
      const artistId = artistImage.map((artistInfo) => {
        if(artistInfo.active === true) {
          return artistInfo.artistId;
        }

        return undefined;
      }).filter((info) => info !== undefined).join(',');
      changeArtist(artistId, selectedGenres.join(','));
    }

    const activeStatus = artistImage.map((image) => image.active);  
    if( artistImage.length !== 0 ) {
      return (
        <form onSubmit={handleSubmit} className="searchForm-container">
          <h3 className="searchForm-instruction-1"> Please choose at least One artist to get a recommendation </h3>
          <div className="last-listened-to-artists">
            { artistImage.map( (item) => 
              <button onClick={(e) => handleActiveChange(e, item.index)} key={item.index}> 
                <img key={item.index} src={item.image} alt=''/> 
              </button> 
            )};
          </div>
          { activeStatus.includes(true) &&
            <>
             <GenreSelection genreList={genres} changeSelectedGenres={ changeGenreList }/>
             { selectedGenres.length > 0 && <button className="request-recommendation-button" type="submit"> Get Recommendation </button> }
            </>
          }
        </form>
      );
    }
    return(
        <div>
          <h1> Loading in searchForm...</h1>
        </div>
      );
}
