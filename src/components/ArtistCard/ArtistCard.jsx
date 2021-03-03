import React, { useContext, useEffect } from 'react';
import { LibraryContext } from '../Context/LibraryContext';
import '../../App.css';

const ArtistCard = ({artist}) => {

    useEffect(() => {
        console.log('curr Artist: ', artist);
    }, []);

    const thisArtist = artist;
    const theseAlbums = artist.music;

    return (
        <li className='oneArtist'>
            <h3>{thisArtist.name}</h3>
            <h4>Music: </h4>
            {theseAlbums.map(album => (
                <div>
                    <p><b>{album.name}</b></p>
                    <p><b>Tracks: </b>{album.tracks.length}</p>
                </div>
            ))}
        </li>
    )
}

export default ArtistCard;