import babyNameList from "./babyNamesData.json";
import './App.css';
import { useState } from "react";

function GenderButton (props) {
   
  return (
    <div>
      <label
        className={props.selectedOption === props.value ? "Label-active" : ""}
      >
        <img className="genderButton" src={props.src} alt="gender" />
        <input
          id={props.id}
          name="gender"
          className="hidden"
          type="radio"
          value={props.value}
          checked={props.selectedOption === props.value}
          onChange={() => props.onRadioChange(props.value)}
        />
      </label>
    </div>
  );
}

function NamesFilter (props) {
  const [listToDisplay, setListToDisplay] = useState(props.list)
  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [selected, setSelected] = useState("all");

  const handleRadioChange = (event) => {
    setSelected(event);
  };

  function filterForGender(item) {
    if (selected === "all") {
      return item;
    } else {
      return item.sex === selected;
    }
  }
  
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
          value="all"
          selectedOption={selected}
          onRadioChange={handleRadioChange}
        />
        <GenderButton
          id="male"
          src="./baby-boy.png"
          value="m"
          selectedOption={selected}
          onRadioChange={handleRadioChange}
        />
        <GenderButton
          id="female"
          src="./baby-girl1.png"
          value="f"
          selectedOption={selected}
          onRadioChange={handleRadioChange}
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
          .filter(filterForGender)
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
          .filter(filterForGender)
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
