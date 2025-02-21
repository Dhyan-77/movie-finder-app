import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from "react-icons/fa"; // Filled heart for removing favorites

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        // Load favorite movies from local storage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
    }, []);

    // Remove movie from favorites
    const removeFavorite = (imdbID) => {
        const updatedFavorites = favorites.filter(movie => movie.imdbID !== imdbID);
        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div className='h-screen  bg-black'>
            <h1 className='text-center text-3xl text-white '>Your Favorite Movies</h1>

            <div className='mt-8 px-4 overflow-hidden mb-3 bg-black'>
                {favorites.length > 0 ? (
                    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                        {favorites.map((movie) => (
                            <div key={movie.imdbID} className='bg-neutral-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
                                <div className='overflow-hidden rounded-lg'>
                                    <img 
                                        src={movie.Poster} 
                                        alt={movie.Title} 
                                        className='w-full h-auto rounded-lg transition-transform duration-300 hover:scale-110' 
                                    />
                                </div>

                                {/* Remove from Favorites Button */}
                                <button onClick={() => removeFavorite(movie.imdbID)} className='text-red-500 text-xl mt-2'>
                                    <FaHeart />
                                </button>

                                <h2 className='text-white mt-2 text-lg'>{movie.Title}</h2>
                                <p className='text-gray-400'>{movie.Year}</p>
                                <div>
                                    <Link to={`/detail/${movie.imdbID}`}>
                                        <button className='bg-red-800 text-white px-8 py-2 rounded-2xl'>Detail</button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className='text-white text-center text-lg'>No favorites yet! ❤️</p>
                )}
            </div>

            <div className='text-center  bg-black'>
                <Link to="/">
                    <button className='bg-blue-600 text-white px-6 py-2 rounded-lg'>Back to Home</button>
                </Link>
            </div>
        </div>
    );
};

export default Favorites;
