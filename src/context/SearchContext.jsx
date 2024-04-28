import React from 'react';

export const SearchContext = React.createContext();

export const SearchProvider = ({ children }) => {
    const [userSearch, setUserSearch] = React.useState('');

    return (
        <SearchContext.Provider value={{ userSearch, setUserSearch }}>
            {children}
        </SearchContext.Provider>
    );
};