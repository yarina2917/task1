import React from 'react';

const textTag = ({text, coordinates, editTag, handleMouseMove}) => {

    const handleMouseDown = () => {
        document.ondragstart = () => {
            return false
        };
        document.onmousemove = (e) => {
            handleMouseMove(e)
        };
        document.onmouseup = () => {
            document.onmousemove = null;
            document.onmouseup = null;
        };
    };

    return (
        <p className='el'
           draggable
           style={coordinates}
           onDoubleClick={editTag}
           onDragStart={() => false}
           onMouseDown={handleMouseDown}
        >{text}</p>
    )
};

export default textTag;