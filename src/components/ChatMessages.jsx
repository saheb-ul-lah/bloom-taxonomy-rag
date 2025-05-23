// src/components/ChatMessages.jsx
import React, { useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // For tags in ActivityCard
import {
  Bot, User, Layers, Copy, Info, AlertTriangle,
  BookCopy, FileCode2, FileText, CheckSquare, ListChecks, ExternalLink,
  ClipboardList, Users as UdlIcon, BarChart3, Lightbulb, ActivityIcon, Target
} from "lucide-react"; // Added more icons for structured content
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import katex from 'katex';
import { toast } from "@/components/ui/sonner";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"; // Added TooltipProvider

// --- KaTeX Rendering Logic ---
const renderWithKaTeX = (text) => {
  if (typeof text !== 'string' || !text) return "";
  try {
    let processedText = text.replace(/\$\$([\s\S]*?)\$\$/g, (match, latex) => {
      try {
        return katex.renderToString(latex.trim(), { displayMode: true, throwOnError: false, trust: true, output: "html" });
      } catch (e) {
        console.warn("KaTeX block rendering error:", e.message, "Latex:", latex);
        return `<span class="katex-error" title="KaTeX Error: ${e.message}">[Block KaTeX Error: ${latex.substring(0, 20)}...]</span>`;
      }
    });
    processedText = processedText.replace(/(?<!\$)\$([\s\S]*?)\$(?!\$)/g, (match, latex) => {
      if (match.includes("<span class=\"katex\">")) return match;
      try {
        return katex.renderToString(latex.trim(), { displayMode: false, throwOnError: false, trust: true, output: "html" });
      } catch (e) {
        console.warn("KaTeX inline rendering error:", e.message, "Latex:", latex);
        return `<span class="katex-error" title="KaTeX Error: ${e.message}">[Inline KaTeX Error: ${latex.substring(0, 20)}...]</span>`;
      }
    });
    return processedText;
  } catch (error) {
    console.error("Overall KaTeX processing error:", error);
    return text;
  }
};

// --- Structured Content Display Components ---
const BloomsAnalysisReportDisplay = ({ data }) => {
  if (!data || !data.coverage || !data.overallAssessment) {
    return <div className="structured-content-error"><AlertTriangle size={14} /> Bloom's Analysis Report data is malformed.</div>;
  }

  const bloomLevels = ["Remember", "Understand", "Apply", "Analyze", "Evaluate", "Create"];

  return (
    <div className="ai-blooms-analysis-report">
      <div className="analysis-report-header">
        <BarChart3 size={18} className="text-blue-500" />
        <h5 className="analysis-report-title">Bloom's Taxonomy Coverage Analysis</h5>
      </div>

      {data.analyzedTextSnippet && (
        <p className="analysis-snippet">
          <strong>Analyzed Snippet:</strong> "<em>{data.analyzedTextSnippet}</em>"
        </p>
      )}

      <div className="analysis-section">
        <strong>Overall Assessment:</strong>
        <p className="analysis-text">{data.overallAssessment}</p>
      </div>

      <div className="analysis-section">
        <strong>Coverage Distribution:</strong>
        <div className="coverage-bars">
          {bloomLevels.map(level => {
            const percentage = data.coverage[level] || 0;
            // Simple bar display, can be enhanced with actual bar chart component
            return (
              <div key={level} className="coverage-bar-item">
                <span className="coverage-level-label">{level}:</span>
                <div className="coverage-bar-track">
                  <div
                    className="coverage-bar-fill"
                    style={{ width: `${Math.min(percentage, 100)}%` }} // Assuming percentage, adjust if count
                    title={`${percentage}${typeof Object.values(data.coverage)[0] === 'number' && Object.values(data.coverage)[0] <= 1 ? '%' : ' items'}`}
                  >
                    {percentage}{typeof Object.values(data.coverage)[0] === 'number' && Object.values(data.coverage)[0] <= 1 ? '%' : ''}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {Array.isArray(data.identifiedExamples) && data.identifiedExamples.length > 0 && (
        <div className="analysis-section">
          <strong>Identified Examples:</strong>
          <ul className="analysis-examples-list">
            {data.identifiedExamples.map((ex, index) => (
              <li key={index}>
                <Badge variant="outline" className="meta-badge bloom-badge mr-1.5">{ex.level}</Badge>
                "{ex.exampleSentence}"
              </li>
            ))}
          </ul>
        </div>
      )}

      {data.suggestionsForBalance && (
        <div className="analysis-section">
          <strong>Suggestions for Balance:</strong>
          <p className="analysis-text">{data.suggestionsForBalance}</p>
        </div>
      )}
    </div>
  );
};


const TableDisplay = ({ data }) => {
  if (!data || !Array.isArray(data.headers) || !Array.isArray(data.rows)) {
    return <div className="structured-content-error"><AlertTriangle size={14} /> Table data is malformed.</div>;
  }
  if (data.headers.length === 0 && data.rows.length === 0) {
    return <div className="structured-content-empty"><Info size={14} /> AI provided an empty table.</div>;
  }
  return (
    <div className="ai-table-display">
      <table className="min-w-full text-sm">
        <thead>
          <tr>
            {data.headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parseInline(renderWithKaTeX(String(cell)))) }} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const ActivitySuggestionListDisplay = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="structured-content-empty"><Info size={14} /> No activities suggested.</div>;
  }
  return (
    <div className="ai-activity-list space-y-3">
      {data.map((activity, idx) => (
        <div key={idx} className="ai-activity-card">
          <div className="activity-card-header">
            <ActivityIcon size={18} className="text-teal-500" />
            <h5 className="activity-title">{activity.title || `Activity Suggestion ${idx + 1}`}</h5>
          </div>
          {activity.description && <p className="activity-description">{activity.description}</p>}
          {activity.pedagogicalRationale && <p className="activity-rationale"><strong>Rationale:</strong> {activity.pedagogicalRationale}</p>}
          {Array.isArray(activity.materialsNeeded) && activity.materialsNeeded.length > 0 && (
            <div className="activity-materials">
              <strong>Materials:</strong>
              <ul>{activity.materialsNeeded.map((mat, i) => <li key={i}>{mat}</li>)}</ul>
            </div>
          )}
          {Array.isArray(activity.udlConnections) && activity.udlConnections.length > 0 && (
            <div className="activity-tags">
              <strong>UDL:</strong> {activity.udlConnections.map(tag => <Badge key={tag} variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-600">{tag}</Badge>)}
            </div>
          )}
          {Array.isArray(activity.frameworkTags) && activity.frameworkTags.length > 0 && (
            <div className="activity-tags">
              <strong>Tags:</strong> {activity.frameworkTags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
            </div>
          )}
          {/* <Button size="xs" variant="outline" className="mt-2.5 activity-action-btn"><ExternalLink size={12} className="mr-1"/> View More</Button> */}
        </div>
      ))}
    </div>
  );
};

const QuestionListDisplay = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="structured-content-empty"><Info size={14} /> No questions generated.</div>;
  }
  return (
    <div className="ai-question-list space-y-3">
      {data.map((q, index) => (
        <div key={index} className="ai-question-card">
          <div className="question-card-header">
            <div className="font-semibold text-sm text-foreground prose dark:prose-invert max-w-none">
              <span className="text-primary !no-underline">Q{index + 1}: </span>
              <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parseInline(renderWithKaTeX(q.questionText || q.question || ""))) }} />
            </div>
          </div>
          {q.options && q.options.length > 0 && (
            <ul className="question-options">
              {q.options.map((opt, i) => (
                <li key={i} className={`${i === q.correctAnswerIndex ? 'correct-answer' : ''}`}>
                  <span className="option-letter">{String.fromCharCode(65 + i)}.</span> {opt}
                </li>
              ))}
            </ul>
          )}
          <div className="question-meta">
            {q.bloomLevel && <Badge variant="outline" className="meta-badge bloom-badge"><BarChart3 size={12} /> Bloom's: {q.bloomLevel}</Badge>}
            {q.dokLevel && <Badge variant="outline" className="meta-badge dok-badge"><Layers size={12} /> DOK: {q.dokLevel}</Badge>}
          </div>
          {q.justification && <p className="question-justification"><strong>Justification:</strong> {q.justification}</p>}
          {q.rubricHints && <p className="question-rubric"><strong>Rubric Hints:</strong> {q.rubricHints}</p>}
        </div>
      ))}
    </div>
  );
};

const ObjectivesListDisplay = ({ data }) => {
  if (!Array.isArray(data) || data.length === 0) {
    return <div className="structured-content-empty"><Info size={14} /> No objectives provided.</div>;
  }
  return (
    <div className="ai-objectives-list space-y-2.5">
      {data.map((obj, index) => (
        <div key={index} className="ai-objective-card">
          <div className="objective-header">
            <Target size={16} className="text-green-500" />
            <h6 className="objective-text">{obj.objective}</h6>
          </div>
          {obj.rationale && <p className="objective-rationale"><strong>Rationale:</strong> {obj.rationale}</p>}
          {obj.frameworkAlignment && <p className="objective-alignment"><strong>Alignment:</strong> {obj.frameworkAlignment}</p>}
        </div>
      ))}
    </div>
  );
};

const UdlAnalysisDisplay = ({ data }) => {
  if (!data || !data.principle) {
    return <div className="structured-content-error"><AlertTriangle size={14} /> UDL Analysis data is malformed.</div>;
  }
  return (
    <div className="ai-udl-analysis">
      <div className="udl-analysis-header">
        <UdlIcon size={18} className="text-purple-500" />
        <h5 className="udl-principle-title">UDL Principle: {data.principle}</h5>
      </div>
      {data.checkpoint && <p className="udl-checkpoint"><strong>Checkpoint:</strong> {data.checkpoint}</p>}
      {Array.isArray(data.suggestions) && data.suggestions.length > 0 && (
        <div className="udl-suggestions">
          <strong>Suggestions:</strong>
          <ul>
            {data.suggestions.map((suggestion, i) => <li key={i}>{suggestion}</li>)}
          </ul>
        </div>
      )}
      {data.rationale && <p className="udl-rationale"><strong>Rationale:</strong> {data.rationale}</p>}
    </div>
  );
};


const SimpleTextDisplay = ({ data }) => {
  if (!data || typeof data.text !== 'string' || !data.text.trim()) {
    return <div className="structured-content-empty"><Info size={14} /> No textual content provided.</div>;
  }
  const textWithKatex = renderWithKaTeX(data.text);
  const rawMarkup = marked.parse(textWithKatex);
  const cleanMarkup = DOMPurify.sanitize(rawMarkup, {
    USE_PROFILES: { html: true },
    ADD_TAGS: ['math', 'mtable', 'mtr', 'mtd', 'mrow', 'mi', 'mo', 'mn', 'mtext', 'msup', 'msub', 'mfrac', 'msqrt', 'mover', 'munder', 'munderover', 'mstyle', 'semantics', 'annotation', 'svg', 'path', 'g', 'use', 'foreignobject', 'iframe'],
    ADD_ATTR: ['encoding', 'src', 'alt', 'width', 'height', 'xlink:href', 'xmlns:xlink', 'xmlns', 'viewBox', 'style', 'transform', 'd', 'frameborder', 'allowfullscreen', 'allow']
  });
  return <div className="prose dark:prose-invert max-w-none prose-sm md:prose-base" dangerouslySetInnerHTML={{ __html: cleanMarkup }} />;
};


// --- Main ChatMessages Component ---
const ChatMessagesStyles = () => (
  <style>{`
    .message-bubble-container { display: flex; gap: 0.75rem; max-width: 92%; margin-bottom: 1.25rem; } /* Reduced margin-bottom */
    .message-bubble-container.user-message { margin-left: auto; flex-direction: row-reverse; }
    .message-avatar { width: 32px; height: 32px; flex-shrink: 0; border-radius: 50%; } /* Slightly smaller avatar */
    /* Removed avatar borders, handled by fallback bg/color */
    .message-content-wrapper { display: flex; flex-direction: column; max-width: calc(100% - 44px); }
    .user-message .message-content-wrapper { align-items: flex-end; }
    .ai-message .message-content-wrapper { align-items: flex-start; }

    .message-bubble {
      padding: 0.625rem 0.875rem; border-radius: var(--radius-lg); box-shadow: var(--shadow-sm); /* Softer shadow */
      word-break: break-word; line-height: 1.6; font-size: 0.9rem; /* Slightly smaller base font */
      position: relative;
    }
    .user-message .message-bubble { background-color: hsl(var(--primary)); color: hsl(var(--primary-foreground)); border-bottom-right-radius: var(--radius-sm); }
    .ai-message .message-bubble { background-color: hsl(var(--card)); border: 1px solid hsl(var(--border)); border-bottom-left-radius: var(--radius-sm); color: hsl(var(--card-foreground)); }
    
    /* Prose styling within message bubbles */
    .message-bubble .prose { color: inherit; font-size: inherit; max-width: none; }
    .message-bubble .prose p, .message-bubble .prose ul, .message-bubble .prose ol, 
    .message-bubble .prose blockquote, .message-bubble .prose pre { margin-top: 0.5em; margin-bottom: 0.5em; }
    .message-bubble .prose h1, .message-bubble .prose h2, .message-bubble .prose h3,
    .message-bubble .prose h4, .message-bubble .prose h5, .message-bubble .prose h6 { 
        margin-top: 0.8em; margin-bottom: 0.4em; font-family: var(--font-heading); font-weight:600; color: inherit; 
        border-bottom: 1px solid hsl(var(--border)/0.3); padding-bottom: 0.15em;
    }
    .message-bubble .prose code { background-color: hsl(var(--muted)/0.5); padding: 0.1em 0.3em; border-radius: var(--radius-sm); font-size: 0.875em; color: hsl(var(--accent-foreground));}
    .dark .message-bubble .prose code { background-color: hsl(var(--muted)/0.15); }
    .message-bubble .prose pre { background-color: hsl(var(--muted)/0.3); padding: 0.625rem; border-radius: var(--radius-md); overflow-x: auto; font-size: 0.875em; }
    .dark .message-bubble .prose pre { background-color: hsl(var(--muted)/0.1); }
    .message-bubble .prose pre code { background-color: transparent; padding: 0; font-size: inherit;}
    .message-bubble .prose a { color: hsl(var(--primary)); text-decoration: underline; }
    .dark .user-message .message-bubble .prose a { color: hsl(var(--primary-light)); }
    .message-bubble .prose table { margin: 0.75em 0; } /* Handled by ai-table-display */
    .message-bubble .katex-error { color: hsl(var(--destructive)); background-color: hsl(var(--destructive)/0.1); padding: 0.1em 0.3em; border-radius: var(--radius-sm); font-family: monospace; font-size:0.8em; }

    /* Styles for Structured Content cards */
    .structured-content-error, .structured-content-empty { display:flex; align-items:center; gap:0.3rem; font-style:italic; font-size:0.8rem; color:hsl(var(--muted-foreground)); padding:0.5rem; background-color:hsl(var(--muted)/0.2); border-radius:var(--radius-md); }
    .structured-content-error .lucide { color:hsl(var(--destructive)); }
    
    .ai-table-display { margin: 0.5em 0; overflow-x: auto; border-radius: var(--radius-md); border: 1px solid hsl(var(--border)); background-color: hsl(var(--background)); box-shadow: var(--shadow-xs); }
    .ai-table-display th, .ai-table-display td { padding: 0.5rem 0.75rem; text-align: left; border-bottom: 1px solid hsl(var(--border)); }
    .ai-table-display th { background-color: hsl(var(--muted)/0.2); font-weight: 600; color: hsl(var(--foreground)); }
    .ai-table-display td { color: hsl(var(--muted-foreground)); }
    .ai-table-display tr:last-child td { border-bottom: none; }

    .ai-activity-list, .ai-question-list, .ai-objectives-list, .ai-udl-analysis { margin: 0.5em 0; }
    .ai-activity-card, .ai-question-card, .ai-objective-card, .ai-udl-analysis { 
        padding: 0.75rem; border: 1px solid hsl(var(--border)); border-radius: var(--radius-lg); 
        background-color: hsl(var(--background)); box-shadow: var(--shadow-xs);
    }
    .activity-card-header, .question-card-header, .objective-header, .udl-analysis-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem; }
    .activity-title, .objective-text, .udl-principle-title { font-weight: 600; font-family:var(--font-heading); color: hsl(var(--foreground)); }
    .activity-description, .activity-rationale, .objective-rationale, .objective-alignment, .udl-checkpoint, .udl-rationale, .question-justification, .question-rubric { font-size: 0.8rem; color: hsl(var(--muted-foreground)); margin-bottom: 0.3rem; }
    .activity-materials, .udl-suggestions { font-size: 0.8rem; margin-top: 0.5rem; }
    .activity-materials ul, .udl-suggestions ul { list-style-type: disc; padding-left: 1.25rem; color: hsl(var(--muted-foreground)); }
    .activity-tags { margin-top: 0.5rem; display: flex; flex-wrap: wrap; gap: 0.375rem; align-items: center;}
    .activity-tags strong { font-size:0.75rem; color: hsl(var(--muted-foreground));}
    .activity-tags .badge { font-size: 0.7rem; padding: 0.1rem 0.4rem; }
    .question-options { list-style: none; padding-left: 0.25rem; margin: 0.5rem 0; font-size: 0.85rem; color: hsl(var(--muted-foreground)); }
    .question-options .option-letter { font-weight:500; color:hsl(var(--foreground)); margin-right:0.3rem;}
    .question-options .correct-answer { color: hsl(var(--green-600)); font-weight: 500; } /* Assuming green for correct */
    .dark .question-options .correct-answer { color: hsl(var(--green-400)); }
    .question-meta { display:flex; flex-wrap:wrap; gap:0.5rem; margin-top:0.5rem; }
    .meta-badge { font-size:0.7rem; font-weight:500; display:flex; align-items:center; gap:0.25rem; }
    .meta-badge .lucide { width:12px; height:12px; }
    .bloom-badge { background-color:hsl(var(--blue-500)/0.1); border-color:hsl(var(--blue-500)/0.3); color:hsl(var(--blue-600));}
    .dok-badge { background-color:hsl(var(--sky-500)/0.1); border-color:hsl(var(--sky-500)/0.3); color:hsl(var(--sky-600));}


    .message-timestamp { font-size: 0.65rem; color: hsl(var(--muted-foreground)); margin-top: 0.375rem; padding: 0 0.125rem; }
    
    .source-attribution-list { font-size: 0.7rem; color: hsl(var(--muted-foreground)); margin-top: 0.625rem; padding-top: 0.625rem; border-top: 1px dashed hsl(var(--border)); }
    .source-attribution-list .list-title { font-semibold text-xs flex items-center; color: hsl(var(--foreground)); }
    .source-attribution-list .lucide-layers { width: 0.8em; height: 0.8em; margin-right: 0.25rem; opacity: 0.8; color: hsl(var(--primary)); }
    .source-item { display: flex; align-items: center; gap: 0.25rem; padding: 0.05rem 0; }
    .source-item .lucide { width: 0.75em; height: 0.75em; opacity: 0.7; }

    .message-actions-toolbar {
      display: flex; gap: 0.125rem; position: absolute; top: 3px; right: 3px;
      opacity: 0; transition: opacity 0.2s ease-in-out;
      background-color: hsl(var(--card) / 0.7); backdrop-filter: blur(1px);
      padding: 2px; border-radius: var(--radius-sm); box-shadow: var(--shadow-sm); border: 1px solid hsl(var(--border));
    }
    .ai-message .message-bubble:hover .message-actions-toolbar, .user-message .message-bubble:hover .message-actions-toolbar { opacity: 1; }
    .message-action-btn { color: hsl(var(--muted-foreground)); padding: 0.125rem; height: 20px; width: 20px; }
    .message-action-btn:hover { color: hsl(var(--primary)); background-color: hsl(var(--primary)/0.1); }

    /* Loading animation for AI message */
    .ai-thinking-dots span {
        display: inline-block; width: 5px; height: 5px; margin: 0 1px;
        background-color: currentColor; border-radius: 50%;
        animation: aiThinkingBounce 1.4s infinite ease-in-out both;
    }
    .ai-thinking-dots span:nth-child(1) { animation-delay: -0.32s; }
    .ai-thinking-dots span:nth-child(2) { animation-delay: -0.16s; }
    @keyframes aiThinkingBounce {
        0%, 80%, 100% { transform: scale(0); }
        40% { transform: scale(1.0); }
    }




     .ai-blooms-analysis-report { 
        padding: 0.75rem; border: 1px solid hsl(var(--blue-500)/0.3); border-radius: var(--radius-lg); 
        background-color: hsl(var(--blue-500)/0.05); box-shadow: var(--shadow-xs); margin: 0.5em 0;
    }
    .analysis-report-header { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; }
    .analysis-report-title { font-weight: 600; font-family:var(--font-heading); color: hsl(var(--blue-600)); dark:color: hsl(var(--blue-400)); font-size: 1rem;}
    .analysis-snippet { font-size: 0.8rem; color: hsl(var(--muted-foreground)); margin-bottom: 0.75rem; background-color: hsl(var(--muted)/0.2); padding: 0.3rem 0.5rem; border-radius: var(--radius-sm); }
    .analysis-snippet em { color: hsl(var(--foreground)); }
    .analysis-section { margin-bottom: 0.75rem; }
    .analysis-section strong { display: block; font-size: 0.8rem; font-weight: 500; color: hsl(var(--foreground)); margin-bottom: 0.25rem; }
    .analysis-text { font-size: 0.85rem; color: hsl(var(--muted-foreground)); line-height: 1.5; }
    .coverage-bars { display: flex; flex-direction: column; gap: 0.25rem; margin-top: 0.25rem; }
    .coverage-bar-item { display: grid; grid-template-columns: 70px 1fr; align-items: center; gap: 0.5rem; font-size: 0.75rem;}
    .coverage-level-label { text-align: right; color: hsl(var(--muted-foreground)); font-weight:500;}
    .coverage-bar-track { background-color: hsl(var(--muted)/0.3); border-radius: var(--radius-sm); height: 14px; overflow:hidden; position:relative;}
    .coverage-bar-fill { 
        background-color: hsl(var(--blue-500)); height: 100%; border-radius: var(--radius-sm); 
        transition: width 0.5s ease-out; color: white; font-size:0.6rem; line-height:14px; text-align:right; padding-right:3px;
        white-space:nowrap;
    }
    .analysis-examples-list { list-style: disc; padding-left: 1.25rem; font-size: 0.8rem; color: hsl(var(--muted-foreground));}
    .analysis-examples-list li { margin-bottom: 0.25rem; }

  `}</style>
);

const ChatMessages = ({ messages }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).format(date);
  };

  marked.setOptions({
    gfm: true, breaks: true, smartypants: true,
    mangle: false, headerIds: false
  });

  const renderMessageContent = (message) => {
    if (message.isGenerating) {
      return (
        <div className="flex items-center space-x-2 text-sm opacity-80">
          <div className="ai-thinking-dots"><span></span><span></span><span></span></div>
          <span className="italic">{typeof message.text === 'string' && message.text.length < 30 ? message.text : "Thinking..."}</span>
        </div>
      );
    }

    if (message.user === 'assistant' && message.structuredContent) {
      const sc = message.structuredContent;
      switch (sc.type) {
        case 'table': return <TableDisplay data={sc.data} />;
        case 'activity_suggestion_list': return <ActivitySuggestionListDisplay data={sc.data} />;
        case 'question_list': return <QuestionListDisplay data={sc.data} />;
        case 'objectives_list': return <ObjectivesListDisplay data={sc.data} />;
        case 'udl_analysis': return <UdlAnalysisDisplay data={sc.data} />;
        case 'simple_text': return <SimpleTextDisplay data={sc.data} />;
        // ADD THIS NEW CASE:
        case 'blooms_analysis_report': return <BloomsAnalysisReportDisplay data={sc.data} />;
        default:
          // Fallback for unknown structured content type
          console.warn(`Unsupported structuredOutput type received: ${sc.type}`, sc); // Log the problematic content
          if (typeof message.summaryText === 'string' && message.summaryText.trim()) {
            return <SimpleTextDisplay data={{ text: `(Summary for unhandled type '${sc.type}'): ${message.summaryText}` }} />;
          }
          return <pre className="text-xs bg-muted/10 p-2 rounded overflow-x-auto whitespace-pre-wrap border border-dashed border-destructive/50">Unsupported structuredOutput (type: {sc.type || 'empty/undefined'}): {JSON.stringify(sc.data || sc, null, 2)}</pre>;
      }
    }

    // Fallback for user messages or AI messages without handled structuredContent (should be rare for AI)
    let textToRender = message.text; // For user message, `text` is `userQuery`
    if (message.user === 'assistant' && (!textToRender || !textToRender.trim()) && message.summaryText && message.summaryText.trim()) {
      textToRender = message.summaryText; // AI fallback if structured output wasn't simple_text
    }

    if (!textToRender || !textToRender.trim()) {
      return <p className="italic text-muted-foreground flex items-center gap-1 text-sm"><AlertTriangle size={14} className="text-orange-400" /> [Content not available]</p>;
    }

    return <SimpleTextDisplay data={{ text: textToRender }} />;
  };

  const handleCopyToClipboard = (message) => {
    let textToCopy = "";
    // Attempt to create a meaningful text representation for copying
    if (message.structuredContent) {
      const sc = message.structuredContent;
      if (sc.type === 'question_list' && Array.isArray(sc.data)) {
        textToCopy = sc.data.map(q =>
          `Q: ${q.questionText || q.question || ""}\nOptions: ${q.options ? q.options.join(', ') : 'N/A'}\nBloom: ${q.bloomLevel || 'N/A'}\nDOK: ${q.dokLevel || 'N/A'}\nJustification: ${q.justification || 'N/A'}`
        ).join('\n\n');
      } else if (sc.type === 'activity_suggestion_list' && Array.isArray(sc.data)) {
        textToCopy = sc.data.map(a =>
          `Activity: ${a.title}\nDescription: ${a.description}\nRationale: ${a.pedagogicalRationale}`
        ).join('\n\n');
      } else if (sc.type === 'simple_text' && sc.data?.text) {
        textToCopy = sc.data.text;
      } else if (message.summaryText) { // Fallback to summary if specific structured text isn't available
        textToCopy = message.summaryText;
      } else { // Generic stringify for other types
        try { textToCopy = JSON.stringify(sc, null, 2); } catch (e) { textToCopy = "Could not serialize content."; }
      }
    } else if (message.summaryText) { // If no structured content, use summary
      textToCopy = message.summaryText;
    } else if (message.text) { // Finally, use raw text (mostly for user messages)
      textToCopy = message.text;
    }

    if (!textToCopy || !textToCopy.trim()) {
      toast.error("Nothing to copy for this message.", { icon: <AlertTriangle size={16} /> });
      return;
    }
    navigator.clipboard.writeText(textToCopy)
      .then(() => toast.success("Content copied to clipboard!", { icon: <Copy size={16} />, duration: 2000 }))
      .catch(err => toast.error("Failed to copy content."));
  };

  return (
    <TooltipProvider>
      <ChatMessagesStyles />
      <div className="space-y-0">
        {(messages || []).map((message, index) => (
          <div
            key={message.id || `msg-fallback-${index}`}
            className={`message-bubble-container ${message.user === 'me' ? 'user-message' : 'ai-message'} animate-fade-in-up`}
            style={{ animationDuration: '0.25s', animationDelay: `${Math.min(index * 0.05, 0.5)}s` }}
          >
            <Avatar className={`message-avatar self-start`}> {/* Align avatar to top */}
              <AvatarImage src={message.user === 'me' ? undefined : undefined} /> {/* Placeholder for actual avatar URLs */}
              <AvatarFallback className={`${message.user === 'me' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent-foreground'}`}>
                {message.user === 'me' ? <User size={16} /> : <Bot size={16} />}
              </AvatarFallback>
            </Avatar>

            <div className="message-content-wrapper">
              <div className="message-bubble group">
                {!message.isGenerating && (message.text || message.summaryText || message.structuredContent) && (
                  <div className="message-actions-toolbar">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="message-action-btn" onClick={() => handleCopyToClipboard(message)}>
                          <Copy size={12} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="p-1.5 text-xs"><p>Copy Content</p></TooltipContent>
                    </Tooltip>
                  </div>
                )}
                {renderMessageContent(message)}

                {message.user === 'assistant' && Array.isArray(message.usedSources) && message.usedSources.length > 0 && (
                  <div className="source-attribution-list">
                    <p className="list-title"><Layers /> Sources Consulted:</p>
                    <ul className="mt-0.5 space-y-px">
                      {message.usedSources.map((source, i) => (
                        <li key={source.id || i} className="source-item" title={source.name}>
                          {source.type === 'document' ? <FileText size={11} className="text-blue-500" /> : <BookCopy size={11} className="text-green-500" />}
                          <span className="truncate text-xs">{source.name || `Source ${i + 1}`}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {message.timestamp && !message.isGenerating && (
                <p className="message-timestamp">
                  {formatTime(message.timestamp)}
                </p>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </TooltipProvider>
  );
};

export default ChatMessages;