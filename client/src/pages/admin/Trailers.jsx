import { useState, useEffect } from 'react';
import VehicleService from '../../services/vehicles.service';
import Modal from '../../components/Modal';
import VehicleForm from '../../components/VehicleForm';
import { Plus, Edit, Trash2, Truck } from 'lucide-react';
import clsx from 'clsx';

const Trailers = () => {
  const [trailers, setTrailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrailer, setEditingTrailer] = useState(null);

  const fetchTrailers = async () => {
    try {
      const data = await VehicleService.getAllVehicles();
      setTrailers(data.filter(v => v.type === 'trailer'));
    } catch (error) {
      console.error('Error fetching trailers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrailers();
  }, []);

  const handleCreate = async (data) => {
    try {
      await VehicleService.createVehicle({ ...data, type: 'trailer' });
      fetchTrailers();
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating trailer:', error);
    }
  };

  const handleUpdate = async (data) => {
    try {
      await VehicleService.updateVehicle(editingTrailer.id, data);
      fetchTrailers();
      setIsModalOpen(false);
      setEditingTrailer(null);
    } catch (error) {
      console.error('Error updating trailer:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette remorque ?')) {
      try {
        await VehicleService.deleteVehicle(id);
        fetchTrailers();
      } catch (error) {
        console.error('Error deleting trailer:', error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingTrailer(null);
    setIsModalOpen(true);
  };

  const openEditModal = (trailer) => {
    setEditingTrailer(trailer);
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Truck className="h-8 w-8 text-blue-600" />
          Gestion des Remorques
        </h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5" />
          Ajouter une remorque
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
              {trailers.map((trailer) => (
                <tr key={trailer.id}>
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{trailer.plateNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{trailer.model}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">{trailer.odometer} km</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={clsx(
                      'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                      trailer.status === 'available' && 'bg-green-100 text-green-800',
                      trailer.status === 'on_trip' && 'bg-blue-100 text-blue-800',
                      trailer.status === 'maintenance' && 'bg-red-100 text-red-800'
                    )}>
                      {trailer.status === 'available' ? 'Disponible' : trailer.status === 'on_trip' ? 'En trajet' : 'Maintenance'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(trailer)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      <Edit className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(trailer.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
              {trailers.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                    Aucune remorque trouvée.
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
        title={editingTrailer ? 'Modifier la remorque' : 'Ajouter une remorque'}
      >
        <VehicleForm
          initialData={editingTrailer}
          onSubmit={editingTrailer ? handleUpdate : handleCreate}
          onCancel={() => setIsModalOpen(false)}
          type="trailer"
        />
      </Modal>
    </div>
  );
};

export default Trailers;
