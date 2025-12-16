import { jest } from '@jest/globals';

// Mock dependencies using unstable_mockModule
jest.unstable_mockModule('../../repositories/user.repository.js', () => ({
   default: {
      findByEmail: jest.fn(),
      createUser: jest.fn(),
   },
}));

jest.unstable_mockModule('bcrypt', () => ({
   default: {
      compare: jest.fn(),
   },
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
   default: {
      sign: jest.fn(),
   },
}));

// Dynamic imports
const AuthService = (await import('../../services/auth.service.js')).default;
const UserRepository = (await import('../../repositories/user.repository.js')).default;
const bcrypt = (await import('bcrypt')).default;
const jwt = (await import('jsonwebtoken')).default;

describe('AuthService', () => {
   afterEach(() => {
      jest.clearAllMocks();
   });

   describe('register', () => {
      it('should register a new user successfully', async () => {
         const mockData = { email: 'test@example.com', password: 'password123' };
         const mockUser = { id: '1', email: 'test@example.com', role: 'driver' };

         UserRepository.findByEmail.mockResolvedValue(null);
         UserRepository.createUser.mockResolvedValue(mockUser);

         const result = await AuthService.register(mockData);

         expect(UserRepository.findByEmail).toHaveBeenCalledWith(mockData.email);
         expect(UserRepository.createUser).toHaveBeenCalledWith(mockData);
         expect(result).toEqual(mockUser);
      });

      it('should throw error if email already exists', async () => {
         const mockData = { email: 'existing@example.com' };
         UserRepository.findByEmail.mockResolvedValue(true);

         await expect(AuthService.register(mockData)).rejects.toThrow('email already exist! use another email or login!');
      });
   });

   describe('login', () => {
      it('should login successfully with correct credentials', async () => {
         const mockData = { email: 'test@example.com', password: 'password123' };
         const mockUser = { id: '1', email: 'test@example.com', password: 'hashedPassword', role: 'driver' };
         const mockToken = 'mockToken';

         UserRepository.findByEmail.mockResolvedValue(mockUser);
         bcrypt.compare.mockResolvedValue(true);
         jwt.sign.mockReturnValue(mockToken);

         const result = await AuthService.login(mockData);

         expect(UserRepository.findByEmail).toHaveBeenCalledWith(mockData.email, true);
         expect(bcrypt.compare).toHaveBeenCalledWith(mockData.password, 'hashedPassword');
         expect(result).toEqual({ user: { id: '1', email: 'test@example.com', role: 'driver' }, token: mockToken });
      });

      it('should throw error for invalid email', async () => {
         const mockData = { email: 'wrong@example.com', password: 'password123' };
         UserRepository.findByEmail.mockResolvedValue(null);

         await expect(AuthService.login(mockData)).rejects.toThrow('Invalid credentials');
      });

      it('should throw error for invalid password', async () => {
         const mockData = { email: 'test@example.com', password: 'wrongPassword' };
         const mockUser = { id: '1', email: 'test@example.com', password: 'hashedPassword' };

         UserRepository.findByEmail.mockResolvedValue(mockUser);
         bcrypt.compare.mockResolvedValue(false);

         await expect(AuthService.login(mockData)).rejects.toThrow('Invalid credentials');
      });
   });
});
