import { useState, useEffect } from 'react';

export const usePortfolioData = (portfolioFile = 'portfolio-data.json') => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/${portfolioFile}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const portfolioData = await response.json();
        setData(portfolioData);
        setError(null);
      } catch (err) {
        console.error('Error fetching portfolio data:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [portfolioFile]);

  return { data, loading, error };
};