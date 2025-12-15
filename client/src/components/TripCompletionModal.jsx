import { useState } from 'react';

const TripCompletionModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    distanceKm: '',
    fuelUsedLiters: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 p-6 animate-in fade-in zoom-in duration-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Terminer le trajet</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Distance parcourue (km)</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              value={formData.distanceKm}
              onChange={(e) => setFormData({ ...formData, distanceKm: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Carburant consommé (L)</label>
            <input
              type="number"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              value={formData.fuelUsedLiters}
              onChange={(e) => setFormData({ ...formData, fuelUsedLiters: e.target.value })}
            />
          </div>
         
          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Valider et Terminer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TripCompletionModal;
