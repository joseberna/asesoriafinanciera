import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '../atoms/Card';
import { Button } from '../atoms/Button';
import { Tooltip } from '../atoms/Tooltip';
import { Award, AlertTriangle, Eye, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

/**
 * Reusable Interactive Quiz Component
 * Handles randomization, state management, and grading for any question bank.
 */
export const InteractiveQuiz = ({ 
  questionBank, 
  title = "Quiz de Evaluación",
  icon: Icon = CheckCircle2
}) => {
  const { t } = useLanguage();
  
  // Quiz State
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [showAnswers, setShowAnswers] = useState(false);

  // Initialize Quiz on Mount (or when bank changes)
  useEffect(() => {
    if (questionBank && questionBank.length > 0) {
      const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
      setCurrentQuestions(shuffled.slice(0, 5));
      // Reset state for new quiz
      setAnswers({});
      setScore(null);
      setShowAnswers(false);
    }
  }, [questionBank]);

  // Grading Logic
  const handleCheckAnswers = () => {
    let correctCount = 0;
    currentQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correctCount += 1;
      }
    });
    setScore(Math.round((correctCount / currentQuestions.length) * 100));
  };

  // Reveal Correct Answers
  const handleShowAnswers = () => {
    const correctAnswers = {};
    currentQuestions.forEach((q) => {
      correctAnswers[q.id] = q.correctAnswer;
    });
    setAnswers(correctAnswers);
    setScore(100);
    setShowAnswers(true);
  };

  const isFormComplete = Object.keys(answers).length >= currentQuestions.length;

  return (
    <section className="py-8">
      <Card className={`transition-all duration-700 ${
        score === 100 
          ? 'border-sol-green shadow-[0_0_30px_rgba(20,241,149,0.15)] bg-sol-green/5' 
          : score !== null 
            ? 'border-red-500 bg-red-500/5' 
            : 'border-gray-800'
      }`}>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 border-b border-gray-800 pb-6 gap-4">
          <div className="flex items-center gap-3">
            <Icon className="text-eth-blue" size={24} />
            <h3 className="text-xl font-bold text-white">{title}</h3>
          </div>
          
          <div className="flex gap-3 items-center w-full md:w-auto">
             <Tooltip content="Envía tus respuestas para calificar tu desempeño.">
               <Button 
                variant="outline" 
                size="sm" 
                onClick={handleCheckAnswers} 
                disabled={!isFormComplete || showAnswers}
               >
                 Calificar Examen
               </Button>
             </Tooltip>
             <Tooltip content="Revela las respuestas correctas para aprender.">
               <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleShowAnswers} 
                className="text-gray-500 hover:text-white"
               >
                 <Eye size={18} className="mr-2"/> Ver Respuestas
               </Button>
             </Tooltip>
          </div>
        </div>

        <div className="space-y-10">
          {currentQuestions.map((q, index) => (
            <div key={q.id} className="space-y-4">
               <h4 className="font-bold text-gray-200 flex gap-3">
                 <span className="text-eth-blue opacity-50">{index + 1}.</span> 
                 {q.question}
               </h4>
               <div className="grid gap-3">
                 {q.options.map((opt) => {
                   const isSelected = answers[q.id] === opt.id;
                   const isCorrect = opt.id === q.correctAnswer;
                   
                   let variantClasses = "bg-crypto-surface-alt border-gray-700 hover:border-gray-500";
                   if (isSelected) {
                     if (showAnswers && isCorrect) {
                       variantClasses = "bg-sol-green/20 border-sol-green";
                     } else if (showAnswers && !isCorrect) {
                       variantClasses = "bg-red-500/20 border-red-500";
                     } else {
                       variantClasses = "bg-neon-accent/10 border-neon-accent";
                     }
                   } else if (showAnswers && isCorrect) {
                     variantClasses = "bg-sol-green/20 border-sol-green/50 border-dashed";
                   }

                   return (
                     <motion.div 
                       key={`${q.id}-${opt.id}`} 
                       whileHover={{ x: 5 }}
                       onClick={() => !showAnswers && setAnswers({ ...answers, [q.id]: opt.id })}
                       className={`p-4 rounded-xl border cursor-pointer transition-all ${variantClasses}`}
                     >
                       <div className="flex items-center justify-between">
                         <span className="text-sm md:text-base">{opt.text}</span>
                         {showAnswers && isCorrect && <CheckCircle2 size={16} className="text-sol-green" />}
                       </div>
                     </motion.div>
                   );
                 })}
               </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {score !== null && (
             <motion.div 
               initial={{ opacity:0, y:20 }} 
               animate={{ opacity:1, y:0 }} 
               className="mt-12 border-t border-gray-800 pt-8"
             >
               {score >= 60 ? (
                 <div className="flex items-center gap-6 bg-sol-green/10 border border-sol-green/30 p-8 rounded-2xl">
                   <Award className="text-sol-green shrink-0" size={56} />
                   <div>
                     <h4 className="text-3xl font-black text-sol-green tracking-tight">
                       Score: {score}% - Aprobado
                     </h4>
                     <p className="text-gray-300 mt-2 leading-relaxed">
                       Has demostrado una comprensión sólida de los fundamentos. Tu camino hacia la soberanía financiera está bien cimentado.
                     </p>
                   </div>
                 </div>
               ) : (
                 <div className="flex items-center gap-6 bg-red-900/20 border border-red-500/30 p-8 rounded-2xl">
                   <AlertTriangle className="text-red-500 shrink-0" size={56} />
                   <div>
                     <h4 className="text-3xl font-black text-red-500 tracking-tight">
                       Score: {score}% - Reprobado
                     </h4>
                     <p className="text-gray-300 mt-2 leading-relaxed">
                       Parece que algunos conceptos institucionales aún no están claros. Te recomendamos revisar la teoría y volver a intentar el examen para asegurar tu capital.
                     </p>
                   </div>
                 </div>
               )}
             </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </section>
  );
};
