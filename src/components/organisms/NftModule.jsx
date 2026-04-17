import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { Tooltip } from '../atoms/Tooltip';
import { Button } from '../atoms/Button';
import { 
  Diamond, 
  LayoutGrid, 
  Image as ImageIcon, 
  FileText, 
  CheckCircle, 
  Home, 
  Palette, 
  Ticket, 
  ShieldCheck,
  Cpu,
  RefreshCw,
  ExternalLink
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const NftModule = () => {
  const { t } = useLanguage();
  
  // Simulator State
  const [assetType, setAssetType] = useState('house');
  const [fractions, setFractions] = useState(100);
  const [isMinting, setIsMinting] = useState(false);
  const [isMinted, setIsMinted] = useState(false);

  const assets = {
    house: { name: t('mod6.assetHouse'), icon: Home, color: '#FCD34D', address: '0x71C...a4f' },
    art: { name: t('mod6.assetArt'), icon: Palette, color: '#F472B6', address: '0x32A...c92' },
    gold: { name: t('mod6.assetGold'), icon: Diamond, color: '#FBBF24', address: '0x9dE...1b8' },
  };

  const handleMint = () => {
    setIsMinting(true);
    setTimeout(() => {
      setIsMinting(false);
      setIsMinted(true);
    }, 2000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-16 pb-20"
    >
      {/* Header Section */}
      <section className="space-y-4 text-center md:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-bold uppercase tracking-widest mb-2">
          <Diamond size={14} /> Digital Scarcity & Ownership
        </div>
        <h2 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
          {t('mod6.title')}
        </h2>
        <p className="text-gray-400 text-lg max-w-3xl leading-relaxed">
          {t('mod6.intro')}
        </p>
      </section>

      {/* 1. USE CASES */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-600 shadow-lg shadow-purple-500/20">
              <LayoutGrid className="text-white" size={24} />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-white">{t('mod6.useCaseTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('mod6.useCaseDesc')}</p>
           </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { title: t('mod6.utility1'), icon: ImageIcon, color: 'text-pink-400', bg: 'bg-pink-400/10' },
             { title: t('mod6.utility2'), icon: Home, color: 'text-blue-400', bg: 'bg-blue-400/10' },
             { title: t('mod6.utility3'), icon: Ticket, color: 'text-orange-400', bg: 'bg-orange-400/10' },
             { title: t('mod6.utility4'), icon: FileText, color: 'text-green-400', bg: 'bg-green-400/10' },
           ].map((item, idx) => (
             <Card key={idx} className="border-gray-800 hover:border-purple-500/30 transition-all p-6 space-y-4 group">
                <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                   <item.icon size={24} />
                </div>
                <h4 className="text-sm font-bold text-gray-200 leading-tight">{item.title}</h4>
             </Card>
           ))}
        </div>
      </section>

      {/* 2. INTERACTIVE TOKENIZER SIMULATOR */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/20">
              <Cpu className="text-white" size={24} />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-white">{t('mod6.simTitle')}</h3>
              <p className="text-gray-500 text-sm">{t('mod6.simDesc')}</p>
           </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
           {/* Controls */}
           <Card className="border-gray-800 bg-gray-950/50 p-8 space-y-8">
              <div className="space-y-6">
                 <div>
                    <label className="block text-xs font-black text-gray-500 uppercase tracking-widest mb-4">{t('mod6.assetLabel')}</label>
                    <div className="grid grid-cols-3 gap-4">
                       {Object.entries(assets).map(([key, asset]) => (
                          <button 
                            key={key}
                            onClick={() => { setAssetType(key); setIsMinted(false); }}
                            className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${assetType === key ? 'border-purple-500 bg-purple-500/10' : 'border-gray-800 bg-black/40 hover:border-gray-700'}`}
                          >
                             <asset.icon size={24} style={{ color: asset.color }} />
                             <span className="text-[10px] font-black uppercase text-gray-400">{asset.name}</span>
                          </button>
                       ))}
                    </div>
                 </div>

                 <div>
                    <div className="flex justify-between items-center mb-4">
                       <label className="text-xs font-black text-gray-500 uppercase tracking-widest">{t('mod6.fractionLabel')}</label>
                       <span className="text-purple-400 font-black text-lg">{fractions}</span>
                    </div>
                    <input 
                      type="range" min="10" max="1000" step="10"
                      value={fractions}
                      onChange={(e) => setFractions(Number(e.target.value))}
                      className="w-full accent-purple-500 h-2 bg-gray-800 rounded-lg cursor-pointer"
                    />
                 </div>

                 <Button 
                   onClick={handleMint} 
                   disabled={isMinting || isMinted}
                   className="w-full py-6 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black uppercase tracking-widest shadow-lg shadow-purple-600/20 disabled:opacity-50"
                 >
                    {isMinting ? <RefreshCw className="animate-spin mr-2" /> : null}
                    {isMinted ? t('mod6.mintSuccess') : t('mod6.mintBtn')}
                 </Button>
              </div>
           </Card>

           {/* Metadata Display */}
           <Card className="border-gray-800 bg-black p-8 relative overflow-hidden flex flex-col justify-center">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-indigo-500"></div>
              
              <AnimatePresence mode="wait">
                 {isMinted ? (
                    <motion.div 
                      key="minted"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="space-y-6"
                    >
                       <div className="flex justify-center">
                          <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center text-green-500 border border-green-500/30">
                             <CheckCircle size={40} />
                          </div>
                       </div>
                       <div className="text-center space-y-2">
                          <h4 className="text-xl font-black text-white uppercase tracking-tighter">NFT CONTRACT GENERATED</h4>
                          <p className="text-xs text-gray-500 font-mono">ID: {Math.random().toString(16).substr(2, 8).toUpperCase()}</p>
                       </div>
                       
                       <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-800 font-mono text-[10px] space-y-3">
                          <p className="text-purple-400">{"{"}</p>
                          <p className="pl-4 text-gray-400">"name": "{assets[assetType].name} #{Math.floor(Math.random() * 100)}",</p>
                          <p className="pl-4 text-gray-400">"ownership": "1 / {fractions}",</p>
                          <p className="pl-4 text-gray-400">"physical_address": "{assets[assetType].address}",</p>
                          <p className="pl-4 text-gray-400">"blockchain": "Solana / Ethereum",</p>
                          <p className="pl-4 text-gray-400">"royalty": "5%",</p>
                          <p className="text-purple-400">{"}"}</p>
                       </div>
                    </motion.div>
                 ) : (
                    <motion.div 
                      key="preview"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center space-y-6 opacity-30 group-hover:opacity-50 transition-opacity"
                    >
                       <div className="w-32 h-32 mx-auto border-4 border-dashed border-gray-800 rounded-3xl flex items-center justify-center">
                          {React.createElement(assets[assetType].icon, { size: 64, className: "text-gray-700" })}
                       </div>
                       <p className="text-sm font-black text-gray-700 uppercase tracking-[0.3em]">{t('mod6.metadataTitle')}</p>
                    </motion.div>
                 )}
              </AnimatePresence>
           </Card>
        </div>
      </section>

      {/* 3. REAL EXAMPLES */}
      <section className="space-y-8">
        <div className="flex items-center gap-4">
           <div className="p-3 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg shadow-green-500/20">
              <ShieldCheck className="text-white" size={24} />
           </div>
           <div>
              <h3 className="text-2xl font-bold text-white">{t('mod6.exampleTitle')}</h3>
           </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
           {[
             { name: 'ENS', desc: t('mod6.exampleEns'), color: 'border-blue-500/30 bg-blue-500/5' },
             { name: 'RWA', desc: t('mod6.exampleRealEstate'), color: 'border-emerald-500/30 bg-emerald-500/5' },
             { name: 'Loyalty', desc: t('mod6.exampleLoyalty'), color: 'border-orange-500/30 bg-orange-500/5' }
           ].map((ex, idx) => (
             <Card key={idx} className={`p-6 ${ex.color} border flex flex-col gap-4 group cursor-help`}>
                <h4 className="text-lg font-black text-white flex justify-between items-center">
                   {ex.name} <ExternalLink size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-medium">
                   {ex.desc}
                </p>
             </Card>
           ))}
        </div>
      </section>

      {/* 4. GROWTH HACKING CTA */}
      <section className="pt-8">
        <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 p-8 md:p-12 rounded-[2rem] border border-purple-500/20 text-center relative overflow-hidden">
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/20 blur-3xl rounded-full"></div>
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full"></div>
           
           <div className="relative z-10 space-y-6">
              <h3 className="text-3xl font-black text-white">{t('mod6.ctaTitle')}</h3>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                 {t('mod6.ctaDesc')}
              </p>
              <div className="flex justify-center gap-4 pt-4">
                 <Button className="px-8 py-4 bg-white text-black font-black uppercase tracking-tighter hover:bg-purple-100 transition-colors rounded-xl">
                    Get Started <ExternalLink size={18} className="ml-2" />
                 </Button>
              </div>
           </div>
        </div>
      </section>

      <footer className="text-center pt-10">
         <p className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.5em]">
            {t('mod6.footer')}
         </p>
      </footer>
    </motion.div>
  );
};
