import React, { useContext, useState } from 'react';

const TrackList = (props) => {

    console.log('this should be the artist list: ', props.list);
    const eachTrack = (track) => {
        let artistList = '';
        for (let i = 0; i < track.artists.length - 1; i++) {
            artistList += track.artists[i];
            artistList += ', ';
        }
        artistList += track.artists[track.artists.length - 1]
        return (
            <tr className='track'>
                <td>{track.name}</td>
                <td>{track.albumName}</td>
                <td>{artistList}</td>
            </tr>
        )
    }

    return (
        <table className='trackList'>
            <thead>
                <tr>
                    <th>Track Name</th>
                    <th>Album</th>
                    <th>Artist</th>
                </tr>
            </thead>
            <tbody>
                {props.list.map(artist => (
                    artist.music.map(album => (
                        album.tracks.map(track => (
                            eachTrack(track)
                        ))
                    ))
                ))}
            </tbody>
        </table>
    )
};

export default TrackList;
