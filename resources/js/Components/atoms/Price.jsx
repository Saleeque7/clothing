import { clsx } from 'clsx';

export default function Price({ original, sale, className = '' }) {
  const hasSale = sale && sale < original;
  return (
    <div className={clsx('flex items-baseline gap-2', className)}>
      <span className="font-bold text-gray-900">₹{sale ?? original}</span>
      {hasSale && (
        <span className="text-sm text-gray-400 line-through">₹{original}</span>
      )}
    </div>
  );
}
