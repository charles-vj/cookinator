import React,{useState,useEffect} from "react";
import './App.css';
import Recipe from "./Recipes";
import reactDom from 'react-dom';

const App = () => {

  const ID = "cbd5f82a";
  const KEY = "dbc2714b99ea1708c64aa96779939a0e"
  
  const[recipes,setRecipes] = useState([]);
  const[search,setSearch] = useState("");
  const[query,setQuery] = useState("chicken")

  useEffect(() => {
    getRecipes();
  },[query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${ID}&app_key=${KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }

  const updateSearch = e => {
    setSearch(e.target.value);
    //console.log(search)
  };
  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
  }

  return (
    <div className="App">
      <h1>Cookinator</h1>
      <form className="searchForm" onSubmit={getSearch}>
        <input className="searchBar" type="text" value={search} onChange={updateSearch}/>
        <button className="searchButton" type="submit">
          Search
        </button>
      </form>
      {recipes.map(recipe => (
        <Recipe title={recipe.recipe.label} calories={recipe.recipe.calories} image={recipe.recipe.image}/>
      ))}
    </div>
  );
}

export default App;
