import React, { Component } from 'react';
import axios from 'axios';

const LibraryContext = React.createContext();
const { Provider, Consumer } = LibraryContext;

class LibraryProvider extends Component {
    state = {
        artistLibrary: [],
        user: {},
        displayOptions: [
            'My Library',
            'Create',
            'User Info',
        ],
        display: 'Base',
        loggedIn: this.props.loggedIn,
    }

    async componentDidMount() {
        if (this.state.loggedIn) {
            await this.startup();
        }
    };

    startup = async () => {
        let music = await this.getMusic();
        let user = await this.getUser();
        this.setContextState('artistLibrary', music.data.sort((a, b) => (a.name > b.name) ? 1 : -1));
        this.setContextState('user', user.data)
    }

    //axios request to get music
    getMusic = () => {
        console.log('getting your music now');
        let options = {
            method: 'get',
            url: 'http://localhost:8888/library',
        };
        return axios(options);
    }

    //axios request to get user
    getUser = () => {
        console.log('getting user info now')
        let options = {
            method: 'get',
            url: 'http://localhost:8888/userinfo',
        };
        return axios(options);
    }

    //just an easy function that allows me to set different context state values
    setContextState = (stateItem, itemValue) => {
        this.setState({
            [stateItem]: itemValue,
        });
    }

    //accepts a list of artists and returns the genres
    //associated with those artists
    compileGenres = (artistList) => {
        let genreCompiler = [];
        artistList.forEach(artist => {
            artist.genres.forEach(genre => {
                if (!genreCompiler.includes(genre)) {
                    genreCompiler.push(genre);
                }
            })
        })
        genreCompiler.sort();
        return genreCompiler;
    }

    //should take a list of genres and a playlist name and return a list of matching artists
    findArtistsByGenre = (genreList) => {
        console.log('genreList: ', genreList)
        let artistList = [];
        genreList.forEach(genre => {
            this.state.artistLibrary.forEach(artist => {
                if (artist.genres.includes(genre)) {
                    artistList.push(artist);
                }
            })
        })
        let uniqueArtists = [...new Set(artistList)];
        return uniqueArtists;
    }

    //pulls genreList out of the list of provided artists and then finds all the artists
    //in library that match the genres on the list
    associateArtists = (artistList) => {
        let genreCompiler = this.compileGenres(artistList);
        let newArtistList = this.findArtistsByGenre(genreCompiler);
        artistList.forEach(artist => {
            if (newArtistList.includes(artist)) {
                return;
            } else {
                newArtistList.push(artist);
            }
        })
        let sortedList = newArtistList.sort((a, b) => (a.name > b.name) ? 1 : -1);
        return sortedList;
    }

    //takes the array of artists and holds it for now
    //takes the playlist name and runs it through the api
    //to create a playlist with that name
    createPlaylist = (array, playlistName) => {
        console.log('i am about to create a playlist using this name: ', playlistName)
        console.log('just checking the array: ', array);
        let trackList = this.pullTracksFromArtists(array);
        axios({
            method: 'post',
            url: 'http://localhost:8888/newplaylist',
            data: {
                trackList: trackList,
                playlistName: playlistName,
                user: this.state.user.id,
            }
        })
    }

    pullTracksFromArtists = (array) => {
        let trackList = [];
        array.forEach(artist => {
            artist.music.forEach(album => {
                album.tracks.forEach(track => {
                    trackList.push(track.uri);
                })
            })
        })
        console.log('trackList: ', trackList)
        return trackList;
    }

    render() {
        return (
            <Provider 
                value ={{
                    ...this.state,
                    startup: this.startup,
                    setContextState: this.setContextState,
                    findArtistsByGenre: this.findArtistsByGenre,
                    createPlaylist: this.createPlaylist,
                    compileGenres: this.compileGenres,
                    associateArtists: this.associateArtists,
                }}
            >{this.props.children}</Provider>
        )
    }
}

export { LibraryContext, LibraryProvider, Consumer as LibraryConsumer };