import React, { useState, useEffect } from 'react';
import { useCallTool } from '../../hooks/useCallTool';
import '../../styles/global.css';

export default function PipelineKanban() {
  const { callTool, loading } = useCallTool();
  const [opportunities, setOpportunities] = useState<any[]>([]);
  const [stages, setStages] = useState<any[]>([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [opps, stgs] = await Promise.all([
        callTool('keap_list_opportunities', { limit: 50 }),
        callTool('keap_list_opportunity_stage_pipeline', {}),
      ]);
      
      setOpportunities(opps?.opportunities || []);
      setStages(stgs?.stages || []);
    } catch (err) {
      console.error('Failed to load data:', err);
    }
  };

  const groupByStage = () => {
    const grouped: any = {};
    stages.forEach(stage => {
      grouped[stage.id] = opportunities.filter(opp => opp.stage?.id === stage.id);
    });
    return grouped;
  };

  const stageGroups = groupByStage();

  return (
    <div className="app-container">
      <h1>Sales Pipeline - Kanban Board</h1>
      
      {loading ? (
        <div className="loading">Loading pipeline...</div>
      ) : (
        <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '20px' }}>
          {stages.map(stage => (
            <div key={stage.id} className="card" style={{ minWidth: '300px', flex: '0 0 auto' }}>
              <h3>{stage.name}</h3>
              <div style={{ fontSize: '12px', color: '#999', marginBottom: '12px' }}>
                {stageGroups[stage.id]?.length || 0} deals
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {(stageGroups[stage.id] || []).map((opp: any) => (
                  <div key={opp.id} className="card" style={{ padding: '12px', background: '#2d2d30' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '4px' }}>
                      {opp.opportunity_title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#999' }}>
                      ${opp.projected_revenue_high || opp.projected_revenue_low || 0}
                    </div>
                    {opp.estimated_close_date && (
                      <div style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
                        Close: {new Date(opp.estimated_close_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
