
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [MovieTitle, setMovieTitle] = useState('');
  const[MovieData, setMovieData] = useState(null);
  const APIkey =  '99eb9fd1'
  function MovieSearch(e) {
    e.preventDefault();
    const APIurl = `http://www.omdbapi.com/?apikey=${APIkey}&t=${MovieTitle}`
    fetch(`http://www.omdbapi.com/?apikey=${APIkey}&t=${MovieTitle}`)
      .then(response => response.json())
      .then(data => {
        setMovieData(data);
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });
  }

  console.log(MovieData)
if(MovieData==null){
  return (<div>
    <form onSubmit={MovieSearch} >
    <label htmlFor="title">Search Movie: </label> <br/>
    <input type="text" id="title" value={MovieTitle} onChange={(e)=>setMovieTitle(e.target.value)} />
    <button>Search</button>
    </form>
  </div>
  )
}
if (MovieData.Response === 'False'){
    return (<div>
      <form onSubmit={MovieSearch} >
      <label htmlFor="title">Search Movie: </label> <br/>
      <input type="text" id="title" value={MovieTitle} onChange={(e)=>setMovieTitle(e.target.value)} />
      <button>Search</button>
      </form>
      <p className="error">Invalid movie name. Please try again.</p>
    </div>
    )
  
}
else{
  return(
    <div>
      <form onSubmit={MovieSearch} >
      Search Movie: <br />
      <input type="text" value={MovieTitle} onChange={(e)=>setMovieTitle(e.target.value)} />
      <button onClick={MovieSearch} >Search</button>
      </form> <br/>
      <ul>
        <li>
      {MovieData.Title} ({MovieData.Year}) <br/> <br/>
      <img src={MovieData.Poster} />
        </li>
      </ul>
    </div>
  )

}
}

export default App
