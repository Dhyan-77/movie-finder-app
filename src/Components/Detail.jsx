import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Detail = () => {
  const { id } = useParams();
  console.log(id);

  const [mov, setMov] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchmovid() {
      setLoading(true);
      try {
        const response = await fetch(`https://www.omdbapi.com/?apikey=711fecf2&i=${id}`);
        const result = await response.json();
        setMov(result);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchmovid();
  }, [id]);

  return (
    <div id="bg" className="min-h-screen flex justify-center items-center px-4">
      {loading ? (
        <div className="text-white text-center text-3xl">Loading...</div>
      ) : (
        mov && (
          <div className="flex flex-col md:flex-row justify-between items-center px-5 md:px-20 lg:px-40 mt-10 max-w-7xl w-full">
            
            {/* Movie Poster */}
            <div className="border-red-500 shadow-md shadow-red-500 border-2 bg-neutral-800 rounded-2xl max-w-xs md:max-w-sm lg:max-w-md">
              <img className="rounded-2xl w-full h-auto" src={mov.Poster} alt={mov.Title} />
            </div>

            {/* Movie Details */}
            <div className="bg-neutral-800 rounded-xl max-w-full md:max-w-lg lg:max-w-xl p-5 mt-8 md:mt-0">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white text-center mt-5">
                {mov.Title}
              </h2>
              <p className="text-white text-sm md:text-lg text-center mt-5 font-light">
                {mov.Plot}
              </p>
              <h2 className="text-white text-[16px] md:text-[20px] text-center mt-5">
                IMDb Rating: {mov.imdbRating}
              </h2>

              {/* Watch Now Button */}
              <button className="text-white text-center block mx-auto mt-6 bg-red-700 rounded-2xl px-5 py-2 text-sm md:text-base lg:text-lg">
                Watch Now
              </button>

              {/* Genre and Year */}
              <div className="flex flex-col sm:flex-row justify-between text-center mt-5">
                <p className="text-white text-sm md:text-[18px]">Genre: {mov.Genre}</p>
                <h3 className="text-white text-sm md:text-[18px] mt-2 sm:mt-0">Year: {mov.Year}</h3>
              </div>
            </div>

          </div>
        )
      )}
    </div>
  );
};

export default Detail;
