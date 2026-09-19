
import { useState, useEffect } from 'react';
import { useSubnetCalculator } from './hooks/useSubnetCalculator';
import { ResultCard } from './components/ResultCard';
import { BinaryVisualization } from './components/BinaryVisualization';
import { Moon, Sun, AlertCircle } from 'lucide-react';
import { formatNumber } from './utils/format';

function App() {
  const {
    ip, setIp, cidr, setCidr, mask, setMask, mode, setMode,
    result, error, calculate, reset
  } = useSubnetCalculator();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(isDark);
  }, []);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    calculate();
  };

  const loadExample = (exIp: string, exCidr: string) => {
    setIp(exIp);
    setCidr(exCidr);
    setMode('cidr');
    setTimeout(() => calculate(), 0);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 font-sans">
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white font-mono font-bold">
              IP
            </div>
            <h1 className="text-xl font-semibold text-slate-900 dark:text-white">
              IPv4 Subnet Calculator
            </h1>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-800 rounded transition-colors"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 rounded-lg p-6 shadow-sm">
            <div className="flex gap-4 mb-6">
              <button
                className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                  mode === 'cidr' 
                    ? 'border-blue-500 text-blue-500' 
                    : 'border-transparent text-slate-600 hover:text-black font-semibold dark:hover:text-slate-300'
                }`}
                onClick={() => setMode('cidr')}
              >
                CIDR
              </button>
              <button
                className={`flex-1 pb-2 text-sm font-medium border-b-2 transition-colors ${
                  mode === 'mask' 
                    ? 'border-blue-500 text-blue-500' 
                    : 'border-transparent text-slate-600 hover:text-black font-semibold dark:hover:text-slate-300'
                }`}
                onClick={() => setMode('mask')}
              >
                Subnet Mask
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-900 font-bold dark:text-slate-300 mb-1">
                  IP Address
                </label>
                <input
                  type="text"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  className="w-full px-3 py-2 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 text-black dark:text-slate-100 font-semibold focus:ring-blue-500 font-mono text-sm"
                  placeholder="192.168.1.10"
                />
              </div>

              {mode === 'cidr' ? (
                <div>
                  <label className="block text-sm font-medium text-slate-900 font-bold dark:text-slate-300 mb-1">
                    CIDR Prefix
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2 text-slate-400 font-mono">/</span>
                    <input
                      type="text"
                      value={cidr}
                      onChange={(e) => setCidr(e.target.value)}
                      className="w-full pl-7 pr-3 py-2 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 text-black dark:text-slate-100 font-semibold focus:ring-blue-500 font-mono text-sm"
                      placeholder="24"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-slate-900 font-bold dark:text-slate-300 mb-1">
                    Subnet Mask
                  </label>
                  <input
                    type="text"
                    value={mask}
                    onChange={(e) => setMask(e.target.value)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-950 border-2 border-slate-300 dark:border-slate-700 rounded-md focus:outline-none focus:ring-2 text-black dark:text-slate-100 font-semibold focus:ring-blue-500 font-mono text-sm"
                    placeholder="255.255.255.0"
                  />
                </div>
              )}

              {error && (
                <div className="p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm rounded-md flex items-start gap-2">
                  <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 hover:bg-slate-800 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors"
                >
                  Calculate
                </button>
                <button
                  type="button"
                  onClick={reset}
                  className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 font-medium rounded-md transition-colors"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-800 rounded-lg p-6 shadow-sm">
            <h3 className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4 tracking-wider">
              <span className="text-blue-500 mr-2">01 //</span> EXAMPLES
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { ip: '10.0.0.1', cidr: '8' },
                { ip: '172.16.10.20', cidr: '16' },
                { ip: '192.168.1.100', cidr: '24' },
                { ip: '10.10.10.10', cidr: '30' },
                { ip: '10.10.10.10', cidr: '31' }
              ].map((ex, i) => (
                <button
                  key={i}
                  onClick={() => loadExample(ex.ip, ex.cidr)}
                  className="px-2.5 py-1 text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-slate-700 rounded transition-colors"
                >
                  {ex.ip}/{ex.cidr}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-8 space-y-6">
          {!result ? (
            <div className="h-full min-h-[400px] flex items-center justify-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg text-slate-400 dark:text-slate-500">
              <p>Enter an IP address and CIDR prefix to see results.</p>
            </div>
          ) : (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <ResultCard
                title="02 // NETWORK INFORMATION"
                rows={[
                  { label: 'IP Address', value: result.ipAddress, copyable: true },
                  { label: 'CIDR', value: `/${result.cidr}`, copyable: true },
                  { label: 'Subnet Mask', value: result.subnetMask, copyable: true },
                  { label: 'Wildcard Mask', value: result.wildcardMask, copyable: true },
                ]}
              />

              <ResultCard
                title="03 // ADDRESS RANGE"
                rows={[
                  { label: 'Network Address', value: result.networkAddress, copyable: true },
                  { label: 'First Host', value: result.firstHost, copyable: true },
                  { label: 'Last Host', value: result.lastHost, copyable: true },
                  { label: 'Broadcast Address', value: result.broadcastAddress, copyable: true },
                ]}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ResultCard
                  title="04 // CAPACITY"
                  rows={[
                    { label: 'Total Addresses', value: formatNumber(result.totalAddresses) },
                    { label: 'Usable Hosts', value: formatNumber(result.usableHosts) },
                    { label: 'Host Bits', value: result.hostBits },
                  ]}
                />
                
                <ResultCard
                  title="05 // CLASSIFICATION"
                  rows={[
                    { label: 'Legacy Class', value: result.addressClass },
                    { label: 'Address Type', value: result.addressType },
                  ]}
                />
              </div>

              {result.cidr === 31 && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-lg border border-blue-200 dark:border-blue-800/30">
                  <strong>Note:</strong> /31 is commonly used for point-to-point links. Both addresses are considered usable hosts.
                </div>
              )}
              
              {result.cidr === 32 && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200 text-sm rounded-lg border border-blue-200 dark:border-blue-800/30">
                  <strong>Note:</strong> /32 represents a single IPv4 address.
                </div>
              )}

              <BinaryVisualization
                ipBinary={result.ipBinary}
                maskBinary={result.subnetMaskBinary}
                prefix={result.prefixLength}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
