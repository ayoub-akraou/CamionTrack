import { useState, useEffect } from 'react';
import TripService from '../../services/trips.service';
import VehicleService from '../../services/vehicles.service';
import AuthService from '../../services/auth.service';
import Modal from '../../components/Modal';
import { Plus, Edit, Trash2, Map, Calendar, User, Truck } from 'lucide-react';
import clsx from 'clsx';

const Trips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTrip, setEditingTrip] = useState(null);

  // Form data options
  const [drivers, setDrivers] = useState([]);
  const [trucks, setTrucks] = useState([]);
  const [trailers, setTrailers] = useState([]);

  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    plannedStart: '',
    plannedEnd: '',
    driver: '',
    vehicle: '',
  });

  const fetchData = async () => {
    try {
      const [tripsData, vehiclesData, driversData] = await Promise.all([
        TripService.getAllTrips(),
        VehicleService.getAllVehicles(),
        AuthService.getDrivers(),
      ]);
      setTrips(tripsData);
      setTrucks(vehiclesData.filter(v => v.type === 'truck'));
      setTrailers(vehiclesData.filter(v => v.type === 'trailer'));
      setDrivers(driversData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTrip) {
        await TripService.updateTrip(editingTrip.id, formData);
      } else {
        await TripService.createTrip(formData);
      }
      fetchData();
      setIsModalOpen(false);
      setEditingTrip(null);
      setFormData({
        origin: '',
        destination: '',
        plannedStart: '',
        plannedEnd: '',
        driver: '',
        vehicle: '',
      });
    } catch (error) {
      console.error('Error saving trip:', error);
      alert('Erreur lors de l\'enregistrement du trajet. Vérifiez que le véhicule et le chauffeur sont disponibles.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce trajet ?')) {
      try {
        await TripService.deleteTrip(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting trip:', error);
      }
    }
  };

  const openCreateModal = () => {
    setEditingTrip(null);
    setFormData({
      origin: '',
      destination: '',
      plannedStart: '',
      plannedEnd: '',
      driver: '',
      vehicle: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (trip) => {
    setEditingTrip(trip);
    setFormData({
      origin: trip.origin,
      destination: trip.destination,
      plannedStart: trip.plannedStart ? new Date(trip.plannedStart).toISOString().slice(0, 16) : '',
      plannedEnd: trip.plannedEnd ? new Date(trip.plannedEnd).toISOString().slice(0, 16) : '',
      driver: trip.driver?.id || trip.driver,
      vehicle: trip.vehicle?.id || trip.vehicle,
    });
    setIsModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Map className="h-8 w-8 text-blue-600" />
          Gestion des Trajets
        </h1>
        <button
          onClick={openCreateModal}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition"
        >
          <Plus className="h-5 w-5" />
          Nouveau Trajet
        </button>
      </div>

      {loading ? (
        <div className="text-center py-10">Chargement...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center">
                <span className={clsx(
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  trip.status === 'planned' && 'bg-yellow-100 text-yellow-800',
                  trip.status === 'in_progress' && 'bg-blue-100 text-blue-800',
                  trip.status === 'completed' && 'bg-green-100 text-green-800',
                  trip.status === 'cancelled' && 'bg-red-100 text-red-800'
                )}>
                  {trip.status === 'planned' ? 'Planifié' : 
                   trip.status === 'in_progress' ? 'En cours' : 
                   trip.status === 'completed' ? 'Terminé' : 'Annulé'}
                </span>
                <div className="flex space-x-2">
                  <button onClick={() => openEditModal(trip)} className="text-gray-500 hover:text-blue-600">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(trip.id)} className="text-gray-500 hover:text-red-600">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Map className="h-5 w-5 text-gray-400 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">{trip.origin}</p>
                    <p className="text-xs text-gray-500">vers</p>
                    <p className="text-sm font-medium text-gray-900">{trip.destination}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <div className="text-sm text-gray-600">
                    <p>{new Date(trip.plannedStart).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {trip.driver?.firstName} {trip.driver?.lastName} ({trip.driver?.email})
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-gray-400" />
                  <p className="text-sm text-gray-600">
                    {trip.vehicle?.plateNumber} ({trip.vehicle?.model})
                  </p>
                </div>
              </div>
            </div>
          ))}
          {trips.length === 0 && (
            <div className="col-span-full text-center py-10 text-gray-500">
              Aucun trajet trouvé.
            </div>
          )}
        </div>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingTrip ? 'Modifier le trajet' : 'Nouveau trajet'}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Origine</label>
              <input
                type="text"
                name="origin"
                value={formData.origin}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Destination</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Début prévu</label>
              <input
                type="datetime-local"
                name="plannedStart"
                value={formData.plannedStart}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Fin prévue</label>
              <input
                type="datetime-local"
                name="plannedEnd"
                value={formData.plannedEnd}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Chauffeur</label>
            <select
              name="driver"
              value={formData.driver}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            >
              <option value="">Sélectionner un chauffeur</option>
              {drivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.firstName} {d.lastName} ({d.email})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Camion</label>
            <select
              name="vehicle"
              value={formData.vehicle}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
            >
              <option value="">Sélectionner un camion</option>
              {trucks.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.plateNumber} - {t.model}
                </option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
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
      </Modal>
    </div>
  );
};

export default Trips;
