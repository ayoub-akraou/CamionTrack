import { jest } from '@jest/globals';

// Mock dependencies
jest.unstable_mockModule('../../repositories/trip.repository.js', () => ({
   TripRepository: {
      findActiveTrips: jest.fn(),
      create: jest.fn(),
      getDriverTrips: jest.fn(),
   },
}));

// Dynamic imports
const { TripService } = await import('../../services/trip.service.js');
const { TripRepository } = await import('../../repositories/trip.repository.js');

describe('TripService', () => {
   afterEach(() => {
      jest.clearAllMocks();
   });

   describe('createTrip', () => {
      it('should create a trip if no conflict', async () => {
         const mockTripData = { vehicle: 'v1', plannedStart: new Date('2023-01-01'), plannedEnd: new Date('2023-01-02') };
         const mockCreatedTrip = { id: 't1', ...mockTripData };

         TripRepository.findActiveTrips.mockResolvedValue([]);
         TripRepository.create.mockResolvedValue(mockCreatedTrip);

         const result = await TripService.createTrip(mockTripData);

         expect(TripRepository.findActiveTrips).toHaveBeenCalled();
         expect(TripRepository.create).toHaveBeenCalledWith(mockTripData);
         expect(result).toEqual(mockCreatedTrip);
      });

      it('should throw error if vehicle has conflicting trip', async () => {
         const mockTripData = { vehicle: 'v1', plannedStart: new Date('2023-01-01'), plannedEnd: new Date('2023-01-02') };
         const existingTrip = {
            vehicle: { id: 'v1' },
            plannedStart: new Date('2023-01-01'),
            plannedEnd: new Date('2023-01-05')
         };

         TripRepository.findActiveTrips.mockResolvedValue([existingTrip]);

         await expect(TripService.createTrip(mockTripData)).rejects.toThrow('Le véhicule est déjà réservé pour cette période');
      });
   });

   describe('getDriverTrips', () => {
      it('should return trips for a specific driver', async () => {
         const driverId = 'd1';
         const mockTrips = [{ id: 't1', driver: driverId }];

         TripRepository.getDriverTrips.mockResolvedValue(mockTrips);

         const result = await TripService.getDriverTrips(driverId);

         expect(TripRepository.getDriverTrips).toHaveBeenCalledWith(driverId);
         expect(result).toEqual(mockTrips);
      });
   });
});
