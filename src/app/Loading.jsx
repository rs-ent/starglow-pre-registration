import React from 'react';

const Loading = ({isInitialLoading}) => {
    return (
        <>
            <div className="loading-section">
                <object
                    type="image/svg+xml"
                    data="/Frame 143.svg"
                    aria-label="Header SVG"
                    className="w-full h-auto"
                />
            </div>
        </>        
    );
};

export default Loading;