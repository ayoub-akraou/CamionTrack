import { useState, useEffect } from 'react';

function VehicleForm({ initialData, onSubmit, onCancel, type }) {
  const [formData, setFormData] = useState({
    plateNumber: '',
    model: '',
    odometer: 0,
    fuelConsumptionPer100Km: 0,
    lastOilChange: '',
    lastTireCheck: '',
    lastBrakeCheck: '',
    status: 'available',
    type: type,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        lastOilChange: initialData.lastOilChange ? new Date(initialData.lastOilChange).toISOString().split('T')[0] : '',
        lastTireCheck: initialData.lastTireCheck ? new Date(initialData.lastTireCheck).toISOString().split('T')[0] : '',
        lastBrakeCheck: initialData.lastBrakeCheck ? new Date(initialData.lastBrakeCheck).toISOString().split('T')[0] : '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Immatriculation</label>
        <input
          type="text"
          name="plateNumber"
          value={formData.plateNumber}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Modèle</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Kilométrage</label>
          <input
            type="number"
            name="odometer"
            value={formData.odometer}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Conso (L/100km)</label>
          <input
            type="number"
            name="fuelConsumptionPer100Km"
            value={formData.fuelConsumptionPer100Km}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Dernière Vidange</label>
          <input
            type="date"
            name="lastOilChange"
            value={formData.lastOilChange}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dernier Contrôle Pneus</label>
          <input
            type="date"
            name="lastTireCheck"
            value={formData.lastTireCheck}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Dernier Contrôle Freins</label>
          <input
            type="date"
            name="lastBrakeCheck"
            value={formData.lastBrakeCheck}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2" />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Statut</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
        >
          <option value="available">Disponible</option>
          <option value="on_trip">En trajet</option>
          <option value="maintenance">Maintenance</option>
        </select>
      </div>
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Annuler
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </div>
    </form>
  );
}

export default VehicleForm;