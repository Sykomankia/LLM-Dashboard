export const fetchTokenUsage = async (): Promise<Array<{ timestamp: string; tokens: number }>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { timestamp: '2023-10-01T10:00:00Z', tokens: 1200 },
        { timestamp: '2023-10-01T10:05:00Z', tokens: 1500 },
        { timestamp: '2023-10-01T10:10:00Z', tokens: 1350 },
        { timestamp: '2023-10-01T10:15:00Z', tokens: 1600 },
      ]);
    }, 1000);
  });
};


export const fetchLatencyDistribution = async (): Promise<Array<{ latency_ms: number; request_count: number }>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { latency_ms: 100, request_count: 50 },
        { latency_ms: 200, request_count: 120 },
        { latency_ms: 300, request_count: 80 },
        { latency_ms: 400, request_count: 30 },
      ]);
    }, 1000);
  });
};


export const fetchCostAnalysis = async (): Promise<Array<{ model_name: string; cost: number }>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { model_name: 'GPT-4', cost: 450.75 },
        { model_name: 'Claude 2', cost: 320.5 },
        { model_name: 'Llama 2', cost: 150.25 },
      ]);
    }, 1000);
  });
};

