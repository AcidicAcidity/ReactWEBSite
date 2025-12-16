// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import TechnologyListPage from './pages/TechnologyListPage';
import TechnologyDetailPage from './pages/TechnologyDetailPage';
import DataImportExport from './pages/DataImportExport';

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
            <Route path="/data" element={<DataImportExport />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
