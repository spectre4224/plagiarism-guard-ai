import React, { useState, useRef } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, Search, Shield, Zap, Users, Eye, Download } from 'lucide-react';

interface PlagiarismResult {
  file1: string;
  file2: string;
  similarity: number;
}

interface UploadedFile {
  name: string;
  content: string;
  id: string;
}

function App() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [results, setResults] = useState<PlagiarismResult[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = async (fileList: File[]) => {
    const textFiles = fileList.filter(file => 
      file.type === 'text/plain' || file.name.endsWith('.txt')
    );

    const newFiles: UploadedFile[] = [];
    
    for (const file of textFiles) {
      const content = await file.text();
      newFiles.push({
        name: file.name,
        content,
        id: Math.random().toString(36).substr(2, 9)
      });
    }

    setFiles(prev => [...prev, ...newFiles]);
  };

  const calculateSimilarity = (text1: string, text2: string): number => {
    // Simple similarity calculation for demo
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    const set1 = new Set(words1);
    const set2 = new Set(words2);
    
    const intersection = new Set([...set1].filter(x => set2.has(x)));
    const union = new Set([...set1, ...set2]);
    
    return intersection.size / union.size;
  };

  const analyzeFiles = async () => {
    if (files.length < 2) return;
    
    setIsAnalyzing(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const plagiarismResults: PlagiarismResult[] = [];
    
    for (let i = 0; i < files.length; i++) {
      for (let j = i + 1; j < files.length; j++) {
        const similarity = calculateSimilarity(files[i].content, files[j].content);
        plagiarismResults.push({
          file1: files[i].name,
          file2: files[j].name,
          similarity: similarity
        });
      }
    }
    
    setResults(plagiarismResults.sort((a, b) => b.similarity - a.similarity));
    setIsAnalyzing(false);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    setResults([]);
  };

  const getSeverityColor = (similarity: number) => {
    if (similarity > 0.7) return 'text-red-600 bg-red-50 border-red-200';
    if (similarity > 0.4) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-green-600 bg-green-50 border-green-200';
  };

  const getSeverityIcon = (similarity: number) => {
    if (similarity > 0.7) return <AlertTriangle className="w-5 h-5" />;
    if (similarity > 0.4) return <Eye className="w-5 h-5" />;
    return <CheckCircle className="w-5 h-5" />;
  };

  const getSeverityText = (similarity: number) => {
    if (similarity > 0.7) return 'High Risk';
    if (similarity > 0.4) return 'Medium Risk';
    return 'Low Risk';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">PlagiarismGuard AI</h1>
                <p className="text-sm text-gray-600">Advanced Content Protection</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-blue-500" />
                <span>AI-Powered</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-purple-500" />
                <span>Trusted by 10k+ Authors</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Combat Online Plagiarism with AI
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            The internet is flooded with content, making it challenging to spot plagiarism. 
            Our AI-powered tool helps authors and news organizations quickly detect copied content, 
            safeguarding original work.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <span className="text-gray-700">✓ Real-time Analysis</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <span className="text-gray-700">✓ Multiple File Support</span>
            </div>
            <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200">
              <span className="text-gray-700">✓ Detailed Reports</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Upload className="w-6 h-6 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">Upload Documents</h3>
            </div>

            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
                dragActive 
                  ? 'border-blue-400 bg-blue-50' 
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="bg-gray-100 p-4 rounded-full">
                  <FileText className="w-8 h-8 text-gray-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900 mb-2">
                    Drop your text files here
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    or click to browse your computer
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200"
                  >
                    Choose Files
                  </button>
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept=".txt"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>

            {/* Uploaded Files */}
            {files.length > 0 && (
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">
                  Uploaded Files ({files.length})
                </h4>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {files.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                    >
                      <div className="flex items-center space-x-3">
                        <FileText className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-medium text-gray-900">
                          {file.name}
                        </span>
                      </div>
                      <button
                        onClick={() => removeFile(file.id)}
                        className="text-red-500 hover:text-red-700 text-sm font-medium"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Analyze Button */}
            <div className="mt-6">
              <button
                onClick={analyzeFiles}
                disabled={files.length < 2 || isAnalyzing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-400 text-white py-3 px-6 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2"
              >
                {isAnalyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    <span>Analyze for Plagiarism</span>
                  </>
                )}
              </button>
              {files.length < 2 && (
                <p className="text-sm text-gray-500 mt-2 text-center">
                  Upload at least 2 files to start analysis
                </p>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
            <div className="flex items-center space-x-3 mb-6">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
              <h3 className="text-xl font-semibold text-gray-900">Analysis Results</h3>
            </div>

            {results.length === 0 ? (
              <div className="text-center py-12">
                <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <p className="text-gray-500 mb-2">No analysis results yet</p>
                <p className="text-sm text-gray-400">
                  Upload files and click analyze to see plagiarism detection results
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${getSeverityColor(result.similarity)}`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {getSeverityIcon(result.similarity)}
                        <span className="font-medium">
                          {getSeverityText(result.similarity)}
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold">
                          {(result.similarity * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs opacity-75">Similarity</div>
                      </div>
                    </div>
                    <div className="text-sm">
                      <p className="mb-1">
                        <span className="font-medium">File 1:</span> {result.file1}
                      </p>
                      <p>
                        <span className="font-medium">File 2:</span> {result.file2}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {results.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Report</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Why Choose PlagiarismGuard AI?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Lightning Fast</h4>
              <p className="text-gray-600 text-sm">
                Advanced AI algorithms provide instant plagiarism detection results
              </p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Secure & Private</h4>
              <p className="text-gray-600 text-sm">
                Your documents are processed securely and never stored permanently
              </p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Trusted by Professionals</h4>
              <p className="text-gray-600 text-sm">
                Used by authors, journalists, and educational institutions worldwide
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            Don't let plagiarism go unnoticed; empower yourself with our plagiarism detection software.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2025 PlagiarismGuard AI. Protecting original content worldwide.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;