import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();

const baseURL = "https://google-search72.p.rapidapi.com";


export const ResultContextProvider = ({ children }) => {

    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('World cup');

    const getResults = async (url) => {

        setIsLoading(true)

        const response = await fetch(`${baseURL}${url}`, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': process.env.REACT_APP_API_KEY,
                'X-RapidAPI-Host': 'google-search72.p.rapidapi.com'
            }
        });

        const data = await response.json();
        data.items = data.items ? data.items : []
        setSearchResults(data.items)
        setIsLoading(false)
    }

    return (
        <ResultContext.Provider value={{ getResults, searchResults, searchTerm, setSearchTerm, isLoading }}>
            {children}
        </ResultContext.Provider>
    )
}



export const useResultContext = () => useContext(ResultContext)