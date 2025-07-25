import React, { useState, useRef, useEffect } from 'react';
import { 
  Save, 
  FileText, 
  RotateCcw, 
  FolderOpen, 
  Search, 
  Replace, 
  Settings, 
  Code,
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Copy,
  Scissors,
  ClipboardPaste,
  Undo,
  Redo,
  ZoomIn,
  ZoomOut,
  FileCode,
  Terminal as TerminalIcon,
  Palette,
  Indent,
  AlignLeft,
  Bug,
  Lightbulb,
  Brackets,
  Hash,
  Type,
  GitBranch,
  Play,
  Square
} from 'lucide-react';
import Editor from '@monaco-editor/react';

interface FileTab {
  id: string;
  name: string;
  content: string;
  language: string;
  modified: boolean;
}

const Terminal: React.FC = () => {
  // Load files from localStorage or use default
  const loadFilesFromStorage = (): FileTab[] => {
    try {
      const savedFiles = localStorage.getItem('fallout-editor-files');
      if (savedFiles) {
        return JSON.parse(savedFiles);
      }
    } catch (error) {
      console.error('Error loading files from localStorage:', error);
    }
    
    // Default file if nothing in storage
    return [
      {
        id: '1',
        name: 'main.js',
        content: '// Welcome to Fallout Code Editor\n// Start coding your post-apocalyptic software...\n\nconsole.log("Hello, Wasteland!");',
        language: 'javascript',
        modified: false
      }
    ];
  };

  const loadActiveFileId = (): string => {
    try {
      const savedActiveId = localStorage.getItem('fallout-editor-active-file');
      if (savedActiveId) {
        return savedActiveId;
      }
    } catch (error) {
      console.error('Error loading active file ID from localStorage:', error);
    }
    return '1';
  };

  const [files, setFiles] = useState<FileTab[]>(loadFilesFromStorage);
  const [activeFileId, setActiveFileId] = useState(loadActiveFileId);
  const [showSaved, setShowSaved] = useState(false);
  const [showReplace, setShowReplace] = useState(false);
  const [replaceTerm, setReplaceTerm] = useState('');
  const [fontSize, setFontSize] = useState(14);
  const [wordWrap, setWordWrap] = useState(true);
  const [minimap, setMinimap] = useState(true);
  const [showSettings, setShowSettings] = useState(false);
  const [theme, setTheme] = useState('fallout-dark');
  const [autoSave, setAutoSave] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [showWhitespace, setShowWhitespace] = useState(false);
  const [enableAutocomplete, setEnableAutocomplete] = useState(true);
  const [enableLinting, setEnableLinting] = useState(true);
  const [tabSize, setTabSize] = useState(2);
  const [insertSpaces, setInsertSpaces] = useState(true);
  const [enableBracketMatching, setEnableBracketMatching] = useState(true);
  const [enableCodeFolding, setEnableCodeFolding] = useState(true);
  const [showIndentGuides, setShowIndentGuides] = useState(true);
  const [enableEmmet, setEnableEmmet] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('fallout-dark');
  
  const editorRef = useRef<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeFile = files.find(f => f.id === activeFileId);

  // Save files to localStorage
  const saveFilesToStorage = (filesToSave: FileTab[]) => {
    try {
      localStorage.setItem('fallout-editor-files', JSON.stringify(filesToSave));
    } catch (error) {
      console.error('Error saving files to localStorage:', error);
    }
  };

  // Save active file ID to localStorage
  const saveActiveFileId = (fileId: string) => {
    try {
      localStorage.setItem('fallout-editor-active-file', fileId);
    } catch (error) {
      console.error('Error saving active file ID to localStorage:', error);
    }
  };

  // Auto-save function
  const performAutoSave = (updatedFiles: FileTab[]) => {
    saveFilesToStorage(updatedFiles);
    
    // Show auto-save indicator
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 1000);
  };

  const getLanguageFromExtension = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase();
    const languageMap: { [key: string]: string } = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'java': 'java',
      'cpp': 'cpp',
      'c': 'c',
      'cs': 'csharp',
      'php': 'php',
      'rb': 'ruby',
      'go': 'go',
      'rs': 'rust',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'json': 'json',
      'xml': 'xml',
      'md': 'markdown',
      'sql': 'sql',
      'sh': 'shell',
      'yml': 'yaml',
      'yaml': 'yaml',
    };
    return languageMap[ext || ''] || 'plaintext';
  };

  const handleEditorChange = (value: string | undefined) => {
    if (!value || !activeFile) return;
    
    setFiles(prev => {
      const updatedFiles = prev.map(file => 
        file.id === activeFileId 
          ? { ...file, content: value, modified: true }
          : file
      );
      
      // Clear previous auto-save timeout
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      
      // Set new auto-save timeout
      autoSaveTimeoutRef.current = setTimeout(() => {
        performAutoSave(updatedFiles);
      }, 2000); // Auto-save after 2 seconds of inactivity
      
      return updatedFiles;
    });
  };

  const handleSave = () => {
    if (!activeFile) return;
    
    const blob = new Blob([activeFile.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = activeFile.name;
    a.click();
    URL.revokeObjectURL(url);
    
    // Mark as saved
    setFiles(prev => {
      const updatedFiles = prev.map(file => 
        file.id === activeFileId 
          ? { ...file, modified: false }
          : file
      );
      saveFilesToStorage(updatedFiles);
      return updatedFiles;
    });
    
    setShowSaved(true);
    setTimeout(() => setShowSaved(false), 2000);
  };

  const handleNewFile = () => {
    const newId = Date.now().toString();
    const newFile: FileTab = {
      id: newId,
      name: `untitled-${files.length + 1}.txt`,
      content: '',
      language: 'plaintext',
      modified: false
    };
    setFiles(prev => {
      const updatedFiles = [...prev, newFile];
      saveFilesToStorage(updatedFiles);
      return updatedFiles;
    });
    setActiveFileId(newId);
    saveActiveFileId(newId);
  };

  const handleOpenFile = () => {
    fileInputRef.current?.click();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      const newId = Date.now().toString();
      const newFile: FileTab = {
        id: newId,
        name: file.name,
        content,
        language: getLanguageFromExtension(file.name),
        modified: false
      };
      setFiles(prev => {
        const updatedFiles = [...prev, newFile];
        saveFilesToStorage(updatedFiles);
        return updatedFiles;
      });
      setActiveFileId(newId);
      saveActiveFileId(newId);
    };
    reader.readAsText(file);
  };

  const handleCloseFile = (fileId: string) => {
    if (files.length === 1) return; // Keep at least one file
    
    setFiles(prev => {
      const updatedFiles = prev.filter(f => f.id !== fileId);
      saveFilesToStorage(updatedFiles);
      return updatedFiles;
    });
    
    if (fileId === activeFileId) {
      const remainingFiles = files.filter(f => f.id !== fileId);
      const newActiveId = remainingFiles[0]?.id || '';
      setActiveFileId(newActiveId);
      saveActiveFileId(newActiveId);
    }
  };

  const handleSearch = () => {
    if (!editorRef.current) return;
    editorRef.current.getAction('actions.find').run();
  };

  const handleReplace = () => {
    if (!editorRef.current) return;
    editorRef.current.getAction('editor.action.startFindReplaceAction').run();
  };

  const handleUndo = () => {
    editorRef.current?.trigger('keyboard', 'undo', null);
  };

  const handleRedo = () => {
    editorRef.current?.trigger('keyboard', 'redo', null);
  };

  const handleCopy = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.clipboardCopyAction');
    if (action) action.run();
  };

  const handleCut = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.clipboardCutAction');
    if (action) action.run();
  };

  const handlePaste = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.clipboardPasteAction');
    if (action) action.run();
  };

  const handleZoomIn = () => {
    setFontSize(prev => Math.min(prev + 2, 24));
  };

  const handleZoomOut = () => {
    setFontSize(prev => Math.max(prev - 2, 10));
  };

  const handleFormatDocument = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.formatDocument');
    if (action) action.run();
  };

  const handleToggleComment = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.commentLine');
    if (action) action.run();
  };

  const handleGoToLine = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.gotoLine');
    if (action) action.run();
  };

  const handleToggleBrackets = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.jumpToBracket');
    if (action) action.run();
  };

  const handleSelectAll = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.selectAll');
    if (action) action.run();
  };

  const handleDuplicateLine = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.copyLinesDownAction');
    if (action) action.run();
  };

  const handleMoveLinesUp = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.moveLinesUpAction');
    if (action) action.run();
  };

  const handleMoveLinesDown = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.moveLinesDownAction');
    if (action) action.run();
  };

  const handleIndentLines = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.indentLines');
    if (action) action.run();
  };

  const handleOutdentLines = () => {
    if (!editorRef.current) return;
    const action = editorRef.current.getAction('editor.action.outdentLines');
    if (action) action.run();
  };

  const handleToggleWordWrap = () => {
    setWordWrap(!wordWrap);
  };

  const handleChangeTheme = (newTheme: string) => {
    setCurrentTheme(newTheme);
    if (editorRef.current) {
      const monaco = (window as any).monaco;
      if (monaco) {
        monaco.editor.setTheme(newTheme);
      }
    }
  };

  // Auto-save functionality
  useEffect(() => {
    // Save active file ID when it changes
    saveActiveFileId(activeFileId);
  }, [activeFileId]);

  // Cleanup auto-save timeout on unmount
  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  // Handle tab switching with local storage
  const handleTabSwitch = (fileId: string) => {
    setActiveFileId(fileId);
    saveActiveFileId(fileId);
  };

  const getStats = () => {
    if (!activeFile) return { chars: 0, words: 0, lines: 0 };
    const content = activeFile.content;
    const chars = content.length;
    const words = content.trim() === '' ? 0 : content.trim().split(/\s+/).length;
    const lines = content === '' ? 0 : content.split('\n').length;
    return { chars, words, lines };
  };

  const { chars, words, lines } = getStats();

  return (
    <div className="terminal-container">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept=".txt,.js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.cs,.php,.rb,.go,.rs,.html,.css,.scss,.json,.xml,.md,.sql,.sh,.yml,.yaml"
      />
      
      <div className="terminal-header">
        <div className="terminal-title">
          <FileCode size={16} />
          <span className="title-text">FALLOUT CODE EDITOR v3.0.1</span>
        </div>
        <div className="terminal-controls">
          <button onClick={handleNewFile} className="terminal-btn" title="Novo Arquivo">
            <FileText size={14} />
          </button>
          <button onClick={handleOpenFile} className="terminal-btn" title="Abrir Arquivo">
            <FolderOpen size={14} />
          </button>
          <button onClick={handleSave} className="terminal-btn" title="Salvar Arquivo">
            <Save size={14} />
          </button>
          <div className="btn-separator"></div>
          <button onClick={handleUndo} className="terminal-btn" title="Desfazer">
            <Undo size={14} />
          </button>
          <button onClick={handleRedo} className="terminal-btn" title="Refazer">
            <Redo size={14} />
          </button>
          <div className="btn-separator"></div>
          <button onClick={handleCopy} className="terminal-btn" title="Copiar">
            <Copy size={14} />
          </button>
          <button onClick={handlePaste} className="terminal-btn" title="Colar">
            <ClipboardPaste size={14} />
          </button>
          <div className="btn-separator"></div>
          <button onClick={handleSearch} className="terminal-btn" title="Pesquisar">
            <Search size={14} />
          </button>
          <button onClick={handleReplace} className="terminal-btn" title="Substituir">
            <Replace size={14} />
          </button>
          <div className="btn-separator"></div>
          <button onClick={handleZoomOut} className="terminal-btn" title="Diminuir Zoom">
            <ZoomOut size={14} />
          </button>
          <button onClick={handleZoomIn} className="terminal-btn" title="Aumentar Zoom">
            <ZoomIn size={14} />
          </button>
          <div className="btn-separator"></div>
          <button onClick={handleFormatDocument} className="terminal-btn" title="Formatar Código">
            <AlignLeft size={14} />
          </button>
          <button onClick={handleToggleComment} className="terminal-btn" title="Comentar/Descomentar">
            <Hash size={14} />
          </button>
          <button onClick={handleToggleBrackets} className="terminal-btn" title="Ir para Bracket">
            <Brackets size={14} />
          </button>
          <div className="btn-separator"></div>
          <button onClick={() => setShowSettings(!showSettings)} className="terminal-btn" title="Configurações">
            <Settings size={14} />
          </button>
        </div>
      </div>

      {showSettings && (
        <div className="settings-panel">
          <div className="setting-group">
            <label>
              <input
                type="checkbox"
                checked={wordWrap}
                onChange={(e) => setWordWrap(e.target.checked)}
              />
              Word Wrap
            </label>
            <label>
              <input
                type="checkbox"
                checked={minimap}
                onChange={(e) => setMinimap(e.target.checked)}
              />
              Minimap
            </label>
          </div>
          <div className="setting-group">
            <label>
              Font Size: {fontSize}px
              <input
                type="range"
                min="10"
                max="24"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
              />
            </label>
          </div>
        </div>
      )}

      <div className="file-tabs">
        {files.map(file => (
          <div
            key={file.id}
            className={`file-tab ${file.id === activeFileId ? 'active' : ''}`}
            onClick={() => handleTabSwitch(file.id)}
          >
            <span className="tab-name">
              {file.name}
              {file.modified && <span className="modified-indicator">*</span>}
            </span>
            {files.length > 1 && (
              <button
                className="close-tab"
                onClick={(e) => {
                  e.stopPropagation();
                  handleCloseFile(file.id);
                }}
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="editor-container">
        <Editor
          height="100%"
          language={activeFile?.language || 'plaintext'}
          value={activeFile?.content || ''}
          onChange={handleEditorChange}
          onMount={(editor, monaco) => {
            editorRef.current = editor;
            monaco.editor.defineTheme('fallout-dark', {
              base: 'vs-dark',
              inherit: true,
              rules: [
                { token: 'comment', foreground: '00aa2a', fontStyle: 'italic' },
                { token: 'keyword', foreground: '00ff41', fontStyle: 'bold' },
                { token: 'string', foreground: '00cc33' },
                { token: 'number', foreground: '00ff66' },
                { token: 'operator', foreground: '00ff41' },
                { token: 'identifier', foreground: '00dd44' },
              ],
              colors: {
                'editor.background': '#000800',
                'editor.foreground': '#00ff41',
                'editor.lineHighlightBackground': '#001100',
                'editor.selectionBackground': '#00aa2a40',
                'editorCursor.foreground': '#00ff41',
                'editorLineNumber.foreground': '#00aa2a',
                'editorLineNumber.activeForeground': '#00ff41',
                'editor.findMatchBackground': '#00ff4140',
                'editor.findMatchHighlightBackground': '#00aa2a40',
              }
            });
            monaco.editor.setTheme('fallout-dark');
          }}
          options={{
            fontSize,
            fontFamily: "'VT323', 'Courier New', monospace",
            wordWrap: wordWrap ? 'on' : 'off',
            minimap: { enabled: minimap },
            scrollBeyondLastLine: false,
            automaticLayout: true,
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: true,
            folding: true,
            lineNumbers: 'on',
            renderWhitespace: 'selection',
            cursorBlinking: 'blink',
            cursorStyle: 'block',
            selectOnLineNumbers: true,
            roundedSelection: false,
            readOnly: false,
            theme: 'fallout-dark'
          }}
        />
      </div>

      <div className="terminal-status">
        <div className="status-left">
          <span>LANG: {activeFile?.language?.toUpperCase() || 'PLAINTEXT'}</span>
          <span>CHARS: {chars}</span>
          <span>WORDS: {words}</span>
          <span>LINES: {lines}</span>
          <span>SIZE: {fontSize}px</span>
          <span>TAB: {tabSize}</span>
          <span>SPACES: {insertSpaces ? 'ON' : 'OFF'}</span>
          <span className="auto-save-indicator">AUTO-SAVE: ON</span>
        </div>
        <div className="status-right">
          {showSaved && <span className="saved-indicator">AUTO-SAVED</span>}
          <span>THEME: {currentTheme.toUpperCase()}</span>
          <span>READY</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;