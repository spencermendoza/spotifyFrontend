import React, { useContext, useState, useEffect } from 'react';
import { LibraryContext } from '../Context/LibraryContext';
import '../../App.css';

const ArtistList = ({ props }) => {

    let {
        createOption,
        changeStateList,
        selectedList,
    } = props;

    let { artistLibrary } = useContext(LibraryContext);

    const changeOption = artist => {
        console.log(artist.artist)
        let tempArtistList = selectedList;
        if (tempArtistList.includes(artist.artist)) {
            const index = tempArtistList.indexOf(artist.artist);
            if (index > -1) {
                tempArtistList.splice(index, 1);
            }
        } else {
            tempArtistList.push(artist.artist);
        }
        changeStateList(tempArtistList);
    }

    const Checkbox = (artist, key) => {
        var checked = null;
        if (selectedList.includes(artist.artist)) {
            checked = true;
        };
        return (
            <li key={key}>
                <label>
                    <input type='checkbox' checked={checked} value={artist.artist.name} onChange={e => changeOption(artist)}/>{artist.artist.name}
                </label>
            </li>
        )
    }

    return (
        <ul className='list'>
            {artistLibrary.map((artist, i) => (
                <Checkbox artist={artist} key={i} />
            ))}
        </ul>
    )
}

export default ArtistList;