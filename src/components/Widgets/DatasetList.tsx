
import { useNavigate } from "react-router-dom";
import "./styles/DatasetList.css";

interface Dataset {
  id: string;
  title: string;
  description: string;
  release_frequency: string;
  links: {
    self: { href: string };
  };
}

interface DatasetListProps {
  datasets: Dataset[];
}

export default function DatasetList({ datasets }: DatasetListProps) {
  const navigate = useNavigate();

  return (
    <div className="dataset-list">
      {datasets.map((dataset) => (
        <div
          key={dataset.id}
          className="dataset-item"
          onClick={() => navigate(`/dataset/${dataset.id}`)} 
        >
          <h2 className="dataset-title">{dataset.title}</h2>
          <p className="dataset-description">{dataset.description}</p>
        </div>
      ))}
    </div>
  );
}
