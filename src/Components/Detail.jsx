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
    <div id="bg" className="h-screen">
      <div>
        {loading ? (
          <div className="mt-20 text-white text-center text-3xl">Loading...</div>
        ) : (
          <div>
            {mov && (
              <div className="flex justify-between items-center px-40  mt-20 max-h-[700px]">
                <div className='border-red-500 shadow-md shadow-red-500 border-2 bg-neutral-800 rounded-2xl'>
                  <img className='rounded-2xl' src={mov.Poster} alt={mov.title}/>
                </div>
               
               <div className='bg-neutral-800 rounded-xl max w-[600px] max-h-[680px]'>
                <h2 className='text-5xl font-semibold text-white text-center mt-5'>{mov.Title}</h2>
                <p className='text-white text-xl w-[500px] text-center ml-10 mt-20 font-light h-[100px]'>{mov.Plot}</p>
                <h2 className='text-white text-[20px] text-center mt-5'>Imd Rating {mov.imdbRating}</h2>
                <button className='text-white text-center ml-58 mt-12 bg-red-700 rounded-2xl px-7 py-2'>Watch now</button>
               <div className='flex justify-between'>
               <p className='text-white mt-15 px-4 text-[18px] '>Genre:{mov.Genre}</p>
               <h3 className='text-white mt-15 ml-80  px-4  text-[18px] '>Year:{mov.Year}</h3>
               </div>
               </div>

              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
