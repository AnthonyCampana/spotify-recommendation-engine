import React from "react";
import Multiselect from "multiselect-react-dropdown";
import '../styles/genreSelection.css';

function GenreSelection({ genreList, changeSelectedGenres }) {
    function onSelect(selectedList){
        changeSelectedGenres(selectedList);
    }

    function onRemove(selectedList) {
        changeSelectedGenres(selectedList);
    }
    
    return(
        <>
            <Multiselect className="multiselect-dropdown" options={genreList.current} displayValue="genre" onSelect={onSelect} onRemove={onRemove} selectionLimit={5} showArrow={true} />
        </>
    );

}

export default GenreSelection;