import { useState, useEffect } from 'react';
import VehicleService from '../../services/vehicles.service';
import Modal from '../../components/Modal';
import VehicleForm from '../../components/VehicleForm';
import { Plus, Edit, Trash2, Truck } from 'lucide-react';
import clsx from 'clsx';

const Trucks = () => {
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTruck, setEditingTruck] = useState(null);

  const fetchTrucks = async () => {
    try {
      const data = await VehicleService.getAllVehicles();
      setTrucks(data.filter(v => v.type === 'truck'));
    } catch (error) {
      console.error('Error fetching trucks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrucks();
  }, []);

  const handleCreate = async (data) => {
    try {
      await VehicleService.createVehicle({ ...data, type: 'truck' });
      fetchTrucks();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating truck:', error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await VehicleService.updateVehicle(editingTruck.id, data);
      fetchTrucks();
      setIsModalOpen(false);
      setEditingTruck(null);
    } catch (error) {
      console.error('Error updating truck:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce camion ?')) {
      try {
        await VehicleService.deleteVehicle(id);
        fetchTrucks();
      } catch (error) {
        console.error('Error deleting truck:', error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingTruck(null);
    setIsModalOpen(true);
  };

  const openEditModal = (truck) => {
    setEditingTruck(truck);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Truck className="h-8 w-8 text-blue-600" />
          Gestion des Camions
        </h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5" />
          Ajouter un camion
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Chargement...</div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Immatriculation</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Modèle</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kilométrage</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {trucks.map((truck) => (
                <tr key={truck.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{truck.plateNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{truck.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{truck.odometer} km</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      truck.status === 'available' && 'bg-green-100 text-green-800',
                      truck.status === 'on_trip' && 'bg-blue-100 text-blue-800',
                      truck.status === 'maintenance' && 'bg-red-100 text-red-800'
                    )}>
                      {truck.status === 'available' ? 'Disponible' : truck.status === 'on_trip' ? 'En trajet' : 'Maintenance'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(truck)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(truck.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {trucks.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Aucun camion trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTruck ? 'Modifier le camion' : 'Ajouter un camion'}
      >
        <VehicleForm
          initialData={editingTruck}
          onSubmit={editingTruck ? handleUpdate : handleCreate}
          onCancel={() => setIsModalOpen(false)}
          type="truck"
        />
      </Modal>
    </div>
  );
};

export default Trucks;
