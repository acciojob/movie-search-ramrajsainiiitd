import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [MovieTitle, setMovieTitle] = useState('');
  const [MovieData, setMovieData] = useState(null);

  async function MovieSearch(e) {
    e.preventDefault();
    await fetch(`https://www.omdbapi.com/?s=${MovieTitle}&apikey=99eb9fd1`)
      .then(response => response.json())
      .then(data => {
        setMovieData(data);
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });
  }

  if (MovieData === null) {
    return (
      <div>
        <form onSubmit={MovieSearch} >
          <label htmlFor="title">Search Movie: </label> <br/>
          <input type="text" id="title" value={MovieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
          <button type="submit" >Search</button>
        </form>
      </div>
    );
  }

  if (MovieData.Response === 'False') {
    return (
      <div>
        <form onSubmit={MovieSearch} >
          <label htmlFor="title">Search Movie: </label> <br/>
          <input type="text" id="title" value={MovieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
          <button type="submit" >Search</button>
        </form>
        <p className="error">Invalid movie name. Please try again.</p>
      </div>
    );
  }

  return (
    <div>
      <form onSubmit={MovieSearch} >
        Search Movie: <br />
        <input type="text" value={MovieTitle} onChange={(e) => setMovieTitle(e.target.value)} />
        <button type="submit" >Search</button>
      </form> <br/>
      <ul>
        {MovieData.Search.map((item) => (
          <li key={item.imdbID}>
            {item.Title} ({item.Year}) <br/> <br/>
            <img src={item.Poster} alt={`${item.Title} Poster`} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
