import logo from './logo.svg';
import './App.css';
import ConcertTable from "./myFiles/TableForm";
import ConcertForm from "./myFiles/Form";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>

      <ConcertTable></ConcertTable>
        {/*<ConcertForm></ConcertForm>*/}
    </div>
  );
}

export default App;
