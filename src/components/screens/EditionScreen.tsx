import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


interface Version {
  id: string;
  version: string;
  release_date: string;
  downloads: {
    [key: string]: { href: string };
  };
}

export default function EditionVersionsScreen() {
  const { datasetId, edition } = useParams<{ datasetId: string; edition: string }>();
  const [versions, setVersions] = useState<Version[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const versionsPerPage = 10; 
  const navigate = useNavigate();

  const API_URL = `https://api.beta.ons.gov.uk/v1/datasets/${datasetId}/editions/${edition}/versions`;

  useEffect(() => {
    axios
      .get<{ items: Version[] }>(API_URL)
      .then((response) => {
        console.log("Versions API Response:", response.data);
        setVersions(response.data.items);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching versions:", error);
        setError("Failed to load versions.");
        setLoading(false);
      });
  }, [datasetId, edition]);


  const totalPages = Math.ceil(versions.length / versionsPerPage);
  const startIndex = (currentPage - 1) * versionsPerPage;
  const displayedVersions = versions.slice(startIndex, startIndex + versionsPerPage);

  if (loading) return <p>Loading versions...</p>;
  if (error) return <p className="error">{error}</p>;
  if (versions.length === 0) return <p>No versions available.</p>;

  return (
    <div className="versions-container">
      <button className="back-button" onClick={() => navigate(`/dataset/${datasetId}`)}>
        Back to Latest Edition
      </button>

      <h1>Versions for {edition}</h1>

      <ul className="versions-list">
        {displayedVersions.map((version) => (
          <li key={version.id} className="version-item">
            <strong>Version:</strong> {version.version} <br />
            <strong>Release Date:</strong> {version.release_date || "Unknown"} <br />
            <h3>Download Data:</h3>
            <ul>
              {Object.entries(version.downloads).map(([format, link], index) => (
                <li key={index}>
                  <a href={link.href} target="_blank" rel="noopener noreferrer">
                    {format.toUpperCase()}
                  </a>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>

      {/* Pagination Controls */}
      <div className="pagination-controls">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
