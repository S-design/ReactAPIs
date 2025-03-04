
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import GDDScreen from "./components/screens/GDDscreen";
import Details from "./components/GDD/Details";
import EditionScreen from "./components/screens/EditionScreen";
import "./App.css";

import Navigation from "./components/Navigation";

export default function App() {
  return (

    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<GDDScreen />} />
        <Route path="/dataset/:datasetId" element={<Details />} />
        <Route path="/dataset/:datasetId/edition/:edition" element={<EditionScreen />} />
      </Routes>
    </Router>
  );
}

