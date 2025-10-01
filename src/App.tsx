import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { SoundSearch } from './components/SoundSearch/SoundSearch';
import { Favorites } from './components/Favorites/Favorites';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SoundSearch />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </Router>
  );
};

export default App;
