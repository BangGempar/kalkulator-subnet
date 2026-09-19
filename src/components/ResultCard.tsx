

import { CopyButton } from './CopyButton';

interface Row {
  label: string;
  value: string | number | null;
  copyable?: boolean;
}

interface Props {
  title: string;
  rows: Row[];
}

export function ResultCard({ title, rows }: Props) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg overflow-hidden shadow-sm">
      <div className="bg-slate-50 dark:bg-slate-950 px-4 py-3 border-b border-slate-200 dark:border-slate-800">
        <h3 className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300 tracking-wider">
          <span className="text-orange-500 mr-2">{"//"}</span>
          {title}
        </h3>
      </div>
      <div className="divide-y divide-slate-100 dark:divide-slate-800">
        {rows.map((row, i) => (
          <div key={i} className="px-4 py-3 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
            <span className="text-sm text-slate-600 dark:text-slate-400">{row.label}</span>
            <div className="flex items-center gap-3">
              <span className="text-sm font-mono text-slate-900 dark:text-slate-100 font-medium">
                {row.value ?? '-'}
              </span>
              {row.copyable && row.value && (
                <CopyButton value={String(row.value)} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
