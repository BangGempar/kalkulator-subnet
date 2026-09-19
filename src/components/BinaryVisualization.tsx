


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
    <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-800 shadow-sm text-slate-300">
      <div className="bg-slate-950 px-4 py-3 border-b border-slate-800">
        <h3 className="font-mono text-sm font-semibold text-slate-300 tracking-wider">
          <span className="text-orange-500 mr-2">{"//"}</span>
          BINARY
        </h3>
      </div>
      <div className="p-4 overflow-x-auto">
        <div className="min-w-max font-mono text-sm grid gap-2">
          <div className="flex gap-4">
            <span className="w-12 text-slate-500">IP</span>
            <span>{ipBinary}</span>
          </div>
          <div className="flex gap-4">
            <span className="w-12 text-slate-500">MASK</span>
            <span>{maskBinary}</span>
          </div>
          <div className="flex gap-4 mt-2 pt-2 border-t border-slate-800">
            <span className="w-12 text-slate-500">BITS</span>
            <span className="text-orange-400">{legend}</span>
          </div>
        </div>
      </div>
      <div className="bg-slate-950 px-4 py-2 text-xs text-slate-500 font-mono">
        N = Network bit, H = Host bit
      </div>
    </div>
  );
}
