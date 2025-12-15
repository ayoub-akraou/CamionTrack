import { useState, useEffect } from 'react';
import ConfigurationService from '../../services/configuration.service';
import { Save, Settings, AlertTriangle, Fuel, Building } from 'lucide-react';

const Configuration = () => {
  const [config, setConfig] = useState({
    maintenanceRules: {
      vidangeKm: 15000,
      revisionKm: 30000,
      pneuKm: 60000,
      alertBeforeKm: 1000,
    },
    fuelRules: {
      minFuelAlert: 50,
    },
    general: {
      companyName: '',
      timezone: '',
      notificationsEmail: '',
    },
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await ConfigurationService.getConfiguration();
        if (data) setConfig(data);
      } catch (error) {
        console.error('Error fetching configuration:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  const handleChange = (section, field, value) => {
    setConfig((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      // Ensure numbers are numbers
      const payload = {
        ...config,
        maintenanceRules: {
          vidangeKm: Number(config.maintenanceRules.vidangeKm),
          revisionKm: Number(config.maintenanceRules.revisionKm),
          pneuKm: Number(config.maintenanceRules.pneuKm),
          alertBeforeKm: Number(config.maintenanceRules.alertBeforeKm),
        },
        fuelRules: {
          minFuelAlert: Number(config.fuelRules.minFuelAlert),
        },
      };

      await ConfigurationService.updateConfiguration(payload);
      setMessage({ type: 'success', text: 'Configuration enregistrée avec succès.' });
    } catch (error) {
      console.error('Error updating configuration:', error);
      setMessage({ type: 'error', text: 'Erreur lors de l\'enregistrement.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-center py-10">Chargement...</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <Settings className="h-8 w-8 text-blue-600" />
        <h1 className="text-2xl font-bold text-gray-800">Configuration Système</h1>
      </div>

      {message && (
        <div className={`p-4 rounded-lg mb-6 ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* General Settings */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
            <Building className="h-5 w-5 text-gray-500" />
            <h2 className="font-semibold text-gray-700">Général</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nom de l'entreprise</label>
              <input
                type="text"
                value={config.general.companyName}
                onChange={(e) => handleChange('general', 'companyName', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email de notification</label>
              <input
                type="email"
                value={config.general.notificationsEmail}
                onChange={(e) => handleChange('general', 'notificationsEmail', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
          </div>
        </div>

        {/* Maintenance Rules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
            <Settings className="h-5 w-5 text-gray-500" />
            <h2 className="font-semibold text-gray-700">Règles de Maintenance</h2>
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intervalle Vidange (km)</label>
              <input
                type="number"
                value={config.maintenanceRules.vidangeKm}
                onChange={(e) => handleChange('maintenanceRules', 'vidangeKm', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intervalle Révision (km)</label>
              <input
                type="number"
                value={config.maintenanceRules.revisionKm}
                onChange={(e) => handleChange('maintenanceRules', 'revisionKm', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Intervalle Pneus (km)</label>
              <input
                type="number"
                value={config.maintenanceRules.pneuKm}
                onChange={(e) => handleChange('maintenanceRules', 'pneuKm', e.target.value)}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Alerte avant (km)</label>
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                <input
                  type="number"
                  value={config.maintenanceRules.alertBeforeKm}
                  onChange={(e) => handleChange('maintenanceRules', 'alertBeforeKm', e.target.value)}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fuel Rules */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b bg-gray-50 flex items-center gap-2">
            <Fuel className="h-5 w-5 text-gray-500" />
            <h2 className="font-semibold text-gray-700">Carburant</h2>
          </div>
          <div className="p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Seuil Alerte Carburant (L)</label>
              <input
                type="number"
                value={config.fuelRules.minFuelAlert}
                onChange={(e) => handleChange('fuelRules', 'minFuelAlert', e.target.value)}
                className="w-full max-w-xs rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 border p-2"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
          >
            <Save className="h-5 w-5" />
            {saving ? 'Enregistrement...' : 'Enregistrer la configuration'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Configuration;
