import { jest } from '@jest/globals';

// Mock dependencies
jest.unstable_mockModule('../../repositories/user.repository.js', () => ({
   default: {
      findAllByRole: jest.fn(),
   },
}));

// Dynamic imports
const DriverService = (await import('../../services/driver.service.js')).default;
const UserRepository = (await import('../../repositories/user.repository.js')).default;

describe('DriverService', () => {
   afterEach(() => {
      jest.clearAllMocks();
   });

   describe('getDrivers', () => {
      it('should return all drivers', async () => {
         const mockDrivers = [
            { id: '1', username: 'driver1', role: 'driver' },
            { id: '2', username: 'driver2', role: 'driver' },
         ];

         UserRepository.findAllByRole.mockResolvedValue(mockDrivers);

         const result = await DriverService.getDrivers();

         expect(UserRepository.findAllByRole).toHaveBeenCalledWith('driver');
         expect(result).toEqual(mockDrivers);
      });
   });
});
