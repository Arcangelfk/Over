import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatInputProps {
  label: string;
  description: string;
  value: number;
  onChange: (value: number) => void;
  icon: LucideIcon;
}

const StatInput: React.FC<StatInputProps> = ({ label, description, value, onChange, icon: Icon }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value === '' ? 0 : Math.min(100, Math.max(0, Number(e.target.value)));
    onChange(newValue);
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-2">
        <Icon className="text-emerald-400" size={18} />
        <label className="text-emerald-100 text-sm">{label}</label>
      </div>
      <div className="relative flex items-center">
        <input
          type="number"
          min="0"
          max="100"
          value={value || ''}
          onChange={handleChange}
          className="w-full pl-4 pr-12 py-2 bg-white/10 border border-emerald-600/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-white"
          placeholder="0"
        />
        <span className="absolute right-3 text-emerald-400">%</span>
      </div>
      <p className="text-xs text-emerald-300/80 mt-1">{description}</p>
    </div>
  );
};

export default StatInput;