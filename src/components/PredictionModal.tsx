import React from 'react';
import { X, AlertTriangle, Save } from 'lucide-react';
import { TeamStats } from '../types';

interface PredictionModalProps {
  homeTeam: TeamStats;
  awayTeam: TeamStats;
  onClose: () => void;
  onSave?: () => void;
  onDelete?: () => void;
  matchProbabilities: {
    homeWin: number;
    draw: number;
    awayWin: number;
  };
}

const PredictionModal: React.FC<PredictionModalProps> = ({
  homeTeam,
  awayTeam,
  onClose,
  onSave,
  matchProbabilities,
}) => {
  const calculateAverage = (stat1: number, stat2: number) => {
    return ((Number(stat1) + Number(stat2)) / 2).toFixed(1);
  };

  const htAverage = Number(calculateAverage(homeTeam.ht, awayTeam.ht));
  const over25Average = Number(calculateAverage(homeTeam.over25, awayTeam.over25));
  const btsAverage = Number(calculateAverage(homeTeam.bts, awayTeam.bts));

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl border border-emerald-500/20 p-6 max-w-3xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6 pr-8">Detalles del Partido</h2>
        
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4 bg-emerald-900/40 p-4 rounded-lg">
            <h3 className="text-xl text-emerald-400 font-bold">{homeTeam.name}</h3>
            <h3 className="text-lg text-white font-bold">vs</h3>
            <h3 className="text-xl text-emerald-400 font-bold">{awayTeam.name}</h3>
          </div>
        </div>

        <div className="space-y-6 mb-8">
          <div className="bg-emerald-900/40 p-4 rounded-lg">
            <h4 className="text-white font-semibold mb-4 text-lg">Probabilidades del Partido</h4>
            <div className="grid grid-cols-3 gap-6">
              <div className="text-center p-3 bg-emerald-800/30 rounded-lg">
                <p className="text-emerald-300 mb-2">Victoria Local</p>
                <p className="text-3xl font-bold text-white">{matchProbabilities.homeWin}%</p>
              </div>
              <div className="text-center p-3 bg-emerald-800/30 rounded-lg">
                <p className="text-emerald-300 mb-2">Empate</p>
                <p className="text-3xl font-bold text-white">{matchProbabilities.draw}%</p>
              </div>
              <div className="text-center p-3 bg-emerald-800/30 rounded-lg">
                <p className="text-emerald-300 mb-2">Victoria Visitante</p>
                <p className="text-3xl font-bold text-white">{matchProbabilities.awayWin}%</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-900/40 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Más de 2.5 Goles</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-emerald-300">Local:</p>
                  <p className="text-white font-bold">{homeTeam.over25}%</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-emerald-300">Visitante:</p>
                  <p className="text-white font-bold">{awayTeam.over25}%</p>
                </div>
                <div className="pt-2 border-t border-emerald-800/30">
                  <div className="flex justify-between items-center">
                    <p className="text-emerald-300">Promedio:</p>
                    <p className="text-emerald-400 font-bold text-xl">
                      {calculateAverage(homeTeam.over25, awayTeam.over25)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900/40 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Ambos Equipos Marcan</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-emerald-300">Local:</p>
                  <p className="text-white font-bold">{homeTeam.bts}%</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-emerald-300">Visitante:</p>
                  <p className="text-white font-bold">{awayTeam.bts}%</p>
                </div>
                <div className="pt-2 border-t border-emerald-800/30">
                  <div className="flex justify-between items-center">
                    <p className="text-emerald-300">Promedio:</p>
                    <p className="text-emerald-400 font-bold text-xl">
                      {calculateAverage(homeTeam.bts, awayTeam.bts)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-emerald-900/40 p-4 rounded-lg">
              <h4 className="text-white font-semibold mb-4">Goles Primer Tiempo</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <p className="text-emerald-300">Local:</p>
                  <p className="text-white font-bold">{homeTeam.ht}%</p>
                </div>
                <div className="flex justify-between items-center">
                  <p className="text-emerald-300">Visitante:</p>
                  <p className="text-white font-bold">{awayTeam.ht}%</p>
                </div>
                <div className="pt-2 border-t border-emerald-800/30">
                  <div className="flex justify-between items-center">
                    <p className="text-emerald-300">Promedio:</p>
                    <p className="text-emerald-400 font-bold text-xl">
                      {calculateAverage(homeTeam.ht, awayTeam.ht)}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-emerald-900/40 p-4 rounded-lg">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2">
                <AlertTriangle className="text-yellow-500" size={20} />
                <p className="text-sm text-yellow-500">Apuesta con responsabilidad</p>
              </div>
            </div>
          </div>

          {onSave && (
            <div className="flex justify-center mt-6">
              <button
                onClick={onSave}
                className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition-colors"
              >
                <Save size={20} />
                Guardar Predicción
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PredictionModal;