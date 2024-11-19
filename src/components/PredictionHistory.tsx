import React, { useState } from 'react';
import { Table, Trash2, Eye, Trash } from 'lucide-react';
import { SavedPrediction } from '../types';

interface PredictionHistoryProps {
  predictions: SavedPrediction[];
  onDelete: (id: string) => void;
  onView: (prediction: SavedPrediction) => void;
  onClearAll: () => void;
}

const PredictionHistory: React.FC<PredictionHistoryProps> = ({ 
  predictions, 
  onDelete, 
  onView,
  onClearAll 
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [predictionToDelete, setPredictionToDelete] = useState<SavedPrediction | null>(null);

  if (predictions.length === 0) {
    return null;
  }

  const handleDeleteClick = (prediction: SavedPrediction) => {
    setPredictionToDelete(prediction);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (predictionToDelete) {
      onDelete(predictionToDelete.id);
      setShowDeleteModal(false);
      setPredictionToDelete(null);
    }
  };

  return (
    <div className="mt-8 backdrop-blur-lg bg-black/30 rounded-xl border border-emerald-500/20 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Table className="text-emerald-500" />
          <h2 className="text-xl font-bold text-white">Historial de Predicciones</h2>
        </div>
        <button
          onClick={onClearAll}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
        >
          <Trash size={18} />
          Limpiar Todo
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-200">
          <thead className="text-xs uppercase bg-emerald-900/40">
            <tr>
              <th className="px-4 py-3">Equipos</th>
              <th className="px-4 py-3">1</th>
              <th className="px-4 py-3">x</th>
              <th className="px-4 py-3">2</th>
              <th className="px-4 py-3">HT</th>
              <th className="px-4 py-3">Over 2.5</th>
              <th className="px-4 py-3">BTS</th>
              <th className="px-4 py-3">Recomendación</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {predictions.map((prediction) => (
              <tr key={prediction.id} className="border-b border-emerald-800/20">
                <td className="px-4 py-3">{prediction.teams}</td>
                <td className="px-4 py-3">{prediction.homeWin}%</td>
                <td className="px-4 py-3">{prediction.draw}%</td>
                <td className="px-4 py-3">{prediction.awayWin}%</td>
                <td className="px-4 py-3">{prediction.htAverage}%</td>
                <td className="px-4 py-3">{prediction.over25Average}%</td>
                <td className="px-4 py-3">{prediction.btsAverage}%</td>
                <td className="px-4 py-3">
                  <span
                     className={`px-2 py-1 rounded-full text-xs font-medium ${
                      prediction.recommendation.includes('Apostar') // Verifica si la recomendación incluye "Apostar"
                        ? 'bg-green-500/20 text-green-400' // Verde para "Apostar"
                        : 'bg-red-500/20 text-red-400' // Rojo para "No Apostar"
                    }`}
                  >
                    {prediction.recommendation}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(prediction)}
                      className="text-emerald-400 hover:text-emerald-300 transition-colors"
                      title="Ver detalles"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(prediction)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Eliminar"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de confirmación de eliminación */}
      {showDeleteModal && predictionToDelete && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-xl border border-emerald-500/20 p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-white mb-4">Confirmar Eliminación</h3>
            <p className="text-gray-300 mb-6">
              ¿Estás seguro de que deseas eliminar la predicción del partido
              <span className="font-semibold text-emerald-400"> {predictionToDelete.teams}</span>?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PredictionHistory;