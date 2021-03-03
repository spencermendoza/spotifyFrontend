import React from 'react';
import '../../App.css';

const CreateSelections = ({setSelection}) => {

    return (
        <div className="createSelections">
            <button onClick={() => setSelection('genre')}>Create by genre</button>
            <button onClick={() => setSelection('artist')}>Create by artist</button>
        </div>
    );
}

export default CreateSelections;