import React, { useState, useEffect, useContext } from 'react';
import { Card, Row, Col, Statistic, Progress, Table, Spin, Alert } from 'antd';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { getChatStatsApi } from '../../services/apiService';
import { AuthContext } from '../../components/auth.context';
import { useNavigate } from 'react-router-dom';
import "../../assets/styles/dashboard.css";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState(null);
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchStats = async () => {
      try {
        setLoading(true);
        const data = await getChatStatsApi();
        setStats(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setError('Failed to load dashboard data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [auth.isAuthenticated, navigate]);

  if (loading) {
    return (
      <div className="dashboard-loading">
        <Spin size="large" />
        <p>Loading dashboard data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-error">
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
        />
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={8}>
          <Card title="Conversation Statistics" className="dashboard-card">
            <Statistic
              title="Total Messages Sent"
              value={stats.totalMessages}
              className="dashboard-statistic"
            />
            <Statistic
              title="Conversations Started"
              value={stats.totalSessions || 0}
              className="dashboard-statistic"
            />
            <Statistic
              title="Average Messages Per Conversation"
              value={(stats.totalMessages / (stats.totalSessions || 1)).toFixed(1)}
              className="dashboard-statistic"
            />
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card title="Sentiment Distribution">
            {stats.sentimentDistribution && stats.sentimentDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={stats.sentimentDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    nameKey="sentiment"
                    label={({ sentiment, percent }) => `${sentiment} ${(percent * 100).toFixed(0)}%`}
                  >
                    {stats.sentimentDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p>No sentiment data available</p>
            )}
          </Card>
        </Col>

        <Col xs={24} sm={12} lg={8}>
          <Card title="Most Common Intents">
            {stats.intentDistribution && stats.intentDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={stats.intentDistribution.slice(0, 5)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="intent" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <p>No intent data available</p>
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;