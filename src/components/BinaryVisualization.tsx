
interface Props {
  ipBinary: string;
  maskBinary: string;
  prefix: number;
}

export function BinaryVisualization({ ipBinary, maskBinary, prefix }: Props) {
  const generateLegend = () => {
    let legend = '';
    for (let i = 0; i < 32; i++) {
      legend += i < prefix ? 'N' : 'H';
      if (i % 8 === 7 && i !== 31) legend += '.';
    }
    return legend;
  };

  const legend = generateLegend();

  return (
    <div className="bg-white dark:bg-slate-900 rounded-lg overflow-hidden border-2 border-slate-300 dark:border-slate-800 shadow-sm text-slate-900 dark:text-slate-300">
      <div className="bg-slate-100 dark:bg-slate-950 px-4 py-3 border-b-2 border-slate-300 dark:border-slate-800">
        <h3 className="font-mono text-sm font-bold text-slate-900 dark:text-slate-300 tracking-wider">
          <span className="text-blue-600 dark:text-blue-500 mr-2">06 //</span> BINARY
        </h3>
      </div>
      <div className="p-4 overflow-x-auto">
        <div className="min-w-max font-mono text-sm grid gap-2 font-semibold">
          <div className="flex gap-4">
            <span className="w-12 text-slate-700 dark:text-slate-500">IP</span>
            <span className="text-black dark:text-slate-300">{ipBinary}</span>
          </div>
          <div className="flex gap-4">
            <span className="w-12 text-slate-700 dark:text-slate-500">MASK</span>
            <span className="text-black dark:text-slate-300">{maskBinary}</span>
          </div>
          <div className="flex gap-4 mt-2 pt-2 border-t-2 border-slate-300 dark:border-slate-800">
            <span className="w-12 text-slate-700 dark:text-slate-500">BITS</span>
            <span className="text-blue-600 dark:text-blue-400">{legend}</span>
          </div>
        </div>
      </div>
      <div className="bg-slate-100 dark:bg-slate-950 px-4 py-2 text-xs text-slate-700 dark:text-slate-500 font-mono font-semibold border-t-2 border-slate-300 dark:border-slate-800">
        N = Network bit, H = Host bit
      </div>
    </div>
  );
}
