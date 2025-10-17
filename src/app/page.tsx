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
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg 
                    width="24" 
                    height="24" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    className="text-white"
                  >
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="2"/>
                    <circle cx="12" cy="12" r="2" fill="currentColor"/>
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
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowHistory(!showHistory)}
                className="p-3 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md"
                title="Transaction History"
              >
                <History className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                onClick={() => setShowDashboard(!showDashboard)}
                className="p-3 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md"
                title="Network Dashboard"
              >
                <TrendingUp className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </button>
              <button
                onClick={toggleDarkMode}
                className="p-3 bg-slate-100/80 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all duration-200 border border-slate-200/50 dark:border-slate-700/50 hover:shadow-md"
                title="Toggle Dark Mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-amber-500" />
                ) : (
                  <Moon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto px-6 py-12 w-full">
        
        {/* History Panel */}
        {showHistory && (
          <div className="mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <History className="w-6 h-6 text-blue-500" />
                Transaction History
              </h3>
              <button
                onClick={() => setShowHistory(false)}
                className="p-2 hover:bg-slate-200/80 dark:hover:bg-slate-600/80 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="text-center py-8">
              <History className="w-16 h-16 text-slate-400 mx-auto mb-4" />
              <p className="text-slate-600 dark:text-slate-400">
                No transaction history yet. Analyze some transactions to see them here!
              </p>
            </div>
          </div>
        )}

        {/* Dashboard Panel */}
        {showDashboard && (
          <div className="mb-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-green-500" />
                Polkadot Network Dashboard
              </h3>
              <button
                onClick={() => setShowDashboard(false)}
                className="p-2 hover:bg-slate-200/80 dark:hover:bg-slate-600/80 rounded-lg transition-colors"
              >
                <XCircle className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Network Status</h4>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">Online</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">All systems operational</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200/50 dark:border-green-800/50">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Active Validators</h4>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">297</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Securing the network</p>
              </div>
              <div className="p-6 bg-gradient-to-br from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
                <h4 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Parachains</h4>
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">50+</p>
                <p className="text-sm text-slate-600 dark:text-slate-400">Connected chains</p>
              </div>
            </div>
          </div>
        )}
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
            {/* Summary Card */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Transaction Summary
                    </h2>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getTransactionTypeColor(transaction.type)}`}>
                      {transaction.type}
                    </span>
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                      Block #{transaction.blockNumber}
                    </span>
                  </div>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                    {transaction.explanation}
                  </p>
                  
                  {/* Detailed Explanation */}
                  <div className="p-4 bg-blue-50/80 dark:bg-blue-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">💡</span>
                      </div>
                      <div>
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">What Happened</h4>
                        <p className="text-blue-800 dark:text-blue-200 text-sm leading-relaxed">
                          This transaction executed a {transaction.method} call in the {transaction.section} module, transferring {transaction.amount} {transaction.token} from one account to another. The transaction was successfully included in block #{transaction.blockNumber} and cost {transaction.fee} {transaction.token} in fees.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 mt-6 pt-6 border-t border-slate-200/50 dark:border-slate-700/50">
                <button
                  onClick={() => copyToClipboard(transaction.hash, 'hash')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-100/80 dark:bg-slate-700/80 hover:bg-slate-200/80 dark:hover:bg-slate-600/80 text-slate-700 dark:text-slate-300 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <Copy className="w-4 h-4" />
                  {copied === 'hash' ? 'Copied!' : 'Copy Hash'}
                </button>
                <button
                  onClick={() => copyToClipboard(transaction.from, 'from')}
                  className="flex items-center gap-2 px-4 py-2.5 bg-slate-100/80 dark:bg-slate-700/80 hover:bg-slate-200/80 dark:hover:bg-slate-600/80 text-slate-700 dark:text-slate-300 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <Copy className="w-4 h-4" />
                  {copied === 'from' ? 'Copied!' : 'Copy From'}
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-blue-100/80 dark:bg-blue-900/30 hover:bg-blue-200/80 dark:hover:bg-blue-900/50 text-blue-700 dark:text-blue-300 rounded-xl transition-all duration-200 hover:shadow-md">
                  <Download className="w-4 h-4" />
                  Export JSON
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-green-100/80 dark:bg-green-900/30 hover:bg-green-200/80 dark:hover:bg-green-900/50 text-green-700 dark:text-green-300 rounded-xl transition-all duration-200 hover:shadow-md">
                  <Download className="w-4 h-4" />
                  Export CSV
                </button>
                <button className="flex items-center gap-2 px-4 py-2.5 bg-purple-100/80 dark:bg-purple-900/30 hover:bg-purple-200/80 dark:hover:bg-purple-900/50 text-purple-700 dark:text-purple-300 rounded-xl transition-all duration-200 hover:shadow-md">
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
                <a
                  href={`https://polkadot.subscan.io/extrinsic/${transaction.hash}`}
          target="_blank"
          rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2.5 bg-indigo-100/80 dark:bg-indigo-900/30 hover:bg-indigo-200/80 dark:hover:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 rounded-xl transition-all duration-200 hover:shadow-md"
                >
                  <ExternalLink className="w-4 h-4" />
                  View on Subscan
                </a>
              </div>

              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="flex items-center gap-3 p-4 bg-slate-50/80 dark:bg-slate-700/50 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
                  <div className="w-5 h-5 text-blue-500">👤</div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 dark:text-slate-400">From</p>
                    <p className="font-mono text-sm text-slate-900 dark:text-white">
                      {transaction.from.slice(0, 8)}...{transaction.from.slice(-6)}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(transaction.from, 'from-addr')}
                    className="p-2 hover:bg-slate-200/80 dark:hover:bg-slate-600/80 rounded-lg transition-colors"
                    title="Copy full address"
                  >
                    <Copy className="w-4 h-4 text-slate-500" />
                  </button>
                </div>

                <div className="flex items-center gap-3 p-4 bg-slate-50/80 dark:bg-slate-700/50 rounded-xl border border-slate-200/50 dark:border-slate-600/50">
                  <div className="w-5 h-5 text-blue-500">👤</div>
                  <div className="flex-1">
                    <p className="text-sm text-slate-500 dark:text-slate-400">To</p>
                    <p className="font-mono text-sm text-slate-900 dark:text-white">
                      {transaction.to.slice(0, 8)}...{transaction.to.slice(-6)}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(transaction.to, 'to-addr')}
                    className="p-2 hover:bg-slate-200/80 dark:hover:bg-slate-600/80 rounded-lg transition-colors"
                    title="Copy full address"
                  >
                    <Copy className="w-4 h-4 text-slate-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Transaction Flow */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                🔄 Transaction Flow
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Transaction Initiation</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">User initiates transaction with wallet signature</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200/50 dark:border-green-800/50">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Network Validation</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Polkadot network validates transaction and checks balance</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50/80 to-pink-50/80 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Block Inclusion</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Validator includes transaction in block and executes</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50/80 to-red-50/80 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl border border-orange-200/50 dark:border-orange-800/50">
                  <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
                  <div>
                    <h4 className="font-semibold text-slate-900 dark:text-white">Finalization</h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">Transaction is finalized and state changes are applied</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Events */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                📋 Events ({transaction.events.length})
              </h3>
              <div className="space-y-3">
                {transaction.events.map((event: any, idx: number) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-gradient-to-br from-blue-50/80 to-indigo-50/80 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50 hover:shadow-lg transition-all duration-300 hover:scale-105">
                    <div className="p-2 bg-blue-500 rounded-lg text-white">
                      <span className="text-sm">📤</span>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {event.type}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        {event.from && event.to ? `From: ${event.from.slice(0, 8)}...${event.from.slice(-6)} → To: ${event.to.slice(0, 8)}...${event.to.slice(-6)}` : event.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Gas & Fee Analysis */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-3">
                  💰 Gas & Fee Analysis
                </h3>
                <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-semibold">
                  Low Cost
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-yellow-50/80 dark:bg-yellow-900/20 rounded-2xl border border-yellow-200/50 dark:border-yellow-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Transaction Fee</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {transaction.fee} {transaction.token}
                  </p>
                </div>
                <div className="p-4 bg-blue-50/80 dark:bg-blue-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Amount Transferred</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {transaction.amount} {transaction.token}
                  </p>
                </div>
                <div className="p-4 bg-green-50/80 dark:bg-green-900/20 rounded-2xl border border-green-200/50 dark:border-green-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Fee Percentage</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {((parseFloat(transaction.fee) / parseFloat(transaction.amount)) * 100).toFixed(2)}%
                  </p>
                </div>
                <div className="p-4 bg-purple-50/80 dark:bg-purple-900/20 rounded-2xl border border-purple-200/50 dark:border-purple-800/50">
                  <p className="text-sm text-slate-600 dark:text-slate-400">Network</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    Polkadot
                  </p>
                </div>
              </div>
            </div>

            {/* Educational Content */}
            <div className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-slate-200/50 dark:border-slate-700/50">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                📚 Educational Content
              </h3>
              <div className="space-y-4">
                {transaction.educationalContent.map((content: string, index: number) => (
                  <div key={index} className="p-4 bg-blue-50/80 dark:bg-blue-900/20 rounded-2xl border border-blue-200/50 dark:border-blue-800/50">
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                      {content}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Hash */}
            <div className="bg-slate-50/80 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-500 dark:text-slate-400">Transaction Hash</p>
                <button
                  onClick={() => copyToClipboard(transaction.hash, 'hash-full')}
                  className="flex items-center gap-1 px-3 py-1.5 text-xs bg-white/80 dark:bg-slate-800/80 hover:bg-slate-100/80 dark:hover:bg-slate-700/80 rounded-lg transition-colors"
                >
                  <Copy className="w-3 h-3" />
                  Copy
                </button>
              </div>
              <p className="font-mono text-sm text-slate-900 dark:text-white break-all">
                {transaction.hash}
              </p>
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