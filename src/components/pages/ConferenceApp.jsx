import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppLayout } from '../templates/AppLayout';
import { ModuleTab } from '../molecules/ModuleTab';
import { SystemTrapModule } from '../organisms/SystemTrapModule';
import { DigitalEcosystemModule } from '../organisms/DigitalEcosystemModule';
import { StrategyRiskModule } from '../organisms/StrategyRiskModule';
import { PracticalWorkshopModule } from '../organisms/PracticalWorkshopModule';
import { PresenterProfileModule } from '../organisms/PresenterProfileModule';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Building2, 
  Wallet, 
  TrendingUp, 
  CheckSquare,
  User,
  Zap,
  Diamond
} from 'lucide-react';
import { DefiModule } from '../organisms/DefiModule';
import { NftModule } from '../organisms/NftModule';

export const ConferenceApp = () => {
  const [activeTabId, setActiveTabId] = useState('module-1');
  const { t } = useLanguage();
  
  React.useEffect(() => {
    const activeTab = TABS.find(tab => tab.id === activeTabId);
    if (activeTab) {
      document.title = `${activeTab.title} | Soberanía Financiera`;
    }
  }, [activeTabId, t]);

  const TABS = [
    { id: 'module-1', title: t('nav.mod1') || 'Módulo 1: La Trampa Fiat', icon: Building2, component: SystemTrapModule },
    { id: 'module-2', title: t('nav.mod2') || 'Módulo 2: Ecosistema Digital', icon: Wallet, component: DigitalEcosystemModule },
    { id: 'module-3', title: t('nav.mod3') || 'Módulo 3: Estrategia y Riesgo', icon: TrendingUp, component: StrategyRiskModule },
    { id: 'module-4', title: t('nav.mod4') || 'Módulo 4: Workshop Práctico', icon: CheckSquare, component: PracticalWorkshopModule },
    { id: 'module-5', title: t('nav.mod5') || 'Módulo 5: Ecosistema DeFi', icon: Zap, component: DefiModule },
    { id: 'module-6', title: t('nav.mod6') || 'Módulo 6: El Poder de los NFTs', icon: Diamond, component: NftModule },
    { id: 'profile', title: t('nav.profile') || 'Perfil del Consultor', icon: User, component: PresenterProfileModule },
  ];

  const CurrentModuleData = TABS.find((t) => t.id === activeTabId);
  const CurrentModule = CurrentModuleData?.component || SystemTrapModule;

  const renderSidebar = () => {
    return TABS.map((tab) => (
      <div key={tab.id} className="min-w-[200px] md:min-w-0 flex-shrink-0">
         <ModuleTab 
          title={tab.title}
          isActive={activeTabId === tab.id}
          onClick={() => setActiveTabId(tab.id)}
          icon={tab.icon}
        />
      </div>
    ));
  };

  return (
    <AppLayout 
      tabsConfig={TABS}
      activeTab={activeTabId}
      onTabChange={setActiveTabId}
      renderSidebar={renderSidebar}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTabId}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <CurrentModule />
        </motion.div>
      </AnimatePresence>
    </AppLayout>
  );
};
