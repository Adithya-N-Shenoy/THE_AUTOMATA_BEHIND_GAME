import React, { useState } from 'react';
import { runAutomataTestSuite } from '../../automata/testSuite';
import { TestResult } from '../../types/automata';
import { X, Play, CheckCircle2, XCircle, ShieldCheck, Cpu } from 'lucide-react';
import { sound } from '../../sound/audio';

interface TestSuiteModalProps {
  onClose: () => void;
}

export const TestSuiteModal: React.FC<TestSuiteModalProps> = ({ onClose }) => {
  const [results, setResults] = useState<TestResult[]>(() => runAutomataTestSuite());
  const [isRunning, setIsRunning] = useState(false);

  const handleReRun = () => {
    setIsRunning(true);
    sound.playTap();
    setTimeout(() => {
      const res = runAutomataTestSuite();
      setResults(res);
      setIsRunning(false);
      sound.playComboSuccess();
    }, 400);
  };

  const totalPassed = results.filter((r) => r.passed).length;
  const allPassed = totalPassed === results.length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-4xl max-h-[88vh] rounded-2xl bg-[#10182B] border-2 border-[#00FF9C]/40 flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#1E293B] bg-[#0A0E1A]">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-[#00FF9C]/10 border border-[#00FF9C]/30 text-[#00FF9C]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-tech text-white flex items-center gap-2">
                AUTOMATA ACADEMIC VERIFICATION MATRIX
              </h3>
              <p className="text-xs text-[#8FA3B8]">
                Empirical test suite executing on actual DFA, NFA, Moore, Mealy, and Regex models.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#8FA3B8] hover:text-white hover:bg-[#1E293B] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Stats Strip */}
        <div className="p-4 bg-[#0D1424] border-b border-[#1E293B] flex items-center justify-between">
          <div className="flex items-center gap-4 text-xs font-mono">
            <div>
              STATUS:{' '}
              <span className={`font-bold ${allPassed ? 'text-[#00FF9C]' : 'text-[#FF2E88]'}`}>
                {allPassed ? '100% ALL TESTS PASSED' : `${totalPassed} / ${results.length} PASSED`}
              </span>
            </div>
            <span className="text-[#8FA3B8]">|</span>
            <div className="text-[#8FA3B8]">
              TESTS RUN: <strong className="text-white">{results.length} CASES</strong>
            </div>
          </div>

          <button
            onClick={handleReRun}
            disabled={isRunning}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#00FF9C] hover:bg-[#00FF9C]/90 text-black font-mono font-bold text-xs transition-all cursor-pointer disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-black" />
            <span>{isRunning ? 'Executing...' : 'Re-Run Suite'}</span>
          </button>
        </div>

        {/* Results Table */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {results.map((res) => (
            <div
              key={res.id}
              className={`p-3.5 rounded-xl border flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs font-mono transition-all ${
                res.passed
                  ? 'bg-[#0A0E1A] border-[#00FF9C]/20 hover:border-[#00FF9C]/40'
                  : 'bg-[#FF2E88]/5 border-[#FF2E88]/40'
              }`}
            >
              <div className="flex items-start gap-3">
                <span
                  className={`mt-0.5 p-1 rounded-full ${
                    res.passed ? 'bg-[#00FF9C]/20 text-[#00FF9C]' : 'bg-[#FF2E88]/20 text-[#FF2E88]'
                  }`}
                >
                  {res.passed ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] bg-[#1E293B] text-[#38BDF8] font-bold">
                      {res.id}
                    </span>
                    <span className="font-bold text-white text-sm">{res.name}</span>
                    <span className="text-[10px] text-[#8FA3B8]">({res.category})</span>
                  </div>
                  <div className="text-[#8FA3B8] text-[11px] mt-1">
                    Input: <code className="text-[#38BDF8]">{res.input}</code>
                  </div>
                  <div className="text-[11px] text-[#8FA3B8] mt-0.5">{res.details}</div>
                </div>
              </div>

              <div className="flex flex-col md:items-end text-[11px] shrink-0">
                <span className="text-[#8FA3B8]">Expected: {String(res.expected)}</span>
                <span className={res.passed ? 'text-[#00FF9C] font-bold' : 'text-[#FF2E88] font-bold'}>
                  Actual: {String(res.actual)}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#1E293B] bg-[#0A0E1A] flex items-center justify-between text-xs font-mono text-[#8FA3B8]">
          <span>CS3703 Theory of Computation · Mathematical Invariant Check</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-[#1E293B] hover:bg-[#2A374F] text-white transition-all cursor-pointer"
          >
            Close Matrix
          </button>
        </div>
      </div>
    </div>
  );
};
