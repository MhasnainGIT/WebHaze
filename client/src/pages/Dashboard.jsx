import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const [websites, setWebsites] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWebsites();
  }, []);

  const fetchWebsites = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }

      const response = await fetch('/api/websites', {
        headers: {
          'Authorization': 'Bearer ' + token
        }
      });

      if (response.ok) {
        const data = await response.json();
        const websiteData = data.data || [];
        setWebsites(websiteData);
        
        const total = websiteData.length;
        const published = websiteData.filter(w => w.status === 'published').length;
        const drafts = websiteData.filter(w => w.status === 'draft').length;
        
        setStats({ total, published, drafts });
      }
    } catch (error) {
      console.error('Error fetching websites:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ icon, title, value, color }) => {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center">
          <div className={'w-12 h-12 ' + color + ' rounded-lg flex items-center justify-center'}>
            {icon}
          </div>
          <div className="ml-4">
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="container-site py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage your websites and track your progress</p>
          </div>
          <Link to="/pricing" className="btn-primary">
            Create Website
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <StatCard
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
              </svg>
            }
            title="Total Websites"
            value={stats.total}
            color="bg-blue-500"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            }
            title="Published"
            value={stats.published}
            color="bg-green-500"
          />
          <StatCard
            icon={
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            title="Drafts"
            value={stats.drafts}
            color="bg-yellow-500"
          />
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Your Websites</h2>
          </div>
          <div className="p-6">
            {websites.length > 0 ? (
              <div className="grid gap-4">
                {websites.map((website) => {
                  const statusClass = website.status === 'published' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800';
                  
                  return (
                    <div
                      key={website._id}
                      className="bg-gray-50 rounded-lg p-4 flex items-center justify-between hover:bg-gray-100 transition-colors"
                    >
                      <div>
                        <h3 className="font-semibold text-gray-900">{website.title}</h3>
                        <p className="text-sm text-gray-600">{website.domain}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={'px-2 py-1 rounded-full text-xs font-medium ' + statusClass}>
                          {website.status}
                        </span>
                        <button className="text-primary hover:text-blue-700">
                          Edit
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No websites yet</h3>
                <p className="text-gray-600 mb-6">Create your first website to get started with WebHaze.</p>
                <Link to="/pricing" className="btn-primary">
                  Create Your First Website
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;