import React from 'react';

const HoleComponent = () => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
        }}>
            <div style={{
                background: '#eee',
                padding: '20px',
                margin: '10px',
                borderRadius: '8px'
            }}>
                Flex Item 1
            </div>
            <div style={{
                background: '#ccc',
                padding: '20px',
                margin: '10px',
                borderRadius: '8px'
            }}>
                Flex Item 2
            </div>
        </div>
    );
};

export default HoleComponent;