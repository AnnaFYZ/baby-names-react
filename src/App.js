import babyNameList from "./babyNamesData.json";
import './App.css';
import { useState } from "react";

function GenderButton (props) {
  return (
    <div>
      <label className="Label"> 
        <img className="genderButton" src={props.src} alt="gender" />
        <input
          id={props.id}
          name="gender"
          className="hidden"
          type="radio"
          value={props.value}
          defaultChecked={props.defaultChecked}
          // style={}
        ></input>
      </label>
    </div>
  );
}

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
      <div className="SearchBar">
        <input
          type="text"
          name="searchInput"
          className="SearchField"
          value={search}
          placeholder="Search for a name..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <GenderButton
          id="allGenders"
          src="./boy-and-girl.png"
          value=""
          defaultChecked={true}
          
        />
        <GenderButton
          id="male"
          src="./baby-boy.png"
          value="m"
          defaultChecked={false}
          
        />
        <GenderButton
          id="female"
          src="./baby-girl1.png"
          value="f"
          defaultChecked={false}
          
        />
      </div>
      <div id="favoriteList">
        <h2>
          Favorites:
          <span style={{ color: "grey" }}>
            {favorites.length === 0 &&
              " ...Click some names below to add to your shortlist..."}
          </span>
        </h2>
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
