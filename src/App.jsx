
import { useState } from 'react';
import './App.css'

import { GetRandomMovie } from './requests/apiService'
import { GetGener } from './requests/apiService';
import Form from './components/form';
import ShowMovie from './components/showMovie';

function App() {

  const [movie, setMovie] = useState({});
  const [currentGeners, setCurrentGeners] = useState([]);


  const handleOnClick = () => {
    const fetchMovie = async () => {
      const movie = await GetRandomMovie();
      setMovie(movie);

      const gener = await GetGener(movie.genre_ids);
      setCurrentGeners(gener[0]);
    }
    fetchMovie();

  }

  const handleFromForm = async (movie) => {
    if (movie == undefined) {
      return;
    }
    setMovie(movie);
    const gener = await GetGener(movie.genre_ids);
    setCurrentGeners(gener[0]);
  }
  return <>

    <div className="container">

      <header>
        <h2>What to watch today?</h2>
        <p>Not sure what to watch? Out of movie ideas?</p>
        <p>Click the button, and I'll suggest a random movie!</p>
        <button id='button' onClick={handleOnClick}>Surprise me!</button>

      </header>
      <main>
        <section >
          <ShowMovie movie={movie} currentGeners={currentGeners} />
        </section >
        <aside>
          <div className="box">
            <Form showMovie={handleFromForm} />
          </div>
        </aside>
      </main>
    </div >

  </>

}

export default App
