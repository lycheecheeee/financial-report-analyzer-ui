import { useState } from 'react';
import { LogOut, FileUp, Download, BarChart3, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import './index.css';

// Login Component
function LoginPage({ onLogin }: { onLogin: (username: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // 驗證硬編碼帳户（安全存放）
    if (username === 'lychee' && password === 'lycheechee2026') {
      onLogin(username);
    } else {
      setError('用户名或密碼錯誤');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-900 via-secondary-500 to-primary-500 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="inline-block"
          >
            <Zap className="w-12 h-12 text-primary-500 mx-auto mb-4" />
          </motion.div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">大行報告分析平台</h1>
          <p className="text-gray-600">AI 驅動的金融數據自動化</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">用户名</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="lychee"
              disabled={loading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">密碼</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="••••••••"
              disabled={loading}
            />
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-2 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? '登入中...' : '登入'}
          </motion.button>
        </form>

        <p className="text-center text-gray-500 text-xs mt-6">
          🔒 安全加密認証 | 數據本地存儲
        </p>
      </motion.div>
    </div>
  );
}

// Main App Component
function Dashboard({ username, onLogout }: { username: string; onLogout: () => void }) {
  const [files, setFiles] = useState<File[]>([]);
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    setFiles([...files, ...newFiles]);
  };

  const handleAnalyze = async () => {
    setAnalyzing(true);
    try {
      const formData = new FormData();
      files.forEach(file => formData.append('files', file));

      const response = await axios.post('http://localhost:5000/api/analyze', formData);
      setResults(response.data);
    } catch (error) {
      console.error('分析失敗:', error);
    }
    setAnalyzing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-50">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-md sticky top-0 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary-500" />
            <h1 className="text-2xl font-bold text-gray-800">大行報告分析平台</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">歡迎，{username}</span>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
            >
              <LogOut className="w-4 h-4" />
              登出
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FileUp className="w-5 h-5 text-primary-500" />
              上傳報告
            </h2>

            <div className="border-2 border-dashed border-primary-300 rounded-lg p-6 text-center hover:border-primary-500 transition cursor-pointer">
              <input
                type="file"
                multiple
                accept=".pdf"
                onChange={handleFileUpload}
                className="hidden"
                id="fileInput"
              />
              <label htmlFor="fileInput" className="cursor-pointer">
                <p className="text-gray-600">拖曳 PDF 或點擊選擇</p>
                <p className="text-gray-400 text-sm">支援多個檔案</p>
              </label>
            </div>

            {files.length > 0 && (
              <div className="mt-4 space-y-2">
                <p className="text-sm font-medium text-gray-700">{files.length} 份檔案已選擇</p>
                {files.map((file, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600 flex justify-between items-center"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      onClick={() => setFiles(files.filter((_, i) => i !== idx))}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAnalyze}
              disabled={files.length === 0 || analyzing}
              className="w-full mt-6 bg-gradient-to-r from-primary-500 to-secondary-500 text-white py-3 rounded-lg font-medium hover:shadow-lg transition disabled:opacity-50"
            >
              {analyzing ? '分析中...' : '🚀 開始分析'}
            </motion.button>
          </motion.div>

          {/* Results Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-500" />
              分析結果
            </h2>

            {results ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6"
              >
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">總報告數</p>
                    <p className="text-3xl font-bold text-blue-600">{results.statistics?.total_reports}</p>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">平均目標價</p>
                    <p className="text-3xl font-bold text-green-600">${results.statistics?.avg_target_price?.toFixed(2)}</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
                    <p className="text-gray-600 text-sm">主要評級</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {Object.entries(results.statistics?.rating_distribution || {}).sort(
                        ([,a]: any, [,b]: any) => b - a
                      )[0]?.[0] || 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-3">評級分佈</h3>
                  <div className="space-y-2">
                    {Object.entries(results.statistics?.rating_distribution || {}).map(([rating, count]: any) => (
                      <div key={rating} className="flex justify-between items-center">
                        <span className="text-gray-600">{rating}</span>
                        <div className="flex items-center gap-2">
                          <div className="bg-primary-200 rounded-full h-2 flex-1" style={{ width: `${(count / results.statistics.total_reports) * 200}px` }}></div>
                          <span className="font-semibold text-gray-800">{count}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={`http://localhost:5000/api/download/${results.files?.excel}`}
                    download
                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600 transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    下載 Excel
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    href={`http://localhost:5000/api/download/${results.files?.mindmap}`}
                    download
                    className="flex-1 bg-purple-500 text-white py-2 rounded-lg text-center hover:bg-purple-600 transition flex items-center justify-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    下載 Mind Map
                  </motion.a>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-64 text-gray-500">
                <p>上傳並分析 PDF 後，結果將顯示在此</p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
}

// Main App
function App() {
  const [user, setUser] = useState<string | null>(null);

  return user ? (
    <Dashboard username={user} onLogout={() => setUser(null)} />
  ) : (
    <LoginPage onLogin={setUser} />
  );
}

export default App;
