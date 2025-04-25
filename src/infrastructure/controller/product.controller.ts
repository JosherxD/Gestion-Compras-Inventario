import { Request, Response } from 'express';
import { ProductUseCase } from '../../application/use_case/product.usecase';
import { HttpStatus } from '../../common/config/statusCode';

export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  async getTopProducts(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 3;
      const products = await this.productUseCase.getTopProducts(limit);
      res.status(HttpStatus.OK).json(products);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const products = await this.productUseCase.getAllProducts();
      res.status(HttpStatus.OK).json(products);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
    }
  }

  async create(req: Request, res: Response) {
    const { id, name, description, quantity, price, imageUrl } = req.body;

    if (!id || !name || !description || quantity === undefined || price === undefined) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        error: 'Los campos id, name, description, quantity y price son obligatorios.',
      });
    }

    try {
      const product = await this.productUseCase.createProduct({
        id,
        name,
        description,
        quantity,
        price,
        imageUrl: imageUrl ?? '', 
      });
      res.status(HttpStatus.CREATED).json(product);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
    }
  }
}