import React, { useContext } from 'react';
import { LibraryContext } from '../../Context/LibraryContext';
import { CreateContext } from '../CreateContext/CreateContext';

const ArtistList = () => {

    // let {
    //     createOption,
    //     changeStateList,
    //     selectedList,
    // } = props;

    let { artistLibrary } = useContext(LibraryContext);
    let { createOption, selectedList, changeOption } = useContext(CreateContext);

    // const changeOption = artist => {
    //     console.log(artist.artist)
    //     let tempArtistList = selectedList;
    //     if (tempArtistList.includes(artist.artist)) {
    //         const index = tempArtistList.indexOf(artist.artist);
    //         if (index > -1) {
    //             tempArtistList.splice(index, 1);
    //         }
    //     } else {
    //         tempArtistList.push(artist.artist);
    //     }
    //     changeStateList(tempArtistList);
    // }

    const Checkbox = (artist, key) => {
        var checked = null;
        if (selectedList.includes(artist.artist)) {
            checked = true;
        };
        return (
            <li key={key}>
                <label>
                    <input type='checkbox' checked={checked} value={artist.artist.name} onChange={e => changeOption(artist.artist)}/>{artist.artist.name}
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