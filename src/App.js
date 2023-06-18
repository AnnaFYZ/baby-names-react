import babyNameList from "./babyNamesData.json";
import './App.css';

function NamesFilter () {
  return (
    <div id="nameList">
      {babyNameList
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((name) => {
          return <span className={name.sex}>{name.name}</span>;
        })}
    </div>
  );

}

function App() {
  return (
    <div className="App">
     <NamesFilter />
    </div>
  );
}

export default App;
