import React, { Component, useContext } from 'react';
import { LibraryContext } from '../../Context/LibraryContext'

const CreateContext = React.createContext();
const { Provider, Consumer } = CreateContext;

class CreateProvider extends Component {
    state = {
        createOption: '',
        list: [],
        selectedList: [],
        artistList: [],
    }

    setCreateOption = (selection) => {
        console.log('creating by: ', selection);
        this.setState({
            createOption: selection,
        });
    };

    setList = (newList) => {
        this.setState({
            list: newList,
        })
    }

    setSelectedList = (newList) => {
        this.setState({
            selectedList: newList,
        })
    }

    setArtistList = (newList) => {
        this.setState({
            artistList: newList,
        })
    }

    changeOption = (option) => {
        let tempList = this.state.selectedList;
        if (tempList.includes(option)) {
            const index = tempList.indexOf(option);
            if (index > -1) {
                console.log('removing option: ', option)
                tempList.splice(index, 1);
            }
        } else {
            console.log('adding option: ', option)
            tempList.push(option);
        }
        this.setState({
            selectedList: tempList,
        })
    }

    clearSelection = () => {
        if (this.state.createOption === 'create') {
            this.setCreateOption('');
        };
        this.setSelectedList([]);
    }

    resetState = () => {
        this.setState({
            createOption: '',
            list: [],
            selectedList: [],
            artistList: [],
        })
    }

    //pulls genreList out of the list of provided artists and then finds all the artists
    //in library that match the genres on the list
    associateArtists = (artistList, artistLibrary) => {
        console.log('associating artists')
        let genreCompiler = this.compileGenres(artistList);
        let newArtistList = this.findArtistsByGenre(genreCompiler, artistLibrary);
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
    findArtistsByGenre = (genreList, artistLibrary) => {
        let artistList = [];
        genreList.forEach(genre => {
            artistLibrary.forEach(artist => {
                if (artist.genres.includes(genre)) {
                    artistList.push(artist);
                }
            })
        })
        let uniqueArtists = [...new Set(artistList)];
        return uniqueArtists;
    }












    render() {
        return (
            <Provider
                value = {{
                    ...this.state,
                    setCreateOption: this.setCreateOption,
                    setList: this.setList,
                    setSelectedList: this.setSelectedList,
                    setArtistList: this.setArtistList,
                    changeOption: this.changeOption,
                    clearSelection: this.clearSelection,
                    associateArtists: this.associateArtists,
                }}
            >{this.props.children}</Provider>
        )
    }
}

export { CreateContext, CreateProvider, Consumer as CreateConsumer };