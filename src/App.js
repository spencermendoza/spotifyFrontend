import React, { Component } from 'react';
import axios from 'axios';

import { LibraryProvider } from './components/Context/LibraryContext';
import {GetLogin, HomePage} from './components';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: 'none',
        };
    }

    async componentDidMount() {
        let url;
        async function getURL() {
            const loginResponse = await axios({
                method: 'get',
                url: 'http://localhost:8888/login',
                withCredentials: true,
            });

            return loginResponse.data.body;
        };
        console.log('running getURL')
        url = await getURL();
        this.setState({
            url: url,
        });
    }

    changeLogin = () => {
        this.setState({
            loggedIn: true,
        });
    }

    render() {
        if(!this.state.loggedIn && this.state.url !== undefined) {
            return (
                <GetLogin changeLogin={this.changeLogin} spotifyURL={this.state.url} key={this.state.key}/>
            )
        } else {
            return (
                <LibraryProvider key={this.state.key}>
                    <HomePage/>
                </LibraryProvider>
            )
        }

    };
};

export default App;