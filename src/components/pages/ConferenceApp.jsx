import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppLayout } from '../templates/AppLayout';
import { ModuleTab } from '../molecules/ModuleTab';
import { SystemTrapModule } from '../organisms/SystemTrapModule';
import { DigitalEcosystemModule } from '../organisms/DigitalEcosystemModule';
import { StrategyRiskModule } from '../organisms/StrategyRiskModule';
import { WorkshopModule } from '../organisms/WorkshopModule';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Building2, 
  Wallet, 
  TrendingUp, 
  CheckSquare 
} from 'lucide-react';

export const ConferenceApp = () => {
  const [activeTabId, setActiveTabId] = useState('module-1');
  const { t } = useLanguage();

  const TABS = [
    { id: 'module-1', title: t('nav.mod1') || 'Módulo 1: La Trampa Fiat', icon: Building2, component: SystemTrapModule },
    { id: 'module-2', title: t('nav.mod2') || 'Módulo 2: Ecosistema Digital', icon: Wallet, component: DigitalEcosystemModule },
    { id: 'module-3', title: t('nav.mod3') || 'Módulo 3: Estrategia y Riesgo', icon: TrendingUp, component: StrategyRiskModule },
    { id: 'module-4', title: t('nav.mod4') || 'Módulo 4: Workshop Práctico', icon: CheckSquare, component: WorkshopModule },
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
