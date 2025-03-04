import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import axios from "axios";
import "./styles/Details.css";

interface LatestVersion {
  id: string;
  edition: string;
  version: string;
  release_date: string;
  downloads: {
    [key: string]: {
      href: string;
    };
  };
}

interface DatasetDetails {
  id: string;
  title: string;
  description: string;
  release_frequency: string;
  links?: {
    latest_version?: {
      href: string;
    };
  };
}

export default function Details() {
  const { datasetId } = useParams<{ datasetId: string }>();
  const [dataset, setDataset] = useState<DatasetDetails | null>(null);
  const [latestVersion, setLatestVersion] = useState<LatestVersion | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_URL = `https://api.beta.ons.gov.uk/v1/datasets/${datasetId}`;

  useEffect(() => {
    axios
      .get<DatasetDetails>(API_URL)
      .then((response) => {
        console.log("Dataset API Response:", response.data);
        setDataset(response.data);
        setLoading(false);

        // If latest version link is present, fetch latest version details
        if (response.data.links?.latest_version?.href) {
          fetchLatestVersion(response.data.links.latest_version.href);
        }
      })
      .catch((error) => {
        console.error("Error fetching dataset details:", error);
        setError("Failed to load dataset details.");
        setLoading(false);
      });
  }, [datasetId]);



  // Function to fetch latest version details
  const fetchLatestVersion = (latestVersionUrl: string) => {
    axios
      .get<LatestVersion>(latestVersionUrl)
      .then((response) => {
        console.log("Latest Version API Response:", response.data);
        setLatestVersion(response.data);
      })
      .catch((error) => {
        console.error("Error fetching latest version details:", error);
      });
  };

  if (loading) return <p>Loading dataset details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!dataset) return <p>No dataset found.</p>;

  return (
    <div className="dataset-details">
      <h1>{dataset.title}</h1>
      <p>{dataset.description}</p>
      <p><strong>Release Frequency:</strong> {dataset.release_frequency}</p>

      <h2>Latest Edition</h2>
      {latestVersion ? (
        <div className="latest-version">
          <p><strong>Edition:</strong> {latestVersion.edition}</p>
          <p><strong>Version:</strong> {latestVersion.version}</p>
          <p><strong>Release Date:</strong> {latestVersion.release_date || "Unknown"}</p>

          {/* Show download links if available */}
          {latestVersion.downloads && (
            <div>
              <h3>Download Data:</h3>
              <ul>
                {Object.entries(latestVersion.downloads).map(([format, link], index) => (
                  <li key={index}>
                    <a href={link.href} target="_blank" rel="noopener noreferrer">
                      {format.toUpperCase()}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>No latest version available.</p>
      )}
      <button
        className="view-editions-button"
        onClick={() => {
          if (latestVersion?.edition) {
            navigate(`/dataset/${datasetId}/edition/${latestVersion.edition}`);
          } else {
            console.warn("No latest version available.");
          }
        }}
      >
        View The Versions
      </button>

    </div>
  );
}
