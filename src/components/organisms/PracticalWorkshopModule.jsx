import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { Tooltip } from '../atoms/Tooltip';
import { CheckCircle2, Circle, ExternalLink, ShieldAlert, Smartphone, Layout, LineChart, CreditCard, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const PracticalWorkshopModule = () => {
  const { t } = useLanguage();
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (id) => {
    setCompletedSteps(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const steps = [
    {
      id: 'step1',
      title: t('mod4.step1Title'),
      desc: t('mod4.step1Desc'),
      icon: <Smartphone className="text-blue-400" />,
      link: "https://crypto.com/app/zwe7x29wqb",
    },
    {
      id: 'step2',
      title: t('mod4.step2Title'),
      desc: t('mod4.step2Desc'),
      icon: <ShieldCheck className="text-purple-400" />,
      link: "https://phantom.app/",
    },
    {
      id: 'step3',
      title: t('mod4.step3Title'),
      desc: t('mod4.step3Desc'),
      icon: <Layout className="text-blue-500" />,
      link: "https://www.tradingview.com/",
    },
    {
      id: 'step4',
      title: t('mod4.step4Title'),
      desc: t('mod4.step4Desc'),
      icon: <LineChart className="text-cyan-400" />,
      link: "https://www.bitget.com/",
    },
    {
      id: 'step5',
      title: t('mod4.step5Title'),
      desc: t('mod4.step5Desc'),
      icon: <CreditCard className="text-sol-green" />,
      link: "https://lnk.monabit.io/9NLuJmleH4",
    }
  ];

  const totalCompleted = Object.values(completedSteps).filter(Boolean).length;
  const progress = (totalCompleted / steps.length) * 100;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 pb-20"
    >
      <div className="space-y-4 text-center md:text-left">
        <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-400 to-sol-green inline-block">
          {t('mod4.title')}
        </h2>
        <p className="text-gray-400 text-lg">{t('mod4.subtitle')}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Sidebar Progress */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-gray-800 bg-gray-900/40 p-6 sticky top-24">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <CheckCircle2 className="text-sol-green" size={20} />
              {t('mod4.checklistTitle')}
            </h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-end mb-2">
                <span className="text-xs font-black text-gray-500 uppercase tracking-tighter">Engagement Score</span>
                <span className="text-2xl font-black text-sol-green">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-sol-green"
                />
              </div>

              <div className="pt-6 space-y-3">
                {steps.map(step => (
                  <div key={step.id} className="flex items-center gap-3">
                    {completedSteps[step.id] ? (
                      <CheckCircle2 size={16} className="text-sol-green" />
                    ) : (
                      <Circle size={16} className="text-gray-700" />
                    )}
                    <span className={`text-xs font-bold ${completedSteps[step.id] ? 'text-gray-300' : 'text-gray-600'}`}>
                      {step.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 p-4 bg-red-500/5 border border-red-500/20 rounded-xl">
               <div className="flex items-center gap-2 text-red-500 mb-2">
                 <ShieldAlert size={18} />
                 <span className="text-sm font-black uppercase tracking-tighter">{t('mod4.warningTitle')}</span>
               </div>
               <p className="text-[10px] text-red-200/60 leading-relaxed font-medium">
                 {t('mod4.warningDesc')}
               </p>
            </div>
          </Card>
        </div>

        {/* Steps List */}
        <div className="lg:col-span-2 space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`group border-2 transition-all duration-300 ${completedSteps[step.id] ? 'border-sol-green/30 bg-sol-green/5' : 'border-gray-800 hover:border-gray-600'}`}>
                <div className="flex flex-col md:flex-row gap-6 p-2">
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${completedSteps[step.id] ? 'bg-sol-green/20' : 'bg-gray-800'}`}>
                    {React.cloneElement(step.icon, { size: 32 })}
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    <div className="flex justify-between items-start">
                      <h4 className={`text-xl font-bold transition-colors ${completedSteps[step.id] ? 'text-sol-green' : 'text-white'}`}>
                        {step.title}
                      </h4>
                      <input 
                        type="checkbox"
                        checked={!!completedSteps[step.id]}
                        onChange={() => toggleStep(step.id)}
                        className="w-6 h-6 rounded-lg accent-sol-green cursor-pointer"
                      />
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.desc}
                    </p>
                    
                    <div className="pt-4 flex items-center gap-4">
                      <a 
                        href={step.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-xs font-black text-blue-400 uppercase tracking-widest hover:text-blue-300 transition-colors"
                      >
                        {t('mod4.btnAction')}
                        <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
