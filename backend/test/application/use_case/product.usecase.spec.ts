import { ProductUseCase } from './product.usecase';
import { ProductRepositoryInterface } from '../../domain/interfaces/product.repository.interface.spec';
import { Product } from '../../domain/models/product.model.spec';

// Mock del Producto para pruebas
const mockProduct: Product = {
  id: 1,
  name: 'Test Product',
  description: 'Test Description',
  quantity: 10,
  imageUrl: 'http://test.com/image.jpg',
  price: 99.99
};

describe('ProductUseCase', () => {
  let productUseCase: ProductUseCase;
  let mockProductRepository: jest.Mocked<ProductRepositoryInterface>;

  beforeEach(() => {
    // Creamos un mock completo del repositorio
    mockProductRepository = {
      findTopSelling: jest.fn(),
      save: jest.fn(),
      findAll: jest.fn(),
      findById: jest.fn(),
      updateProduct: jest.fn()
    };

    productUseCase = new ProductUseCase(mockProductRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getTopSellingProducts', () => {
    it('should call repository with default limit of 5', async () => {
      mockProductRepository.findTopSelling.mockResolvedValue([mockProduct]);

      await productUseCase.getTopSellingProducts();

      expect(mockProductRepository.findTopSelling).toHaveBeenCalledWith(5);
    });

    it('should call repository with custom limit', async () => {
      mockProductRepository.findTopSelling.mockResolvedValue([mockProduct]);

      await productUseCase.getTopSellingProducts(10);

      expect(mockProductRepository.findTopSelling).toHaveBeenCalledWith(10);
    });

    it('should return products from repository', async () => {
      const expectedProducts = [mockProduct, {...mockProduct, id: 2}];
      mockProductRepository.findTopSelling.mockResolvedValue(expectedProducts);

      const result = await productUseCase.getTopSellingProducts();

      expect(result).toEqual(expectedProducts);
    });
  });

  describe('getTopProducts', () => {
    it('should call repository with default limit of 3', async () => {
      mockProductRepository.findTopSelling.mockResolvedValue([mockProduct]);

      await productUseCase.getTopProducts();

      expect(mockProductRepository.findTopSelling).toHaveBeenCalledWith(3);
    });

    it('should call repository with custom limit', async () => {
      mockProductRepository.findTopSelling.mockResolvedValue([mockProduct]);

      await productUseCase.getTopProducts(5);

      expect(mockProductRepository.findTopSelling).toHaveBeenCalledWith(5);
    });
  });

  describe('createProduct', () => {
    it('should create a new product and save it', async () => {
      const productData = {
        id: 1,
        name: 'New Product',
        description: 'New Description',
        quantity: 5,
        imageUrl: 'http://new.com/image.jpg',
        price: 49.99
      };

      mockProductRepository.save.mockResolvedValue(mockProduct);

      const result = await productUseCase.createProduct(productData);

      expect(mockProductRepository.save).toHaveBeenCalledWith(expect.any(Product));
      expect(result).toEqual(mockProduct);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products from repository', async () => {
      const expectedProducts = [mockProduct, {...mockProduct, id: 2}];
      mockProductRepository.findAll.mockResolvedValue(expectedProducts);

      const result = await productUseCase.getAllProducts();

      expect(mockProductRepository.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedProducts);
    });
  });

  describe('updateProduct', () => {
    it('should update an existing product', async () => {
      const updates = { name: 'Updated Name', price: 129.99 };
      const updatedProduct = { ...mockProduct, ...updates };

      mockProductRepository.findById.mockResolvedValue(mockProduct);
      mockProductRepository.updateProduct.mockResolvedValue(updatedProduct);

      const result = await productUseCase.updateProduct(1, updates);

      expect(mockProductRepository.findById).toHaveBeenCalledWith(1);
      expect(mockProductRepository.updateProduct).toHaveBeenCalledWith(1, updates);
      expect(result).toEqual(updatedProduct);
    });

    it('should throw error when product not found', async () => {
      mockProductRepository.findById.mockResolvedValue(null);

      await expect(productUseCase.updateProduct(999, { name: 'Update' }))
        .rejects.toThrow('Product with ID 999 not found.');
    });

    it('should throw error when update fails', async () => {
      mockProductRepository.findById.mockResolvedValue(mockProduct);
      mockProductRepository.updateProduct.mockResolvedValue(null);

      await expect(productUseCase.updateProduct(1, { name: 'Update' }))
        .rejects.toThrow('Failed to update product with ID 1.');
    });
  });
});