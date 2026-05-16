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
  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      toast.error('Access restricted to administrative personnel.');
      navigate('/');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchData();
    }
  }, [activeTab, user]);

  if (authLoading || (user && user.role !== 'admin')) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
      </div>
    );
  }

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'users') {
        const res = await axios.get('/api/auth/users');
        setUsers(res.data);
      } else {
        const res = await axios.get('/api/contact');
        setMessages(res.data);
      }
    } catch (error) {
      toast.error('Failed to fetch data from Nexus.');
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Terminate this user account?')) return;
    try {
      await axios.delete(`/api/auth/users/${id}`);
      toast.success('User account terminated.');
      fetchData();
    } catch (error) {
      toast.error('Failed to terminate account.');
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Purge this message?')) return;
    try {
      await axios.delete(`/api/contact/${id}`);
      toast.success('Message purged.');
      fetchData();
    } catch (error) {
      toast.error('Failed to purge message.');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20 text-white">
      <SEO title="Admin Nexus | WebHaze Central" description="Administrative control center for WebHaze infrastructure." />
      
      <div className="container-site">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
            <div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-4">
                CENTRAL <span className="text-white/20">NEXUS.</span>
              </h1>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/30">
                Administrative Oversight Protocol Active
              </p>
            </div>
            
            <div className="flex bg-white/5 p-1 rounded-full border border-white/10">
              <button 
                onClick={() => setActiveTab('users')}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'users' ? 'bg-white !text-black' : 'text-white/50 hover:text-white'}`}
              >
                Users
              </button>
              <button 
                onClick={() => setActiveTab('messages')}
                className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all ${activeTab === 'messages' ? 'bg-white !text-black' : 'text-white/50 hover:text-white'}`}
              >
                Messages
              </button>
            </div>
          </div>

          {loading ? (
            <div className="py-40 text-center">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Syncing with Core...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="glass-card border-white/5 overflow-hidden"
              >
                {activeTab === 'users' ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Identity</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Email</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Plan</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map((user) => (
                          <tr key={user._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                            <td className="px-8 py-6">
                              <p className="font-black tracking-tight text-white uppercase">{user.name}</p>
                              <p className="text-[10px] text-white/30 tracking-widest uppercase">ID: {user._id.slice(-8)}</p>
                            </td>
                            <td className="px-8 py-6 text-sm font-medium text-white/60">{user.email}</td>
                            <td className="px-8 py-6">
                              <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${user.plan === 'Enterprise' ? 'bg-white !text-black' : 'bg-white/10 text-white'}`}>
                                {user.plan}
                              </span>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <button 
                                onClick={() => deleteUser(user._id)}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/50 hover:text-red-500 transition-all"
                              >
                                Terminate
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Sender</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Subject / Message</th>
                          <th className="px-8 py-6 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {messages.map((msg) => (
                          <tr key={msg._id} className="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                            <td className="px-8 py-6">
                              <p className="font-black tracking-tight text-white uppercase">{msg.name}</p>
                              <p className="text-[10px] text-white/30 tracking-widest uppercase">{msg.email}</p>
                              <p className="text-[10px] text-white/30 tracking-widest uppercase">{msg.phone}</p>
                            </td>
                            <td className="px-8 py-6">
                              <p className="font-black text-white uppercase mb-2 text-sm">{msg.subject}</p>
                              <p className="text-sm text-white/40 max-w-md line-clamp-2">{msg.message}</p>
                            </td>
                            <td className="px-8 py-6 text-right">
                              <button 
                                onClick={() => deleteMessage(msg._id)}
                                className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500/50 hover:text-red-500 transition-all"
                              >
                                Purge
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {!loading && (activeTab === 'users' ? users : messages).length === 0 && (
                  <div className="py-20 text-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">No data records found.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminNexus;
