import React from 'react';

const inputTag = ({text, coordinates, editText, deleteTag}) => (
    <div className='el' style={coordinates}>
        <input
            type="text"
            defaultValue={text}
            onChange={(e) => editText(e.target.value)}/>
        <button onClick={deleteTag}>X</button>
    </div>
);

export default inputTag;