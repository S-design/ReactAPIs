import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./styles/History.css";


interface DownloadHistoryItem {
  dataset: string;
  timestamp: string;
}

export default function SearchHistory() {
  
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistoryItem[]>([]);
  const navigate = useNavigate();

  // Load history from localStorage
  useEffect(() => {
    
    const storedDownloadHistory = JSON.parse(localStorage.getItem("downloadHistory") || "[]");
    
    setDownloadHistory(storedDownloadHistory);
  }, []);


  // Clear download history
  const clearDownloadHistory = () => {
    localStorage.removeItem("downloadHistory");
    setDownloadHistory([]);
  };

  return (
    <div className="history-container">
      <button className="back-button" onClick={() => navigate("/")}>Back to Home</button>
      
      <h1>Download History</h1>

      <div className="history-section">
        <h2>Download History</h2>
        {downloadHistory.length > 0 ? (
          <ul className="history-list">
            {downloadHistory.map((item, index) => (
              <li key={index} className="history-item">
                <strong>Dataset:</strong> {item.dataset} <br />
                <span className="timestamp">{item.timestamp}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-history">No downloads yet.</p>
        )}
        <button className="clear-button" onClick={clearDownloadHistory}>Clear Download History</button>
      </div>
    </div>
  );
}
