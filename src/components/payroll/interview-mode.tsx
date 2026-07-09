"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import { interviewQuestions } from "@/data/interview-questions";
import { ChevronLeft, ChevronRight, RefreshCcw, Eye, CheckCircle, Circle, BookOpen, List, LayoutGrid, Bot, Send, X, Mic, MicOff } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InterviewMode() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  
  // Filters and Views
  const [selectedDomain, setSelectedDomain] = useState<string>("All");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [learningStatus, setLearningStatus] = useState<"All" | "Learning" | "Mastered">("All");
  const [viewMode, setViewMode] = useState<"flashcards" | "list">("flashcards");

  // AI Practice State
  const [aiPracticeQuestion, setAiPracticeQuestion] = useState<any>(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [aiFeedback, setAiFeedback] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [usedVoice, setUsedVoice] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const recognitionRef = useRef<any>(null);

  // Local storage for mastered questions
  const [masteredIds, setMasteredIds] = useState<Set<string>>(new Set());
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("masteredQuestions");
    if (saved) {
      try {
        setMasteredIds(new Set(JSON.parse(saved)));
      } catch (e) {
        console.error("Failed to parse mastered questions from local storage");
      }
    }
    setApiKey(localStorage.getItem("user_ai_api_key") || "");
  }, []);

  const toggleMastered = (id: string) => {
    setMasteredIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      localStorage.setItem("masteredQuestions", JSON.stringify(Array.from(newSet)));
      return newSet;
    });
  };

  // Derive unique domains and categories based on current selection
  const domains = useMemo(() => {
    const d = new Set(interviewQuestions.map((q) => q.domain));
    return ["All", ...Array.from(d)];
  }, []);

  const categories = useMemo(() => {
    let filtered = interviewQuestions;
    if (selectedDomain !== "All") {
      filtered = filtered.filter((q) => q.domain === selectedDomain);
    }
    const c = new Set(filtered.map((q) => q.category));
    return ["All", ...Array.from(c)];
  }, [selectedDomain]);

  // Filtered Questions
  const filteredQuestions = useMemo(() => {
    return interviewQuestions.filter((q) => {
      if (selectedDomain !== "All" && q.domain !== selectedDomain) return false;
      if (selectedCategory !== "All" && q.category !== selectedCategory) return false;
      
      const isMastered = masteredIds.has(q.id);
      if (learningStatus === "Learning" && isMastered) return false;
      if (learningStatus === "Mastered" && !isMastered) return false;

      return true;
    });
  }, [selectedDomain, selectedCategory, learningStatus, masteredIds]);

  // Reset index when filters change
  useEffect(() => {
    setCurrentIndex(0);
    setShowAnswer(false);
  }, [selectedDomain, selectedCategory, learningStatus]);

  const safeCurrentIndex = filteredQuestions.length > 0 
    ? Math.min(currentIndex, filteredQuestions.length - 1) 
    : 0;

  const handleNext = () => {
    if (filteredQuestions.length === 0) return;
    setShowAnswer(false);
    setCurrentIndex((safeCurrentIndex + 1) % filteredQuestions.length);
  };

  const handlePrev = () => {
    if (filteredQuestions.length === 0) return;
    setShowAnswer(false);
    setCurrentIndex((safeCurrentIndex - 1 + filteredQuestions.length) % filteredQuestions.length);
  };

  const handleToggleAnswer = () => {
    setShowAnswer((prev) => !prev);
  };

  const handleRandom = () => {
    if (filteredQuestions.length === 0) return;
    setShowAnswer(false);
    setCurrentIndex(Math.floor(Math.random() * filteredQuestions.length));
  };

  const handlePracticeAI = (q: any) => {
    setAiPracticeQuestion(q);
    setUserAnswer("");
    setAiFeedback("");
  };

  useEffect(() => {
    // Initialize Speech Recognition
    if (typeof window !== "undefined" && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setUserAnswer((prev) => prev + (prev ? " " : "") + finalTranscript);
          setUsedVoice(true);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        if (event.error === 'network') {
          alert("Speech recognition network error. This browser may not support the offline speech engine, or you may be behind a firewall. Please type your answer instead.");
        } else if (event.error !== 'no-speech') {
          alert(`Speech recognition error: ${event.error}`);
        }
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
      };
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser. Please use Chrome or Edge.");
      return;
    }
    
    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (e) {
        console.error(e);
      }
    }
  };

  const submitAiAnswer = async () => {
    if (!userAnswer.trim()) return;
    setIsEvaluating(true);
    setAiFeedback("");
    setShowFeedback(false);

    const clientApiKey = localStorage.getItem("user_ai_api_key") || "";

    try {
      const res = await fetch('/api/evaluate-answer', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: aiPracticeQuestion.q,
          correctAnswer: aiPracticeQuestion.a,
          userAnswer: userAnswer,
          clientApiKey,
        }),
      });

      if (!res.ok) {
        let errorMsg = "Failed to evaluate answer.";
        try {
          const errData = await res.json();
          if (errData.error) errorMsg = errData.error;
        } catch (e) {}
        throw new Error(errorMsg);
      }

      const data = await res.json();
      setAiFeedback(data.feedback);
      setShowFeedback(true);
      
      if (usedVoice && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(data.feedback);
        window.speechSynthesis.speak(utterance);
      }
    } catch (err: any) {
      const errMsg = err.message || "An error occurred while evaluating your answer.";
      setAiFeedback(`Error: ${errMsg}`);
      setShowFeedback(true);
    } finally {
      setIsEvaluating(false);
    }
  };

  if (!isClient) return null; // Wait for hydration to avoid mismatch with localStorage

  return (
    <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm max-w-5xl mx-auto mb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <BookOpen className="text-blue-600" />
          Interview Mode
        </h2>
        
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="password"
            placeholder="API Key (NVIDIA/Groq/Gemini)"
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-shadow w-full sm:w-[200px]"
            value={apiKey}
            onChange={(e) => {
              setApiKey(e.target.value);
              localStorage.setItem("user_ai_api_key", e.target.value.trim());
            }}
          />
          <select 
            value={selectedDomain}
            onChange={(e) => {
              setSelectedDomain(e.target.value);
              setSelectedCategory("All");
            }}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-shadow"
          >
            {domains.map((d) => <option key={d} value={d}>{d === "All" ? "All Domains" : d}</option>)}
          </select>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-shadow"
          >
            {categories.map((c) => <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>)}
          </select>

          <select 
            value={learningStatus}
            onChange={(e) => {
              const val = e.target.value as any;
              setLearningStatus(val);
              // Auto-switch to list view if looking at mastered
              if (val === "Mastered") setViewMode("list");
            }}
            className="px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-700 outline-none focus:ring-2 focus:ring-blue-100 transition-shadow font-medium"
          >
            <option value="All">All Status</option>
            <option value="Learning">To Learn</option>
            <option value="Mastered">Mastered 🏆</option>
          </select>

          <div className="flex items-center bg-gray-100 rounded-lg p-1 ml-auto md:ml-0">
            <button
              onClick={() => setViewMode("flashcards")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "flashcards" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              title="Flashcard View"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-white shadow-sm text-blue-600" : "text-gray-500 hover:text-gray-700"}`}
              title="List View"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {filteredQuestions.length === 0 ? (
        <div className="py-20 text-center text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
          <p className="text-lg font-medium">No questions found</p>
          <p className="text-sm mt-1">Try adjusting your filters.</p>
        </div>
      ) : viewMode === "list" ? (
        <div className="space-y-4">
          <div className="text-sm font-medium text-gray-500 mb-2">Showing {filteredQuestions.length} questions</div>
          <div className="grid grid-cols-1 gap-4 max-h-[70vh] overflow-y-auto pr-2 pb-4">
            {filteredQuestions.map((q) => (
              <div key={q.id} className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow relative group">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                      {q.domain}
                    </span>
                    <span className="px-2.5 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                      {q.category}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => handlePracticeAI(q)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors text-xs font-medium w-fit bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
                    >
                      <Bot size={14} /> Practice AI
                    </button>
                    <button 
                      onClick={() => toggleMastered(q.id)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors text-xs font-medium w-fit ${
                        masteredIds.has(q.id)
                          ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                          : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700'
                      }`}
                    >
                      {masteredIds.has(q.id) ? (
                        <><CheckCircle size={14} className="text-green-600" /> Mastered</>
                      ) : (
                        <><Circle size={14} /> Mark as Mastered</>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <span className="font-bold text-gray-800 text-lg flex gap-2">
                    <span className="text-blue-500">Q:</span> {q.q}
                  </span>
                </div>
                <div className="text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <span className="font-bold text-green-600 block mb-1">A:</span> 
                  <span className="leading-relaxed">{q.a}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex gap-2 items-center">
              <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">
                {filteredQuestions[safeCurrentIndex].domain}
              </span>
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">
                {filteredQuestions[safeCurrentIndex].category}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm">
              <div className="font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                {safeCurrentIndex + 1} / {filteredQuestions.length}
              </div>
              
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handlePracticeAI(filteredQuestions[safeCurrentIndex]);
                }}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors text-xs font-medium w-fit bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
              >
                <Bot size={16} /> Practice AI
              </button>

              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMastered(filteredQuestions[safeCurrentIndex].id);
                }}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors ${
                  masteredIds.has(filteredQuestions[safeCurrentIndex].id)
                    ? 'bg-green-50 text-green-700 border-green-200 hover:bg-green-100'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50 hover:text-gray-700'
                }`}
              >
                {masteredIds.has(filteredQuestions[safeCurrentIndex].id) ? (
                  <><CheckCircle size={16} className="text-green-600" /> Mastered</>
                ) : (
                  <><Circle size={16} /> Mark as Mastered</>
                )}
              </button>
            </div>
          </div>

          <div 
            className="w-full [perspective:1000px] cursor-pointer"
            onClick={handleToggleAnswer}
          >
            <AnimatePresence mode="wait">
              {!showAnswer ? (
                <motion.div
                  key="question"
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full min-h-[300px] bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-sm relative group hover:shadow-md transition-shadow"
                >
                  <div className="text-sm text-blue-500 font-bold mb-4 tracking-wider uppercase bg-blue-100/50 px-3 py-1 rounded-full">
                    Question {filteredQuestions[safeCurrentIndex].id}
                  </div>
                  <p className="text-xl md:text-3xl font-medium text-gray-800 leading-relaxed max-w-2xl">
                    {filteredQuestions[safeCurrentIndex].q}
                  </p>
                  <div className="mt-8 flex items-center text-blue-400 font-medium text-sm gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Eye size={18} /> Click card to reveal answer
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="answer"
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full min-h-[300px] bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 rounded-2xl p-8 md:p-12 flex flex-col justify-center items-center text-center shadow-sm relative group hover:shadow-md transition-shadow"
                >
                  <div className="text-sm text-green-600 font-bold mb-4 tracking-wider uppercase bg-green-100/50 px-3 py-1 rounded-full">
                    Answer
                  </div>
                  <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl">
                    {filteredQuestions[safeCurrentIndex].a}
                  </p>
                  <div className="mt-8 flex items-center text-green-500 font-medium text-sm gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    <Eye size={18} /> Click card to view question again
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handlePrev}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl transition-all font-medium flex-1 sm:flex-none shadow-sm hover:shadow active:scale-95"
            >
              <ChevronLeft size={20} />
              <span className="hidden sm:inline">Previous</span>
            </button>
            
            <button
              onClick={handleRandom}
              className="flex items-center justify-center gap-2 p-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-full transition-all hover:rotate-180 duration-500 active:scale-90"
              title="Random Question"
            >
              <RefreshCcw size={22} />
            </button>

            <button
              onClick={handleNext}
              className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all font-medium flex-1 sm:flex-none shadow-sm shadow-blue-200 hover:shadow-md active:scale-95"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight size={20} />
            </button>
          </div>
        </>
      )}

      {/* AI Practice Modal */}
      {aiPracticeQuestion && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
              <h3 className="font-bold flex items-center gap-2 text-gray-800">
                <Bot className="text-purple-600" />
                AI Interview Practice
              </h3>
              <button 
                onClick={() => setAiPracticeQuestion(null)}
                className="p-1 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="mb-6">
                <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Question</div>
                <div className="text-lg font-medium text-gray-800 bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                  {aiPracticeQuestion.q}
                </div>
              </div>

              {!aiFeedback && !isEvaluating && (
                <div className="mb-4">
                  <label className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 block">Your Answer</label>
                  <div className="relative">
                    <textarea
                      value={userAnswer}
                      onChange={(e) => {
                        setUserAnswer(e.target.value);
                        setUsedVoice(false);
                      }}
                      placeholder="Type or speak your answer here..."
                      className="w-full h-32 p-4 pr-12 rounded-xl border border-gray-200 focus:border-purple-300 focus:ring-4 focus:ring-purple-100 outline-none resize-none transition-all"
                    />
                    <button
                      onClick={toggleRecording}
                      className={`absolute right-3 bottom-4 p-2 rounded-full transition-colors shadow-sm ${
                        isRecording 
                          ? "bg-red-100 text-red-600 animate-pulse hover:bg-red-200" 
                          : "bg-gray-100 text-gray-600 hover:bg-purple-100 hover:text-purple-600"
                      }`}
                      title={isRecording ? "Stop Recording" : "Start Recording"}
                    >
                      {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-4">
                    <div className="text-sm text-gray-500">
                      {isRecording && <span className="text-red-500 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500 animate-ping"></span> Listening...</span>}
                    </div>
                    <button
                      onClick={submitAiAnswer}
                      disabled={!userAnswer.trim()}
                      className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2.5 rounded-xl font-medium transition-all shadow-sm hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={18} /> Submit for Feedback
                    </button>
                  </div>
                </div>
              )}

              {isEvaluating && (
                <div className="flex flex-col items-center justify-center py-10 text-purple-600 space-y-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
                  <p className="font-medium animate-pulse">Evaluating your answer...</p>
                </div>
              )}

              {aiFeedback && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Your Answer</div>
                    <div className="text-gray-700">{userAnswer}</div>
                  </div>
                  
                  <div className="bg-purple-50 p-5 rounded-xl border border-purple-100 relative">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                      <Bot size={48} />
                    </div>
                    <div className="text-sm font-bold text-purple-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                      <Bot size={16} /> AI Feedback
                    </div>
                    <div className="text-gray-800 leading-relaxed whitespace-pre-wrap relative z-10">
                      {aiFeedback}
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-6 pt-6 border-t border-gray-100">
                    <button
                      onClick={() => {
                        setAiPracticeQuestion(null);
                        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                      }}
                      className="px-4 py-2 text-gray-500 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setUserAnswer("");
                        setAiFeedback("");
                        if ('speechSynthesis' in window) window.speechSynthesis.cancel();
                      }}
                      className="px-4 py-2 text-purple-600 hover:bg-purple-50 rounded-lg font-medium transition-colors"
                    >
                      Try Again
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
