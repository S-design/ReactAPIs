import React, { useState, useEffect } from "react";
import axios from "axios";
import DatasetSearch from "../Widgets/SearchBar";
import DatasetList from "../Widgets/DatasetList";
import "./styles/Main.css";

interface Dataset {
  id: string;
  title: string;
  description: string;
  release_frequency: string;
  links: {
    self: { href: string };
  };
}

const API_URL = "https://api.beta.ons.gov.uk/v1/datasets";

export default function MainScreen() {
  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<{ items: Dataset[] }>(API_URL)
      .then((response) => setDatasets(response.data.items))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredDatasets = datasets.filter((dataset) =>
    dataset.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dataset-container">
      <h1 className="dataset-title">Dataset Explorer</h1>
      <DatasetSearch searchTerm={searchTerm} onSearch={handleSearch} />
      <DatasetList datasets={filteredDatasets} />
    </div>
  );
}

