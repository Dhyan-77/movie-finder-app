import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa"; // Import filled heart icon

const Home = () => {
    const [search, setSearch] = useState("")
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [favorites, setFavorites] = useState([]) // Store favorite movies

    useEffect(() => {
        // Load favorites from local storage
        const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(storedFavorites);
        fetchmovie("fight club");
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        fetchmovie(search);
        setSearch("");
    }

    async function fetchmovie(searchTerm) {
        setLoading(true);
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=711fecf2&s=${searchTerm}`);
            const result = await response.json();
            setData(result);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    }

    // Toggle favorite status of a movie
    const toggleFavorite = (movie) => {
        let updatedFavorites = [...favorites];

        if (favorites.some((fav) => fav.imdbID === movie.imdbID)) {
            updatedFavorites = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
        } else {
            updatedFavorites.push(movie);
        }

        setFavorites(updatedFavorites);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    return (
        <div id='bg' className='h-screen'>
            <div className=''>
                <form onSubmit={handleSubmit}>
                    <input
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        type='text'
                        placeholder='Enter your movie'
                        className='w-96 px-4 py-2 relative top-5 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-red-600 bg-neutral-800 text-white placeholder-gray-400 mx-auto block'
                    />
                </form>

                <div className='mt-8 px-4'>
                    {loading ? (
                        <p className='text-white h-screen text-center'>Loading...</p>
                    ) : (
                        <>
                            {data.Search ? (
                                <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                                    {data.Search.map((movie) => (
                                        <div key={movie.imdbID} className='bg-neutral-800 p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300'>
                                            <div className='overflow-hidden rounded-lg'>
                                                <img 
                                                    src={movie.Poster} 
                                                    alt={movie.Title} 
                                                    className='w-full h-auto rounded-lg transition-transform duration-300 hover:scale-110' 
                                                />
                                            </div>

                                            {/* Favorite Button */}
                                            <button onClick={() => toggleFavorite(movie)} className='text-red-500 text-xl mt-2'>
                                                {favorites.some((fav) => fav.imdbID === movie.imdbID) ? <FaHeart /> : <CiHeart />}
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
                            ) : data.Error ? (
                                <p className='text-white text-center h-screen'>{data.Error}</p>
                            ) : null}
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Home
