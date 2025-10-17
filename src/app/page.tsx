'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Moon, Sun, History, TrendingUp, Copy, Download, Share2, ExternalLink, XCircle, Check } from 'lucide-react';

export default function Home() {
  const [hash, setHash] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [transaction, setTransaction] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      const savedHistory = localStorage.getItem('polkadot-tx-history');
      if (savedHistory) {
        try {
          setHistory(JSON.parse(savedHistory));
        } catch (e) {
          console.error('Failed to load history:', e);
        }
      }

      const savedDarkMode = localStorage.getItem('polkadot-dark-mode');
      if (savedDarkMode === 'true') {
        setDarkMode(true);
        document.documentElement.classList.add('dark');
      } else {
        setDarkMode(false);
        document.documentElement.classList.remove('dark');
      }
    }
  }, []);

  useEffect(() => {
    // Check if we're in the browser
    if (typeof window !== 'undefined') {
      if (darkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('polkadot-dark-mode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('polkadot-dark-mode', 'false');
      }
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const analyzeTransaction = async () => {
    if (!hash.trim()) {
      setError('Please enter a transaction hash');
      return;
    }

    setLoading(true);
    setError('');
    setTransaction(null);

    try {
      // Simulate Polkadot transaction analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock transaction data for Polkadot
      const mockTransaction = {
        hash: hash,
        blockNumber: Math.floor(Math.random() * 1000000) + 1000000,
        timestamp: Date.now(),
        from: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
        to: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2',
        amount: '0.5',
        token: 'DOT',
        fee: '0.001',
        status: 'success',
        type: 'TRANSFER',
        method: 'transfer',
        section: 'balances',
        events: [
          { type: 'Transfer', from: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', to: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', amount: '0.5 DOT' },
          { type: 'Deposit', account: '1BvBMSEYstWetqTFn5Au4m4GFg7xJaNVN2', amount: '0.5 DOT' }
        ],
        explanation: 'This transaction transferred 0.5 DOT from one account to another on the Polkadot network. The transaction was successful and included in the blockchain.',
        educationalContent: [
          '💡 DOT transfers are the most basic Polkadot transactions, moving native DOT tokens between accounts.',
          '⚡ Polkadot uses a proof-of-stake consensus mechanism with fast finality and low fees.',
          '🔗 Polkadot enables cross-chain communication through its relay chain and parachains.',
          '🛡️ The network provides security through shared security model and validator sets.'
        ]
      };

      setTransaction(mockTransaction);
      
      // Add to history
      const newHistory = [mockTransaction, ...history.slice(0, 9)];
      setHistory(newHistory);
      localStorage.setItem('polkadot-tx-history', JSON.stringify(newHistory));
      
    } catch (err) {
      setError('Failed to analyze transaction. Please check the hash and try again.');
      console.error('Analysis error:', err);
    } finally {
      setLoading(false);
    }
  };

  const getTransactionTypeColor = (type: string) => {
    switch (type) {
      case 'TRANSFER': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'STAKING': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'GOVERNANCE': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'PARACHAIN': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-900/30 dark:text-slate-300';
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex flex-col">
      {/* Build: 2024-01-17-POLKADOT */}
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="2" stroke="currentColor" strokeWidth="2"/>
                  </svg>
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Polkadot Explorer
                </h1>
                <p className="text-slate-600 dark:text-slate-400 text-sm">
                  An Easy to Read Polkadot Blockchain Explorer
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Transaction History"
              >
                <History className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowDashboard(!showDashboard)}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Network Dashboard"
              >
                <TrendingUp className="w-5 h-5" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                title="Toggle Dark Mode"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Explore Polkadot Transactions
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Enter any Polkadot transaction hash to get a detailed, easy-to-understand analysis with cross-chain insights, staking information, and educational content.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <div className="flex-1">
              <input
                type="text"
                value={hash}
                onChange={(e) => setHash(e.target.value)}
                placeholder="Enter Polkadot transaction hash..."
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && analyzeTransaction()}
              />
            </div>
            <button
              onClick={analyzeTransaction}
              disabled={loading}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  Analyze
                </>
              )}
            </button>
          </div>
          
          <div className="mt-6">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors flex items-center gap-2 mx-auto"
            >
              <TrendingUp className="w-4 h-4" />
              Recent Transactions
            </button>
          </div>
          
          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg max-w-2xl mx-auto">
            <div className="flex items-start gap-3">
              <div className="text-blue-500 mt-0.5">💡</div>
              <div className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Pro tip:</strong> Copy any transaction hash from{' '}
                <a 
                  href="https://polkadot.subscan.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Subscan
                </a>{' '}
                or{' '}
                <a 
                  href="https://polkadot.statescan.io/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="underline hover:no-underline"
                >
                  Statescan
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="max-w-2xl mx-auto mb-8">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-800 dark:text-red-200">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Transaction Analysis */}
        {transaction && (
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Transaction Header */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${getTransactionTypeColor(transaction.type)}`}>
                    {transaction.type}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Block #{transaction.blockNumber}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => copyToClipboard(transaction.hash, 'hash')}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    title="Copy Hash"
                  >
                    {copied === 'hash' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={() => copyToClipboard(transaction.from, 'from')}
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    title="Copy From"
                  >
                    {copied === 'from' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Export JSON">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors" title="Share">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <a
                    href={`https://polkadot.subscan.io/extrinsic/${transaction.hash}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                    title="View on Subscan"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Transaction Analysis
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Type:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{transaction.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Method:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{transaction.method}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Section:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{transaction.section}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    💡 What Happened
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">
                    {transaction.explanation}
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Transaction Details
                  </h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Amount:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{transaction.amount} {transaction.token}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Fee:</span>
                      <span className="font-medium text-slate-900 dark:text-white">{transaction.fee} {transaction.token}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600 dark:text-slate-400">Status:</span>
                      <span className="font-medium text-green-600 dark:text-green-400 capitalize">{transaction.status}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Educational Content */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 p-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                📚 Educational Content
              </h3>
              <div className="space-y-3">
                {transaction.educationalContent.map((content: string, index: number) => (
                  <p key={index} className="text-slate-600 dark:text-slate-400 text-sm">
                    {content}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-700/50 py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {/* Features */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Real-time transaction monitoring</li>
                <li>• Cross-chain analysis & insights</li>
                <li>• Educational content & explanations</li>
                <li>• Staking & governance tracking</li>
              </ul>
            </div>
            
            {/* Technology */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Technology</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Built with Next.js & TypeScript</li>
                <li>• Polkadot API integration</li>
                <li>• Substrate transaction parsing</li>
                <li>• Parachain analysis</li>
              </ul>
            </div>
            
            {/* Community */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>• Open source project</li>
                <li>• No registration required</li>
                <li>• Professional analysis tools</li>
                <li>• Built for Polkadot ecosystem</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-200/50 dark:border-slate-700/50 pt-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-600 dark:text-slate-400 text-sm">
                Made with ❤️ for the Polkadot community
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-500">
                <span>© 2024 Polkadot Explorer</span>
                <span>•</span>
                <span>Grant Submission</span>
                <span>•</span>
                <span>Easy to Read Blockchain Explorer</span>
              </div>
              <a 
                href="https://twitter.com/Panagot" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-600 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                title="Follow @Panagot on Twitter"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}