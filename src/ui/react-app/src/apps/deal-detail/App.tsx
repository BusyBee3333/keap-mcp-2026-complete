import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import '../../styles/global.css';

export default function DealDetail() {
  const { callTool, loading, error } = useCallTool();
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const result = await callTool('keap_get_opportunity', {});
      setData(result);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  return (
    <div className="app-container">
      <h1>Deal Detail</h1>
      
      {error && <div className="error">{error}</div>}

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="card">
          <pre style={{ whiteSpace: 'pre-wrap', fontSize: '12px' }}>
            {JSON.stringify(data, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
