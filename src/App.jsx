import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import TechnologyListPage from './pages/TechnologyListPage';
import TechnologyDetailPage from './pages/TechnologyDetailPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/technologies" element={<TechnologyListPage />} />
            <Route path="/technology/:techId" element={<TechnologyDetailPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
