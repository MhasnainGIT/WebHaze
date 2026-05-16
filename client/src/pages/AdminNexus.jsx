import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import SEO from '../components/SEO';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminNexus = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('users');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const tabs = [
    { id: 'users', name: 'Users' },
    { id: 'contacts', name: 'Contacts' },
    { id: 'dashboards', name: 'Dashboards' },
    { id: 'pages', name: 'Pages' },
    { id: 'plans', name: 'Plans' },
    { id: 'transactions', name: 'Transactions' },
    { id: 'websites', name: 'Websites' }
  ];

  useEffect(() => {
    const isOwner = user?.email === 'mohdhasnain1544@gmail.com' || user?.email === 'webhaze.in@gmail.com';
    if (!authLoading && (!user || (user.role !== 'admin' && !isOwner))) {
      toast.error('Access restricted to administrative personnel.');
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    const isOwner = user?.email === 'mohdhasnain1544@gmail.com' || user?.email === 'webhaze.in@gmail.com';
    if (user && (user.role === 'admin' || isOwner)) {
      fetchData();
    }
  }, [activeTab, user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/admin/${activeTab}`);
      setData(res.data);
    } catch (error) {
      toast.error(`Failed to fetch ${activeTab} records.`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`)) return;
    try {
      await axios.delete(`/api/admin/${activeTab}/${id}`);
      toast.success(`${activeTab.slice(0, -1)} terminated.`);
      fetchData();
    } catch (error) {
      toast.error('Deletion failed.');
    }
  };

  const isOwner = user?.email === 'mohdhasnain1544@gmail.com' || user?.email === 'webhaze.in@gmail.com';
  if (authLoading || (user && user.role !== 'admin' && !isOwner)) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 text-white">
      <SEO title="Nexus Oversight | WebHaze Admin" description="Complete administrative oversight of WebHaze infrastructure." />
      
      <div className="container-site px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-12 mb-20">
            <div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-6 leading-[0.9]">
                SYSTEM <span className="text-white/20">OVERSIGHT.</span>
              </h1>
              <div className="flex items-center gap-4">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                  Nexus Protocol Active: Connected to Core
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap bg-white/5 p-1 rounded-full border border-white/10 max-w-fit overflow-x-auto no-scrollbar">
              {tabs.map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all whitespace-nowrap ${activeTab === tab.id ? 'bg-white !text-black' : 'text-white/40 hover:text-white'}`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8 flex justify-between items-center">
            <h2 className="text-2xl font-black uppercase tracking-tighter">
              {activeTab} <span className="text-white/20 text-sm ml-2">{data.length} records</span>
            </h2>
            {(activeTab === 'pages' || activeTab === 'plans') && (
              <button className="px-8 py-3 bg-white !text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-white/90 transition-all">
                Add {activeTab.slice(0, -1)}
              </button>
            )}
          </div>

          {loading ? (
            <div className="py-40 text-center glass-card border-white/5">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-6"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Syncing with Central Intelligence...</p>
            </div>
          ) : (
            <motion.div
              layout
              className="glass-card border-white/5 overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-white/10">
                      {activeTab === 'users' && (
                        <>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Identity</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Email</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Role / Plan</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Actions</th>
                        </>
                      )}
                      {activeTab === 'contacts' && (
                        <>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Sender</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Subject / Intent</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Actions</th>
                        </>
                      )}
                      {activeTab === 'dashboards' && (
                        <>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Owner</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Stats</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Last Uplink</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Actions</th>
                        </>
                      )}
                      {activeTab === 'pages' && (
                        <>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Slug / Title</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Summary</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Actions</th>
                        </>
                      )}
                      {activeTab === 'plans' && (
                        <>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Plan Name</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Price</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Limits</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Actions</th>
                        </>
                      )}
                      {activeTab === 'transactions' && (
                        <>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">ID / Status</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">User</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Amount</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Actions</th>
                        </>
                      )}
                      {activeTab === 'websites' && (
                        <>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Domain / Name</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Owner</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Status</th>
                          <th className="px-8 py-6 text-[9px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Actions</th>
                        </>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((item) => (
                      <tr key={item._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                        {activeTab === 'users' && (
                          <>
                            <td className="px-8 py-6">
                              <p className="font-black text-white uppercase">{item.name}</p>
                              <p className="text-[9px] text-white/20 tracking-widest">ID: {item._id.slice(-8)}</p>
                            </td>
                            <td className="px-8 py-6 text-sm text-white/40">{item.email}</td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest mr-2 ${item.role === 'admin' ? 'bg-red-500/20 text-red-500' : 'bg-white/10 text-white/40'}`}>
                                {item.role}
                              </span>
                              <span className="text-[8px] font-black uppercase tracking-widest text-white/60">{item.plan}</span>
                            </td>
                          </>
                        )}
                        {activeTab === 'contacts' && (
                          <>
                            <td className="px-8 py-6">
                              <p className="font-black text-white uppercase">{item.name}</p>
                              <p className="text-[9px] text-white/20 tracking-widest">{item.email}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="font-black text-white/80 uppercase text-xs mb-1">{item.subject}</p>
                              <p className="text-sm text-white/30 line-clamp-1 max-w-sm">{item.message}</p>
                            </td>
                          </>
                        )}
                        {activeTab === 'dashboards' && (
                          <>
                            <td className="px-8 py-6">
                              <p className="font-black text-white uppercase">{item.userId?.name || 'Unknown'}</p>
                              <p className="text-[9px] text-white/20 tracking-widest">{item.userId?.email}</p>
                            </td>
                            <td className="px-8 py-6 text-sm text-white/40">
                              {item.websites?.length || 0} Sites • {item.totalVisitors || 0} Visitors
                            </td>
                            <td className="px-8 py-6 text-xs text-white/20 uppercase tracking-widest">
                              {new Date(item.updatedAt).toLocaleDateString()}
                            </td>
                          </>
                        )}
                        {activeTab === 'pages' && (
                          <>
                            <td className="px-8 py-6">
                              <p className="font-black text-white uppercase">/{item.slug}</p>
                              <p className="text-[9px] text-white/20 tracking-widest">{item.title}</p>
                            </td>
                            <td className="px-8 py-6 text-sm text-white/40 max-w-xs truncate">{item.summary}</td>
                          </>
                        )}
                        {activeTab === 'plans' && (
                          <>
                            <td className="px-8 py-6 font-black text-white uppercase">{item.name}</td>
                            <td className="px-8 py-6 font-black text-white/60 uppercase text-xs">${item.basePrice}/{item.billingCycle}</td>
                            <td className="px-8 py-6 text-[9px] text-white/30 uppercase tracking-widest">
                              {item.features?.websites} Sites • {item.features?.storage}GB
                            </td>
                          </>
                        )}
                        {activeTab === 'transactions' && (
                          <>
                            <td className="px-8 py-6">
                              <p className="font-black text-white uppercase text-xs">{item.status}</p>
                              <p className="text-[9px] text-white/20 tracking-widest">REF: {item.transactionId || item._id.slice(-12)}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="text-sm text-white/60">{item.userId?.email || 'N/A'}</p>
                            </td>
                            <td className="px-8 py-6 font-black text-white uppercase text-xs">${item.amount}</td>
                          </>
                        )}
                        {activeTab === 'websites' && (
                          <>
                            <td className="px-8 py-6">
                              <p className="font-black text-white uppercase">{item.domain}</p>
                              <p className="text-[9px] text-white/20 tracking-widest">{item.name}</p>
                            </td>
                            <td className="px-8 py-6 text-sm text-white/40">{item.userId?.email || 'Anonymous'}</td>
                            <td className="px-8 py-6">
                              <span className="px-3 py-1 bg-green-500/10 text-green-500 rounded-full text-[8px] font-black uppercase tracking-widest">
                                {item.status}
                              </span>
                            </td>
                          </>
                        )}
                        
                        <td className="px-8 py-6 text-right">
                          <div className="flex justify-end gap-6">
                            {(activeTab === 'pages' || activeTab === 'plans') && (
                              <button className="text-[9px] font-black uppercase tracking-[0.2em] text-white/30 hover:text-white transition-all">Edit</button>
                            )}
                            <button 
                              onClick={() => handleDelete(item._id)}
                              className="text-[9px] font-black uppercase tracking-[0.2em] text-red-500/50 hover:text-red-500 transition-all"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              {!loading && data.length === 0 && (
                <div className="py-32 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic">"The database is silent. No records detected."</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNexus;
