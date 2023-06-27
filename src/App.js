import babyNameList from "./babyNamesData.json";
import './App.css';
import { useState } from "react";


function NamesFilter (props) {
  const [listToDisplay, setListToDisplay] = useState(props.list)
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  
  function filterFavorites (event) {
    setFavorites(favorites.concat({"name": event.target.innerText,
          "sex": event.target.className}))
    setListToDisplay(listToDisplay.filter((item) => item.name !== event.target.innerText))
  }

  function removeFavorites (e) {
    setFavorites(favorites.filter((item) => item.name !== e.target.innerText))
    setListToDisplay(listToDisplay.concat(props.list.filter((item) => item.name === e.target.innerText)))
  }
  return (
    <div>
      <input
        type="text"
        name="searchInput"
        className="SearchField"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div id="favoriteList">
        <h2>Favorites: </h2>
        {favorites
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(search);
          })
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((name) => {
            return (
              <span
                key={name.name}
                className={name.sex}
                onClick={removeFavorites}
              >
                {name.name}
              </span>
            );
          })}
      </div>
      <div id="nameList">
        {listToDisplay
          .filter((item) => {
            return search.toLowerCase() === ""
              ? item
              : item.name.toLowerCase().includes(search);
          })
          .sort((a, b) => a.name.localeCompare(b.name))
          .map((name) => {
            return (
              <span
                key={name.name}
                className={name.sex}
                onClick={filterFavorites}
              >
                {name.name}
              </span>
            );
          })}
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
    <NamesFilter list={babyNameList}/>
    </div>
  );
}

export default App;
