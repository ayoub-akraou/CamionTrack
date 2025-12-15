import { useState, useEffect } from 'react';
import TripService from '../services/trips.service';
import { useAuth } from '../context/AuthContext';
import { Map, Calendar, Truck, CheckCircle, Play, XCircle, Clock, FileText } from 'lucide-react';
import clsx from 'clsx';
import TripCompletionModal from '../components/TripCompletionModal';
import { generateTripPDF } from '../utils/pdfGenerator';

const DriverDashboard = () => {
  const { user } = useAuth();
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [completingTripId, setCompletingTripId] = useState(null);

  const fetchTrips = async () => {
    try {
      if (user?.id) {
        const data = await TripService.getDriverTrips(user.id);
        setTrips(data);
      }
    } catch (error) {
      console.error('Error fetching driver trips:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, [user]);

  const handleStatusUpdate = async (tripId, newStatus) => {
    try {
      await TripService.updateTripStatus(tripId, newStatus);
      fetchTrips();
    } catch (error) {
      console.error('Error updating trip status:', error);
    }
  };

  const handleCompleteTrip = async (data) => {
    try {
      // First update details
      await TripService.updateTrip(completingTripId, data);
      // Then update status
      await TripService.updateTripStatus(completingTripId, 'completed');
      setCompletingTripId(null);
      fetchTrips();
    } catch (error) {
      console.error('Error completing trip:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'planned': return 'bg-yellow-100 text-yellow-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'planned': return 'À faire';
      case 'in_progress': return 'En cours';
      case 'completed': return 'Terminé';
      case 'cancelled': return 'Annulé';
      default: return status;
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        <Map className="h-8 w-8 text-blue-600" />
        Mes Trajets
      </h1>

      {loading ? (
        <div className="text-center py-10">Chargement...</div>
      ) : (
        <div className="space-y-6">
          {trips.map((trip) => {
            console.log(trip);
            
            return (
            <div key={trip.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-4 border-b bg-gray-50 flex justify-between items-center flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <span className={clsx('px-3 py-1 rounded-full text-sm font-medium', getStatusColor(trip.status))}>
                    {getStatusLabel(trip.status)}
                  </span>
                  <span className="text-sm text-gray-500">
                    #{trip.id.slice(-6)}
                  </span>
                </div>
                <div className="flex gap-2">
                  {trip.status === 'planned' && (
                    <button
                      onClick={() => handleStatusUpdate(trip.id, 'in_progress')}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      <Play className="h-4 w-4" /> Commencer
                    </button>
                  )}
                  {trip.status === 'in_progress' && (
                    <button
                      onClick={() => setCompletingTripId(trip.id)}
                      className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                    >
                      <CheckCircle className="h-4 w-4" /> Terminer
                    </button>
                  )}
                  <button
                    onClick={() => generateTripPDF(trip)}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 text-sm"
                  >
                    <FileText className="h-4 w-4" /> PDF
                  </button>
                </div>
              </div>
              
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <div className="w-3 h-3 rounded-full bg-blue-500 mb-1"></div>
                      <div className="w-0.5 h-10 bg-gray-200 mx-auto"></div>
                      <div className="w-3 h-3 rounded-full bg-red-500 mt-1"></div>
                    </div>
                    <div className="flex-1">
                      <div className="mb-4">
                        <p className="text-xs text-gray-500 uppercase">Origine</p>
                        <p className="font-medium text-gray-900">{trip.origin}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 uppercase">Destination</p>
                        <p className="font-medium text-gray-900">{trip.destination}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Date prévue</p>
                      <p className="text-sm font-medium text-gray-900">
                        {new Date(trip.plannedStart).toLocaleDateString()} - {new Date(trip.plannedEnd).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Truck className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-xs text-gray-500">Véhicule</p>
                      <p className="text-sm font-medium text-gray-900">
                        {trip.vehicle?.plateNumber} ({trip.vehicle?.model})
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )})}
          
          {trips.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg border border-dashed border-gray-300">
              <Map className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Aucun trajet assigné</h3>
              <p className="text-gray-500">Vous n'avez pas de trajets prévus pour le moment.</p>
            </div>
          )}
        </div>
      )}

      <TripCompletionModal
        isOpen={!!completingTripId}
        onClose={() => setCompletingTripId(null)}
        onSubmit={handleCompleteTrip}
      />
    </div>
  );
};

export default DriverDashboard;
