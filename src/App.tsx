import React, { useState } from 'react';
import { Calculator, Download } from 'lucide-react'; // Asegúrate de tener un ícono de descarga
import TeamSection from './components/TeamSection';
import PredictionModal from './components/PredictionModal';
import PredictionHistory from './components/PredictionHistory';
import { TeamStats, SavedPrediction } from './types';
import * as XLSX from 'xlsx';

function App() {
  const [homeTeam, setHomeTeam] = useState<TeamStats>({
    name: '',
    over25: 0,
    bts: 0,
    ht: 0,
  });

  const [awayTeam, setAwayTeam] = useState<TeamStats>({
    name: '',
    over25: 0,
    bts: 0,
    ht: 0,
  });

  const [showModal, setShowModal] = useState(false);
  const [predictions, setPredictions] = useState<SavedPrediction[]>([]);
  const [selectedPrediction, setSelectedPrediction] = useState<SavedPrediction | null>(null);

  const canCalculate = homeTeam.name.trim() !== '' && awayTeam.name.trim() !== '';

  const calculateAverage = (stat1: number, stat2: number) => {
    return Number(((stat1 + stat2) / 2).toFixed(1));
  };

  const calculateMatchProbabilities = (home: TeamStats, away: TeamStats) => {
    // Factores de fuerza de cada equipo: HT promedio
    const HT_local = home.ht / 100; // Convertir a decimal
    const HT_visitante = away.ht / 100; // Convertir a decimal

    // Promedios de Over 2.5
    const Over_local = home.over25 / 100; // Convertir a decimal
    const Over_visitante = away.over25 / 100; // Convertir a decimal

    // Promedios de BTS
    const BTS_local = home.bts / 100; // Convertir a decimal
    const BTS_visitante = away.bts / 100; // Convertir a decimal

    // Calculando probabilidades
    const P_Local = HT_local * (1 - BTS_visitante) + Over_local;
    const P_Empate = BTS_local * BTS_visitante;
    const P_Visitante = HT_visitante * (1 - BTS_local) + Over_visitante;

    // Suma total
    const totalSum = P_Local + P_Empate + P_Visitante;

    // Normalizar las probabilidades
    const normalized_P_Local = totalSum > 0 ? P_Local / totalSum : 0;
    const normalized_P_Empate = totalSum > 0 ? P_Empate / totalSum : 0;
    const normalized_P_Visitante = totalSum > 0 ? P_Visitante / totalSum : 0;

    // Convertir a porcentajes
    return {
        homeWin: Number((normalized_P_Local * 100).toFixed(2)),  // Convertir a porcentaje
        draw: Number((normalized_P_Empate * 100).toFixed(2)),
        awayWin: Number((normalized_P_Visitante * 100).toFixed(2)),
    };
};


  const getRecommendation = (htAvg: number, over25Avg: number, btsAvg: number) => {
    if (over25Avg >= 75 && btsAvg >= 70 && htAvg >= 65) {
      return 'Apostar a Over 2.5';
    } else if (over25Avg >= 70 && btsAvg >= 70 && htAvg >= 70) {
      return 'Apostar a BTS + Over 1.5';
    } else if (over25Avg >= 70 && btsAvg >= 65 && htAvg >= 65) {
      return 'Apostar a Over 1.5';
    } else {
      return 'No Apostar';
    }
  };

  const handleSave = () => {
    const htAverage = calculateAverage(homeTeam.ht, awayTeam.ht);
    const over25Average = calculateAverage(homeTeam.over25, awayTeam.over25);
    const btsAverage = calculateAverage(homeTeam.bts, awayTeam.bts);
    const matchProbs = calculateMatchProbabilities(homeTeam, awayTeam);

    const newPrediction: SavedPrediction = {
      id: Date.now().toString(),
      teams: `${homeTeam.name} vs ${awayTeam.name}`,
      htAverage,
      over25Average,
      btsAverage,
      recommendation: getRecommendation(htAverage, over25Average, btsAverage),
      homeTeam: { ...homeTeam },
      awayTeam: { ...awayTeam },
      ...matchProbs
    };

    setPredictions([newPrediction, ...predictions]);
    setShowModal(false);
  };

  const exportToExcel = () => {
    // Define el nombre del archivo
    const fileName = 'pronosticos.xlsx';

    // Crea un nuevo libro de Excel
    const wb = XLSX.utils.book_new();
    
    // Formatea los datos para la hoja de Excel
    const sheetData = predictions.map(pred => ({
      'Partido': pred.teams,
      'Victoria Local (%)': pred.homeWin,
      'Empate (%)': pred.draw,
      'Victoria Visitante (%)': pred.awayWin,
      'HT Promedio (%)': pred.htAverage,
      'Over 2.5 Promedio (%)': pred.over25Average,
      'BTS Promedio (%)': pred.btsAverage,
      'Recomendación': pred.recommendation,
    }));

    // Convierte la data a una hoja de Excel
    const ws = XLSX.utils.json_to_sheet(sheetData);
    
    // Agrega la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, 'Pronósticos');

    // Genera el archivo y lo descarga
    XLSX.writeFile(wb, fileName);
  };

  const handleDelete = () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta predicción?');
    if (confirmed) {
      setHomeTeam({ name: '', over25: 0, bts: 0, ht: 0 });
      setAwayTeam({ name: '', over25: 0, bts: 0, ht: 0 });
      setShowModal(false);
    }
  };

  const handleDeletePrediction = (id: string) => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar esta predicción del historial?');
    if (confirmed) {
      setPredictions(predictions.filter(pred => pred.id !== id));
    }
  };

  const handleClearAll = () => {
    const confirmed = window.confirm('¿Estás seguro de que deseas eliminar todas las predicciones del historial?');
    if (confirmed) {
      setPredictions([]);
    }
  };

  const handleViewPrediction = (prediction: SavedPrediction) => {
    setSelectedPrediction(prediction);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedPrediction(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-emerald-900 to-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Predictor de Fútbol</h1>
          <p className="text-emerald-400">Calcula estadísticas y predicciones de partidos</p>
        </header>

        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <TeamSection team={homeTeam} setTeam={setHomeTeam} title="Equipo Local" />
          <TeamSection team={awayTeam} setTeam={setAwayTeam} title="Equipo Visitante" />
        </div>

        <div className="flex justify-center">
          <button
            onClick={() => setShowModal(true)}
            disabled={!canCalculate}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-200
              ${canCalculate 
                ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer' 
                : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
          >
            <Calculator size={20} />
            Calcular Predicciones
          </button>
        </div>

        {/* Agrega un botón para exportar a Excel */}
        <div className="flex justify-center mb-4 mt-4">
          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-8 py-3 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold"
          >
            <Download size={20} /> {/* Ícono de Excel */}
            Descargar Pronósticos en Excel
          </button>
        </div>

        <PredictionHistory 
          predictions={predictions}
          onDelete={handleDeletePrediction}
          onView={handleViewPrediction}
          onClearAll={handleClearAll}
        />

        {showModal && (
          <PredictionModal
            homeTeam={selectedPrediction ? selectedPrediction.homeTeam : homeTeam}
            awayTeam={selectedPrediction ? selectedPrediction.awayTeam : awayTeam}
            onClose={handleCloseModal}
            onSave={!selectedPrediction ? handleSave : undefined}
            onDelete={handleDelete}
            matchProbabilities={selectedPrediction ? {
              homeWin: selectedPrediction.homeWin,
              draw: selectedPrediction.draw,
              awayWin: selectedPrediction.awayWin
            } : calculateMatchProbabilities(homeTeam, awayTeam)}
          />
        )}
      </div>
    </div>
  );
}

export default App;