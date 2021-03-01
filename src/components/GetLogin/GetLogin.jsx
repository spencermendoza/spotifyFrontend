import React, { useState, useEffect, useRef} from 'react';

const GetLogin = ({changeLogin, spotifyURL}) => {

    const [url, setUrl] = useState({});
    const loginWindow = useRef(null);

    useEffect(() => {
        setUrl(spotifyURL)
    }, [spotifyURL]);

    let newWindow;

    const openSpotify = () => {
        var width = 450,
            height = 730;
        let features = 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height
        newWindow = window.open(url, 'Spotify', features);


        let timer = setInterval(function() {
            if (newWindow.closed) {
                clearInterval(timer);
                changeLogin();
            }
        }, 1000);
    }

    const waitForURL = () => {
        if (url === 'none') {
            return (<p>We are generating your sign in link now</p>)
        } else {
            return (
                <div className='container'>
                    <button onClick={() => openSpotify()}>
                        Click this button to log in to Spotify
                    </button>
                </div>
            )
        }
    }

    return (
        waitForURL()
    )
}

export default GetLogin;