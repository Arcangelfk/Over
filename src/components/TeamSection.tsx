import React from 'react';
import { Home, Users2 } from 'lucide-react';
import StatInput from './StatInput';
import { TeamStats } from '../types';

interface TeamSectionProps {
  team: TeamStats;
  setTeam: (team: TeamStats) => void;
  title: string;
}

const TeamSection: React.FC<TeamSectionProps> = ({ team, setTeam, title }) => {
  const handleStatChange = (key: keyof TeamStats) => (value: number) => {
    setTeam({ ...team, [key]: value });
  };

  return (
    <div className="w-full md:w-1/2 p-6 backdrop-blur-lg bg-black/30 rounded-xl border border-emerald-500/20">
      <div className="flex items-center gap-2 mb-6">
        {title === 'Equipo Local' ? <Home className="text-emerald-500" /> : <Users2 className="text-emerald-500" />}
        <h2 className="text-xl font-bold text-white">{title}</h2>
      </div>
      <div className="mb-6">
        <label className="block text-emerald-100 text-sm mb-2">Nombre del Equipo</label>
        <input
          type="text"
          value={team.name}
          onChange={(e) => setTeam({ ...team, name: e.target.value })}
          className="w-full px-4 py-2 bg-white/10 border border-emerald-600/20 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none text-white"
          placeholder="Ingrese nombre del equipo"
        />
      </div>
      <StatInput
        label="Más de 2.5 Goles"
        description="Porcentaje de partidos con más de 2.5 goles"
        value={team.over25}
        onChange={handleStatChange('over25')}
        icon={Home}
      />
      <StatInput
        label="Ambos Equipos Marcan"
        description="Porcentaje de partidos donde ambos equipos anotaron"
        value={team.bts}
        onChange={handleStatChange('bts')}
        icon={Users2}
      />
      <StatInput
        label="Goles Primer Tiempo"
        description="Porcentaje de partidos con goles en el primer tiempo"
        value={team.ht}
        onChange={handleStatChange('ht')}
        icon={Users2}
      />
    </div>
  );
};

export default TeamSection;