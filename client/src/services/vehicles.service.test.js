import { describe, it, expect, vi, afterEach } from 'vitest';
import VehicleService from './vehicles.service';
import api from './api';

// Mock the api module
vi.mock('./api', () => ({
   default: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      delete: vi.fn(),
   },
}));

describe('VehicleService', () => {
   afterEach(() => {
      vi.clearAllMocks();
   });

   describe('getAllVehicles', () => {
      it('should fetch all vehicles successfully', async () => {
         const mockVehicles = [{ id: 1, name: 'Truck 1' }, { id: 2, name: 'Truck 2' }];
         api.get.mockResolvedValue({ data: { data: mockVehicles } });

         const result = await VehicleService.getAllVehicles();

         expect(api.get).toHaveBeenCalledWith('/vehicles');
         expect(result).toEqual(mockVehicles);
      });
   });

   describe('getVehicleById', () => {
      it('should fetch a single vehicle by id', async () => {
         const mockVehicle = { id: 1, name: 'Truck 1' };
         api.get.mockResolvedValue({ data: { data: mockVehicle } });

         const result = await VehicleService.getVehicleById(1);

         expect(api.get).toHaveBeenCalledWith('/vehicles/1');
         expect(result).toEqual(mockVehicle);
      });
   });

   describe('createVehicle', () => {
      it('should create a vehicle successfully', async () => {
         const newVehicle = { name: 'New Truck' };
         const createdVehicle = { id: 3, ...newVehicle };
         api.post.mockResolvedValue({ data: { data: createdVehicle } });

         const result = await VehicleService.createVehicle(newVehicle);

         expect(api.post).toHaveBeenCalledWith('/vehicles', newVehicle);
         expect(result).toEqual(createdVehicle);
      });
   });

   describe('updateVehicle', () => {
      it('should update a vehicle successfully', async () => {
         const updateData = { name: 'Updated Truck' };
         const updatedVehicle = { id: 1, ...updateData };
         api.put.mockResolvedValue({ data: { data: updatedVehicle } });

         const result = await VehicleService.updateVehicle(1, updateData);

         expect(api.put).toHaveBeenCalledWith('/vehicles/1', updateData);
         expect(result).toEqual(updatedVehicle);
      });
   });

   describe('deleteVehicle', () => {
      it('should delete a vehicle successfully', async () => {
         const mockResponse = { message: 'Deleted successfully' };
         api.delete.mockResolvedValue({ data: mockResponse });

         const result = await VehicleService.deleteVehicle(1);

         expect(api.delete).toHaveBeenCalledWith('/vehicles/1');
         expect(result).toEqual(mockResponse);
      });
   });
});
