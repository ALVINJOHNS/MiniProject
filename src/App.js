import GridView from "./Components/GridView/GridView";
import './App.css';
import {useState} from 'react';

function App() {
  const [n, setN] = useState(1);
  return (
    <div className="Main-Div">
      <div className="Grid-Div">
        <GridView n={n} />
        <button onClick={()=>{setN(n+1)}}>add</button>
      </div>
    </div>
  );
}

export default App;
