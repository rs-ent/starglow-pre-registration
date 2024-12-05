import React from 'react';

const Loading = ({hidden}) => {
    
    return (
        <>
            <div className="loading-section">
                <object
                    type="image/svg+xml"
                    data="/Frame 143.svg"
                    aria-label="Header SVG"
                    className="w-1/2 h-auto"
                />
            </div>
        </>        
    );
};

export default Loading;