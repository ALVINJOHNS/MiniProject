import './App.css';
import JoinPage from './Pages/JoinPage/JoinPage';
import VideoRoom from './Pages/VideoRoom/VideoRoom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {


  return (
    <Router>
    <div>
      <Routes>
        <Route exact path="/" element={<JoinPage/>}/>
        <Route path="/videoroom" element={<VideoRoom />} />
        
      </Routes>
    </div>
    </Router>
  );
}

export default App;

