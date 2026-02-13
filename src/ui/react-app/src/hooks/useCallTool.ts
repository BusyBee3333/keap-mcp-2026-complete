import { useState } from 'react';

export function useCallTool() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const callTool = async (name: string, args: any) => {
    setLoading(true);
    setError(null);

    try {
      // @ts-ignore - MCP SDK injected
      const result = await window.mcp?.callServerTool?.(name, args);
      setLoading(false);
      return result;
    } catch (err: any) {
      setError(err.message || 'Failed to call tool');
      setLoading(false);
      throw err;
    }
  };

  return { callTool, loading, error };
}
