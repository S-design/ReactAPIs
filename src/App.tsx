
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Details from "./components/screens/Details";
import EditionScreen from "./components/screens/EditionScreen";
import MainScreen from "./components/screens/MainScreen";
import SearchHistory from "./components/screens/SearchHistory";
import NavBar from "./components/Widgets/NavBar";
import Stars from "./components/effects/Stars";
import "./App.css";

export default function App() {
  return (

    <Router>
      <Stars />
      <NavBar />
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/dataset/:datasetId" element={<Details />} />
        <Route path="/dataset/:datasetId/edition/:edition" element={<EditionScreen />} />
        <Route path="/history" element={<SearchHistory />} />
      </Routes>
      
    </Router>
  );
}

