"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import { interviewQuestions } from "@/data/interview-questions";
import { Bot, Send, User, BookOpen, ChevronRight, Mic, MicOff, Radio, Plus, Trash2, PanelLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

interface ChatSession {
  id: string;
  title: string;
  category: string;
  messages: ChatMessage[];
  updatedAt: number;
}

export default function AITutorMode() {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All Topics");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [usedVoice, setUsedVoice] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);

  // Sidebar specific state
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [customCategories, setCustomCategories] = useState<string[]>([]);
  const [apiKey, setApiKey] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const isLiveModeRef = useRef(isLiveMode);
  const silenceTimerRef = useRef<any>(null);

  // Load custom categories and API key from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("ai_tutor_custom_categories");
    if (saved) {
      try {
        setCustomCategories(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse custom categories");
      }
    }
    
    setApiKey(localStorage.getItem("user_ai_api_key") || "");
  }, []);

  // Extract unique categories from the knowledge base
  const categories = useMemo(() => {
    const c = new Set(interviewQuestions.map((q) => q.category));
    return ["All Topics", ...Array.from(c), ...customCategories];
  }, [customCategories]);

  // Initialize client and load sessions and categories
  useEffect(() => {
    setIsClient(true);
    const savedSessions = localStorage.getItem("ai_tutor_sessions");
    if (savedSessions) {
      try {
        setSessions(JSON.parse(savedSessions));
      } catch (e) {}
    }
    
    const savedCategories = localStorage.getItem("ai_tutor_custom_categories");
    if (savedCategories) {
      try {
        setCustomCategories(JSON.parse(savedCategories));
      } catch (e) {}
    }
  }, []);

  // Save sessions to localStorage whenever they change
  useEffect(() => {
    if (isClient) {
      localStorage.setItem("ai_tutor_sessions", JSON.stringify(sessions));
    }
  }, [sessions, isClient]);

  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "auto", block: "end" });
    }
  }, [messages, isLoading]);

  // Speech Recognition setup
  useEffect(() => {
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
          setInput((prev) => prev + (prev ? " " : "") + finalTranscript);
          setUsedVoice(true);

          if (isLiveModeRef.current) {
            clearTimeout(silenceTimerRef.current);
            silenceTimerRef.current = setTimeout(() => {
              const submitBtn = document.getElementById("ai-tutor-submit-btn");
              if (submitBtn) (submitBtn as HTMLButtonElement).click();
            }, 2000);
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        if (event.error !== 'no-speech') {
          console.error(`Speech recognition error: ${event.error}`);
        }
        setIsRecording(false);
      };

      recognitionRef.current.onend = () => {
        setIsRecording(false);
        // Auto-restart in Live Mode if not speaking and not processing
        if (isLiveModeRef.current && !window.speechSynthesis.speaking) {
           setTimeout(() => {
              if (isLiveModeRef.current && !window.speechSynthesis.speaking && recognitionRef.current) {
                 try {
                    recognitionRef.current.start();
                    setIsRecording(true);
                 } catch(e) {}
              }
           }, 500);
        }
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

  const toggleLiveMode = () => {
    const newLiveMode = !isLiveMode;
    setIsLiveMode(newLiveMode);
    isLiveModeRef.current = newLiveMode;
    
    if (newLiveMode) {
      if (!isRecording && recognitionRef.current) {
        try {
          recognitionRef.current.start();
          setIsRecording(true);
        } catch (e) { console.error(e); }
      }
    } else {
      clearTimeout(silenceTimerRef.current);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      if (isRecording && recognitionRef.current) {
        recognitionRef.current.stop();
        setIsRecording(false);
      }
    }
  };

  const handleCategoryChange = (cat: string) => {
    if (cat === "ADD_NEW") {
      const newCat = window.prompt("Enter a new topic name:");
      if (newCat && newCat.trim()) {
        const catName = newCat.trim();
        if (!categories.includes(catName)) {
          const updated = [...customCategories, catName];
          setCustomCategories(updated);
          localStorage.setItem("ai_tutor_custom_categories", JSON.stringify(updated));
        }
        setSelectedCategory(catName);
      }
      return;
    }
    setSelectedCategory(cat);
  };

  const handleNewChat = () => {
    setActiveSessionId(null);
    setMessages([]);
    setInput("");
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  };

  const handleSelectSession = (id: string) => {
    const session = sessions.find(s => s.id === id);
    if (session) {
      setActiveSessionId(id);
      setMessages(session.messages);
      setSelectedCategory(session.category);
      setInput("");
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    }
  };

  const handleDeleteSession = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const newSessions = sessions.filter(s => s.id !== id);
    setSessions(newSessions);
    if (activeSessionId === id) {
      handleNewChat();
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || !selectedCategory || isLoading) return;

    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    clearTimeout(silenceTimerRef.current);

    if (isLiveModeRef.current && recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }

    const userMessage = input.trim();
    setInput("");
    
    let currentSessionId = activeSessionId;
    let currentSessions = [...sessions];

    // If starting a new session
    if (!currentSessionId) {
      currentSessionId = Date.now().toString();
      const newTitle = userMessage.split(" ").slice(0, 4).join(" ") + "...";
      const newSession: ChatSession = {
        id: currentSessionId,
        title: newTitle,
        category: selectedCategory,
        messages: [{ role: "user", content: userMessage }],
        updatedAt: Date.now()
      };
      currentSessions = [newSession, ...currentSessions];
      setActiveSessionId(currentSessionId);
      setSessions(currentSessions);
    } else {
      // Append to existing session
      currentSessions = currentSessions.map(s => {
        if (s.id === currentSessionId) {
          return {
             ...s, 
             messages: [...s.messages, { role: "user", content: userMessage }],
             updatedAt: Date.now()
          };
        }
        return s;
      });
      currentSessions.sort((a,b) => b.updatedAt - a.updatedAt);
      setSessions(currentSessions);
    }

    // Optimistically update local messages array for the UI
    const newMessages: ChatMessage[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    const clientApiKey = localStorage.getItem("user_ai_api_key") || "";

    try {
      const res = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userMessage,
          category: selectedCategory,
          history: messages,
          isLiveMode: isLiveModeRef.current,
          clientApiKey,
        }),
      });

      if (!res.ok || !res.body) {
        let errorMsg = "Failed to get response";
        try {
          const errData = await res.json();
          if (errData.error) errorMsg = errData.error;
        } catch (e) {}
        throw new Error(errorMsg);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let fullText = "";
      let categoryDetected = false;
      let finalCat = selectedCategory;
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        
        // Keep the last potentially incomplete line in the buffer
        buffer = lines.pop() || "";
        
        for (const line of lines) {
           const trimmedLine = line.trim();
           if (trimmedLine.startsWith('data: ') && trimmedLine !== 'data: [DONE]') {
              try {
                 const parsed = JSON.parse(trimmedLine.slice(6));
                 const token = parsed.choices?.[0]?.delta?.content || "";
                 fullText += token;
                 
                 if (!categoryDetected && fullText.includes(']')) {
                    const match = fullText.match(/\[Category:\s*(.+?)\]/i);
                    if (match) {
                       const autoCat = match[1].trim();
                       if (autoCat && autoCat !== selectedCategory && autoCat !== "All Topics") {
                          finalCat = autoCat;
                          setSelectedCategory(autoCat);
                          setCustomCategories(prev => {
                             if (!categories.includes(autoCat) && !prev.includes(autoCat)) {
                                const updated = [...prev, autoCat];
                                localStorage.setItem("ai_tutor_custom_categories", JSON.stringify(updated));
                                return updated;
                             }
                             return prev;
                          });
                       }
                       categoryDetected = true;
                    }
                 }

                 let displayContent = fullText;
                 if (categoryDetected) {
                    displayContent = fullText.replace(/\[Category:.*?\]\n*/i, '');
                 } else if (fullText.startsWith('[')) {
                    displayContent = "";
                 }

                 if (displayContent) {
                    setMessages(prev => {
                       const newMessages = [...prev];
                       newMessages[newMessages.length - 1].content = displayContent;
                       return newMessages;
                    });
                 }
              } catch(e) {}
           }
        }
      }
      
      const finalReply = categoryDetected ? fullText.replace(/\[Category:.*?\]\n*/i, '') : fullText;
      
      // Persist to session
      setSessions(prevSessions => {
        return prevSessions.map(s => {
          if (s.id === currentSessionId) {
             return {
                ...s,
                category: finalCat,
                messages: [...s.messages, { role: "assistant" as const, content: finalReply }],
                updatedAt: Date.now()
             };
          }
          return s;
        }).sort((a,b) => b.updatedAt - a.updatedAt);
      });

      if (usedVoice && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(finalReply);
        utterance.onend = () => {
          if (isLiveModeRef.current && recognitionRef.current) {
            try {
              recognitionRef.current.start();
              setIsRecording(true);
            } catch (e) {}
          }
        };
        window.speechSynthesis.speak(utterance);
      }
    } catch (err: any) {
      const errMsg = err.message || "An error occurred while connecting to the AI Tutor.";
      setMessages((prev) => [...prev, { role: "assistant", content: `Error: ${errMsg}` }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isClient) return null;

  return (
    <div className="relative p-3 sm:p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50 rounded-2xl sm:rounded-3xl shadow-xl shadow-purple-100/50 border border-white/60 w-full flex flex-col md:flex-row gap-4 sm:gap-6">
      
      {/* Sidebar (Chat History) */}
      <div 
        className={`hidden md:flex flex-col bg-white/40 backdrop-blur-md border-white/80 shadow-sm relative z-10 transition-all duration-300 ease-in-out whitespace-nowrap overflow-hidden ${
          isSidebarOpen ? 'w-72 p-4 border rounded-2xl' : 'w-0 p-0 border-0 opacity-0'
        }`}
      >
        <button 
          onClick={handleNewChat} 
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white w-full py-3 rounded-xl justify-center font-medium transition-all shadow-md active:scale-95 flex-shrink-0"
        >
          <Plus size={18} /> New Chat
        </button>
        
        <div className="mt-6 font-semibold text-xs text-indigo-900/50 uppercase tracking-wider mb-2 px-2">Past Conversations</div>
        
        <div className="flex-1 overflow-y-auto space-y-1.5 pr-1 scrollbar-thin scrollbar-thumb-indigo-200 scrollbar-track-transparent">
          {sessions.map(s => (
            <div 
              key={s.id} 
              onClick={() => handleSelectSession(s.id)} 
              className={`p-3 rounded-xl cursor-pointer group flex justify-between items-center transition-all border ${
                activeSessionId === s.id 
                  ? 'bg-indigo-100/80 border-indigo-200/60 shadow-sm' 
                  : 'hover:bg-white/60 border-transparent text-gray-700'
              }`}
            >
              <div className="flex flex-col overflow-hidden w-full pr-2">
                <span className="text-[14px] font-semibold text-gray-800 truncate">{s.title}</span>
                <span className="text-[11px] font-medium text-indigo-500/80 truncate mt-0.5">{s.category}</span>
              </div>
              <button 
                onClick={(e) => handleDeleteSession(e, s.id)} 
                title="Delete Chat"
                className="opacity-0 group-hover:opacity-100 flex-shrink-0 p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
          {sessions.length === 0 && (
            <div className="text-sm text-gray-400 text-center mt-10">No past conversations.</div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10 bg-white/30 backdrop-blur-sm rounded-2xl border border-white/60 p-4 sm:p-6 shadow-sm">
        
        {/* Header */}
        <div className="flex-shrink-0 flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4 pb-4 border-b border-gray-200/50">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="hidden md:flex p-2 text-gray-500 hover:bg-white/80 hover:text-indigo-600 hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-white"
              title="Toggle Sidebar"
            >
              <PanelLeft size={22} />
            </button>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center gap-3 tracking-tight">
              <div className="p-2 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-xl shadow-lg shadow-purple-200">
                <Bot className="text-white h-7 w-7" />
              </div>
              AI Tutor Pro
            </h2>
          </div>
          
          <div className="flex flex-wrap items-center gap-3 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl border border-white/80 shadow-sm w-full sm:w-auto">
            <input
              type="password"
              placeholder="API Key (NVIDIA/Groq/Gemini)"
              className="px-3 py-2 text-sm bg-transparent border-b border-indigo-200 outline-none focus:border-indigo-500 w-full sm:w-[200px]"
              value={apiKey}
              onChange={(e) => {
                setApiKey(e.target.value);
                localStorage.setItem("user_ai_api_key", e.target.value.trim());
              }}
            />
            
            <div className="bg-indigo-50 text-indigo-700 px-3 py-2 rounded-xl text-sm font-semibold flex items-center gap-2">
              <BookOpen size={16} /> Topic
            </div>
            <select 
              value={selectedCategory}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="px-2 py-2 bg-transparent border-none text-sm font-medium text-gray-800 outline-none focus:ring-0 max-w-[150px] truncate cursor-pointer"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
              <option value="ADD_NEW" className="font-bold text-indigo-600 bg-indigo-50">+ Add New Topic...</option>
            </select>
            
            <button
              onClick={toggleLiveMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all shadow-sm border ${
                isLiveMode 
                  ? "bg-red-50 text-red-600 border-red-200 animate-pulse" 
                  : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
              }`}
              title="Toggle Hands-Free Live Mode"
            >
              <Radio size={14} className={isLiveMode ? "text-red-500" : ""} />
              {isLiveMode ? "Live: ON" : "Live Mode"}
            </button>
          </div>
        </div>

        {/* Messages */}
        <div ref={chatContainerRef} className="flex-1 bg-white/70 backdrop-blur-md rounded-2xl border border-white/80 shadow-inner p-4 sm:p-6 mb-4 flex flex-col pb-24">
          {messages.length === 0 ? (
            <div className="m-auto text-center max-w-md text-gray-500">
              <div className="bg-gradient-to-tr from-purple-100 to-indigo-100 text-indigo-600 w-20 h-20 rounded-3xl shadow-sm flex items-center justify-center mx-auto mb-6 transform rotate-3">
                <Bot size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3 tracking-tight">Ready to master payroll?</h3>
              <p className="text-[15px] text-gray-600 leading-relaxed mb-8">
                I am your elite AI tutor. You are focusing on <strong className="text-indigo-600">{selectedCategory}</strong>. 
                Ask questions or practice your knowledge. My answers are 100% verified against USA Payroll rules.
              </p>
              <div className="flex flex-col gap-3">
                <button 
                  onClick={() => setInput(`Can you summarize the key points of ${selectedCategory}?`)}
                  className="text-sm font-medium bg-white border border-indigo-100 px-5 py-3 rounded-xl hover:border-indigo-300 hover:shadow-md hover:text-indigo-700 transition-all text-left flex items-center justify-between group"
                >
                  <span>Summarize the key points</span>
                  <ChevronRight size={16} className="text-indigo-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>
                <button 
                  onClick={() => setInput(`Quiz me! Ask me a difficult scenario question about ${selectedCategory}.`)}
                  className="text-sm font-medium bg-white border border-indigo-100 px-5 py-3 rounded-xl hover:border-indigo-300 hover:shadow-md hover:text-indigo-700 transition-all text-left flex items-center justify-between group"
                >
                  <span>Quiz me on this topic</span>
                  <ChevronRight size={16} className="text-indigo-300 group-hover:text-indigo-600 group-hover:translate-x-1 transition-all" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6 pb-2">
              <AnimatePresence initial={false}>
                {messages.map((msg, idx) => (
                  <motion.div 
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-4 max-w-[85%] ${msg.role === "user" ? "ml-auto flex-row-reverse" : ""}`}
                  >
                    <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-sm ${
                      msg.role === "user" ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white" : "bg-white text-indigo-600 border border-indigo-100"
                    }`}>
                      {msg.role === "user" ? <User size={18} /> : <Bot size={20} />}
                    </div>
                    
                    <div className={`px-5 py-4 rounded-3xl text-[15px] leading-relaxed shadow-sm max-w-full overflow-hidden ${
                      msg.role === "user" 
                        ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white rounded-tr-sm whitespace-pre-wrap" 
                        : "bg-white border border-gray-100 text-gray-800 rounded-tl-sm shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] markdown-content"
                    }`}>
                      {msg.role === "user" ? (
                        msg.content
                      ) : (
                        <ReactMarkdown
                          remarkPlugins={[remarkGfm]}
                          components={{
                            table: ({node, ...props}) => (
                              <div className="overflow-x-auto my-4 w-full">
                                <table className="min-w-full divide-y divide-gray-200 border rounded-xl overflow-hidden" {...props} />
                              </div>
                            ),
                            th: ({node, ...props}) => <th className="px-4 py-3 bg-indigo-50/80 text-left text-sm font-bold text-indigo-900 border-b" {...props} />,
                            td: ({node, ...props}) => <td className="px-4 py-3 border-b text-sm text-gray-700" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-1.5 my-3" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 space-y-1.5 my-3" {...props} />,
                            li: ({node, ...props}) => <li className="pl-1" {...props} />,
                            p: ({node, ...props}) => <p className="mb-3 last:mb-0 leading-relaxed" {...props} />,
                            strong: ({node, ...props}) => <strong className="font-bold text-indigo-900 bg-indigo-50/50 px-1 rounded" {...props} />,
                          }}
                        >
                          {msg.content}
                        </ReactMarkdown>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4 max-w-[85%]"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-2xl bg-white text-indigo-600 border border-indigo-100 shadow-sm flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div className="px-6 py-5 bg-white border border-gray-100 rounded-3xl rounded-tl-sm shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] flex gap-2 items-center">
                    <div className="w-2.5 h-2.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2.5 h-2.5 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2.5 h-2.5 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="sticky bottom-4 z-50 flex-shrink-0">
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-gray-200/80 p-2 mx-auto">
            <textarea
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setUsedVoice(false);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Ask your tutor something or speak..."
              className="w-full bg-transparent pl-4 pr-[100px] py-4 min-h-[60px] max-h-[150px] outline-none resize-none text-[16px] text-gray-800 placeholder-gray-400"
              rows={1}
            />
            <div className="absolute right-2 bottom-2 flex items-center gap-2">
              <button
                type="button"
                onClick={toggleRecording}
                className={`p-2 rounded-full transition-colors ${
                  isRecording 
                    ? "bg-red-100 text-red-600 animate-pulse hover:bg-red-200" 
                    : "bg-gray-100 text-gray-500 hover:bg-purple-100 hover:text-purple-600"
                }`}
                title={isRecording ? "Stop Recording" : "Start Recording"}
              >
                {isRecording ? <MicOff size={18} /> : <Mic size={18} />}
              </button>
              <button
                id="ai-tutor-submit-btn"
                type="submit"
                disabled={!input.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg active:scale-95"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
