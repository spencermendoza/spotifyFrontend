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
                }}
            >{this.props.children}</Provider>
        )
    }
}

export { CreateContext, CreateProvider, Consumer as CreateConsumer };