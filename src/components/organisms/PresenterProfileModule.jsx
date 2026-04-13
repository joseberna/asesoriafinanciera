import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { Tooltip } from '../atoms/Tooltip';
import { 
  GraduationCap, 
  Award, 
  FileText, 
  Download, 
  User, 
  ShieldCheck, 
  TrendingUp, 
  Globe, 
  Cpu,
  Link as LinkIcon
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const PresenterProfileModule = () => {
  const { t } = useLanguage();

  const certificates = [
    {
      id: 'cert1',
      title: t('profile.eduCert'),
      institution: "Plan B Network",
      year: "2026",
      file: "/pdf/certificate-formacion-educadores-BTC.pdf",
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 'cert2',
      title: t('profile.diplomaBtc'),
      institution: "Bitcoin Academy",
      year: "2026",
      file: "/pdf/diplomadoBTC.pdf",
      color: "from-btc-orange to-yellow-500"
    }
  ];

  const skills = [
    { name: t('profile.skill1'), icon: <TrendingUp size={20} /> },
    { name: t('profile.skill2'), icon: <ShieldCheck size={20} /> },
    { name: t('profile.skill3'), icon: <Globe size={20} /> },
    { name: t('profile.skill4'), icon: <Cpu size={20} /> },
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-12 pb-20"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-btc-orange/20 to-sol-green/20 blur-3xl rounded-full -z-10 opacity-30"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 md:items-start text-center md:text-left">
          <div className="relative group">
            <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-btc-orange to-sol-green p-1 transition-transform duration-500 group-hover:scale-105 shadow-[0_0_30px_rgba(247,147,26,0.2)]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden border-4 border-black">
                <img 
                  src="/pic.jpeg" 
                  alt="Jose Fernando Berna" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale hover:grayscale-0"
                />
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 bg-btc-orange text-black p-2 rounded-lg shadow-xl translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all z-20">
              <ShieldCheck size={20} />
            </div>
          </div>

          <div className="flex-1 space-y-4 pt-4">
             <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">
               Jose Fernando Berna
             </h2>
             <p className="text-btc-orange text-xl font-bold font-mono tracking-widest uppercase">
               Strategic Financial Advisor & BTC Educator
             </p>
             <p className="text-gray-400 text-lg max-w-2xl leading-relaxed italic">
               "{t('profile.subtitle')}"
             </p>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Info Column */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border-gray-800 bg-gray-900/40 p-6 space-y-6 overflow-hidden relative group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <GraduationCap size={120} />
             </div>
             
             <div className="space-y-4 relative z-10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                   <GraduationCap className="text-btc-orange" size={24} />
                   {t('profile.academicTitle')}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                   {t('profile.academicDesc')}
                </p>
             </div>

             <div className="pt-6 border-t border-gray-800 space-y-4">
                <h4 className="text-xs font-black text-gray-500 uppercase tracking-widest">{t('profile.skillsTitle')}</h4>
                <div className="grid grid-cols-1 gap-3">
                   {skills.map((skill, i) => (
                     <div key={i} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5 hover:border-btc-orange/30 transition-colors">
                        <span className="text-btc-orange">{skill.icon}</span>
                        <span className="text-xs font-bold text-gray-300">{skill.name}</span>
                     </div>
                   ))}
                </div>
             </div>
          </Card>
        </div>

        {/* Certificates Column */}
        <div className="lg:col-span-2 space-y-6">
           <div className="flex items-center gap-4 mb-2">
              <Award className="text-sol-green" size={24} />
              <h3 className="text-2xl font-black text-white tracking-tight uppercase">
                {t('profile.certTitle')}
              </h3>
           </div>
           
           <div className="grid md:grid-cols-2 gap-6">
              {certificates.map((cert) => (
                <Card key={cert.id} className="group border-gray-800 bg-gray-900/60 hover:bg-gray-900/80 transition-all duration-300 overflow-hidden relative">
                   <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${cert.color}`}></div>
                   
                   <div className="p-6 space-y-6 flex flex-col h-full">
                      <div className="flex justify-between items-start">
                         <div className="p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
                            <FileText size={32} className="text-gray-400 group-hover:text-btc-orange transition-colors" />
                         </div>
                         <span className="bg-white/5 px-2 py-1 rounded text-[10px] font-bold text-gray-500">{cert.year}</span>
                      </div>

                      <div className="flex-1">
                         <h4 className="text-lg font-bold text-white leading-tight mb-2 uppercase tracking-tighter">
                            {cert.title}
                         </h4>
                         <p className="text-sm font-bold text-btc-orange opacity-70">
                            {cert.institution}
                         </p>
                      </div>

                      <div className="flex gap-3">
                         <a 
                           href={cert.file} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="flex-1"
                         >
                            <Button variant="outline" size="sm" className="w-full text-[10px] font-black tracking-widest uppercase">
                               <LinkIcon size={12} className="mr-2" />
                               {t('profile.viewPdf')}
                            </Button>
                         </a>
                         <Tooltip content={t('profile.download')}>
                            <a href={cert.file} download>
                               <Button variant="ghost" size="sm" className="px-3">
                                  <Download size={14} className="text-gray-500 hover:text-white" />
                               </Button>
                            </a>
                         </Tooltip>
                      </div>
                   </div>
                </Card>
              ))}
           </div>

           <Card className="border-gray-800 bg-gradient-to-br from-gray-900 to-black p-8 relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-btc-orange/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                 <div className="w-16 h-16 rounded-2xl bg-btc-orange/10 flex items-center justify-center text-btc-orange">
                    <ShieldCheck size={40} />
                 </div>
                 <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-black text-white mb-2">{t('profile.bitcoinTitle')}</h4>
                    <p className="text-gray-400 text-sm leading-relaxed max-w-xl">
                       {t('profile.bitcoinDesc')}
                    </p>
                 </div>
              </div>
           </Card>
        </div>
      </div>
    </motion.div>
  );
};
