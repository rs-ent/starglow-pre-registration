import React from 'react';

const Loading = ({isInitialLoading}) => {
    return (
        <div className="loading-overlay">
            <div className="loading-section">
                <object
                    type="image/svg+xml"
                    data="/Frame 143.svg"
                    aria-label="Header SVG"
                    className="w-3/5 h-auto"
                />
            </div>
        </div>
    );
};

export default Loading;