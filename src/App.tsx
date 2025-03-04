
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Details from "./components/screens/Details";
import EditionScreen from "./components/screens/EditionScreen";
import "./App.css";
import MainScreen from "./components/screens/MainScreen";
import SearchHistory from "./components/screens/SearchHistory";

export default function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/dataset/:datasetId" element={<Details />} />
        <Route path="/dataset/:datasetId/edition/:edition" element={<EditionScreen />} />
        <Route path="/history" element={<SearchHistory />} />
      </Routes>
    </Router>
  );
}

