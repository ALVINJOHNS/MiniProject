import './App.css';
import VideoRoom from './Pages/VideoRoom/VideoRoom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {

  return (
    <Router>
    <div>
      <Routes>
        <Route path="/" element={<VideoRoom />} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;

