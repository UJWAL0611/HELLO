import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { currencyAPI } from '../../services/api';
import { HistoricalDataResponse } from '../../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ExchangeRateChartProps {
  fromCurrency: string;
  toCurrency: string;
}

const ExchangeRateChart: React.FC<ExchangeRateChartProps> = ({
  fromCurrency,
  toCurrency
}) => {
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [period, setPeriod] = useState<number>(30);

  useEffect(() => {
    if (fromCurrency && toCurrency) {
      fetchHistoricalData();
    }
  }, [fromCurrency, toCurrency, period]);

  const fetchHistoricalData = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await currencyAPI.getHistoricalRates(
        fromCurrency,
        toCurrency,
        period
      );

      if (response.success && response.data) {
        const { historical } = response.data;
        
        const labels = historical.map(item => 
          new Date(item.date).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric'
          })
        );
        
        const rates = historical.map(item => item.rate);

        setChartData({
          labels,
          datasets: [
            {
              label: `${fromCurrency} to ${toCurrency}`,
              data: rates,
              borderColor: 'rgb(102, 126, 234)',
              backgroundColor: 'rgba(102, 126, 234, 0.1)',
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointBackgroundColor: 'rgb(102, 126, 234)',
              pointBorderColor: 'white',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        });
      } else {
        setError(response.message || 'Failed to fetch historical data');
      }
    } catch (error) {
      setError('Failed to load chart data');
    } finally {
      setLoading(false);
    }
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          font: {
            size: 14,
            weight: '600' as const,
          },
          color: '#374151',
        },
      },
      title: {
        display: true,
        text: `Exchange Rate Trend (${period} days)`,
        font: {
          size: 16,
          weight: '700' as const,
        },
        color: '#1f2937',
        padding: 20,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: 'white',
        bodyColor: 'white',
        borderColor: 'rgb(102, 126, 234)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Rate: ${context.parsed.y.toFixed(6)}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(156, 163, 175, 0.2)',
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return parseFloat(value).toFixed(4);
          },
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
  };

  const periodOptions = [
    { value: 7, label: '7 Days' },
    { value: 30, label: '30 Days' },
    { value: 90, label: '3 Months' },
    { value: 180, label: '6 Months' },
    { value: 365, label: '1 Year' },
  ];

  return (
    <div className="exchange-rate-chart">
      <div className="chart-header">
        <h3>Historical Exchange Rates</h3>
        <div className="period-selector">
          {periodOptions.map((option) => (
            <button
              key={option.value}
              className={`period-button ${period === option.value ? 'active' : ''}`}
              onClick={() => setPeriod(option.value)}
              disabled={loading}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="chart-container">
        {loading && (
          <div className="chart-loading">
            <span className="loading-spinner">⏳</span>
            Loading chart data...
          </div>
        )}

        {error && (
          <div className="chart-error">
            <span>📊</span>
            <p>{error}</p>
            <button onClick={fetchHistoricalData} className="retry-button">
              Try Again
            </button>
          </div>
        )}

        {chartData && !loading && !error && (
          <div className="chart-wrapper">
            <Line data={chartData} options={chartOptions} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRateChart;