
import React, { useState } from "react";
import './../styles/App.css';

const App = () => {
  const [MovieTitle, setMovieTitle] = useState('');
  const[MovieData, setMovieData] = useState(1);
  const APIkey =  '99eb9fd1'
  function MovieSearch() {
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
if (MovieData.Response === 'False'){
    return (<div>
      Search Movie: <br />
      <input type="text" value={MovieTitle} onChange={(e)=>setMovieTitle(e.target.value)} />
      <button onClick={MovieSearch} >Search</button>
      <p className="error">Invalid movie name. Please try again.</p>
    </div>
    )
  
}
else{
  return(
    <div>
      Search Movie: <br />
      <input type="text" value={MovieTitle} onChange={(e)=>setMovieTitle(e.target.value)} />
      <button onClick={MovieSearch} >Search</button> <br/> <br/> <br/>
      {MovieData.Title} <br/> <br/>
      {MovieData.Year} <br/> <br/>
      <img src={MovieData.Poster} />
    </div>
  )

}
}

export default App
