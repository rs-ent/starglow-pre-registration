import React from 'react';

const Loading = () => {
    
    return (
        <div className="items-center">
            <div className="loading-section relative mx-auto items-center w-1/3">
                <object
                    type="image/svg+xml"
                    data="/Frame 143.svg"
                    aria-label="Header SVG"
                    className="w-full"
                />
            </div>
        </div>        
    );
};

export default Loading;