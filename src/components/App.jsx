import React, { useState, useEffect } from 'react';
import '../App.css';

function App() {
  const [site, setSite] = useState('');
  const [blockedSites, setBlockedSites] = useState([]);

  useEffect(() => {
    chrome.storage.sync.get({ blockedSites: [] }, (data) => {
      setBlockedSites(data.blockedSites);
    });
  }, []);

  const addSite = () => {
    if (site) {
      const updatedSites = [...blockedSites, site];
      chrome.storage.sync.set({ blockedSites: updatedSites }, () => {
        setBlockedSites(updatedSites);
        setSite('');
      });
    }
  };

  return (
    <div className="App">
      <h1>DistractionDeflect</h1>
      <input
        type="text"
        value={site}
        onChange={(e) => setSite(e.target.value)}
        placeholder="Enter site to block"
      />
      <button onClick={addSite}>Add</button>
      <ul>
        {blockedSites.map((site, index) => (
          <li key={index}>{site}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
