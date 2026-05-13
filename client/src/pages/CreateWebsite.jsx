import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const CreateWebsite = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    template: '',
    plan: ''
  });
  const navigate = useNavigate();

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Simulate deployment
      alert('Node deployment initialized. Redirecting to terminal.');
      navigate('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-black pt-32 pb-20">
      <SEO 
        title="Provision New Node | WebHaze Deployment"
        description="Initialize a new website node on the WebHaze infrastructure. Choose your template and deployment plan."
      />
      
      <div className="container-site">
        <div className="max-w-4xl mx-auto">
          <div className="mb-20 text-center">
            <motion.h1 
              className="text-5xl md:text-7xl font-black mb-6 tracking-tighter"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              PROVISION <span className="text-white/20">NODE.</span>
            </motion.h1>
            <div className="flex justify-center gap-4">
              {[1, 2, 3].map((i) => (
                <div 
                  key={i} 
                  className={`h-1 w-12 rounded-full transition-all duration-500 ${i <= step ? 'bg-white' : 'bg-white/10'}`} 
                />
              ))}
            </div>
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card border-white/5"
          >
            {step === 1 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black tracking-tight uppercase">01. Initialization</h2>
                <div>
                  <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-4">Project Label</label>
                  <input 
                    type="text" 
                    placeholder="Enter node identifier"
                    className="form-input"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black tracking-tight uppercase">02. Architecture</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {['Minimalist', 'Enterprise', 'Dynamic', 'Industrial'].map((t) => (
                    <button
                      key={t}
                      onClick={() => setFormData({...formData, template: t})}
                      className={`p-10 rounded-2xl border text-left transition-all ${
                        formData.template === t 
                          ? 'border-white bg-white/5' 
                          : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      <p className="text-xl font-black tracking-tight uppercase">{t}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <h2 className="text-3xl font-black tracking-tight uppercase">03. Deployment</h2>
                <div className="space-y-4">
                  {['Shared', 'Litespeed', 'Dedicated'].map((p) => (
                    <button
                      key={p}
                      onClick={() => setFormData({...formData, plan: p})}
                      className={`w-full p-8 rounded-2xl border flex items-center justify-between transition-all ${
                        formData.plan === p 
                          ? 'border-white bg-white/5' 
                          : 'border-white/5 hover:border-white/10'
                      }`}
                    >
                      <span className="text-xl font-black tracking-tight uppercase">{p} Node</span>
                      {formData.plan === p && (
                        <div className="w-3 h-3 rounded-full bg-white animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-12 flex justify-between">
              {step > 1 && (
                <button 
                  onClick={() => setStep(step - 1)}
                  className="btn-secondary"
                >
                  Previous Phase
                </button>
              )}
              <button 
                onClick={handleNext}
                className="btn-primary ml-auto px-12"
              >
                {step === 3 ? 'Initialize Deployment' : 'Proceed to Next Phase'}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CreateWebsite;