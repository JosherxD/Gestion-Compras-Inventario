import { Request, Response } from 'express';
import { ProductUseCase } from '../../application/use_case/product.usecase';
import { HttpStatus } from '../../common/config/statusCode';
import { body, validationResult } from 'express-validator';
import _ from 'lodash';
import { ProductRepositoryService } from '../services/product.repository.service';
<<<<<<< HEAD
=======
import { ParsedQs } from 'qs';
>>>>>>> develop

export class ProductController {
  constructor(private readonly productUseCase: ProductUseCase) {}

  async getTopProducts(req: Request, res: Response) {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const products = await this.productUseCase.getTopSellingProducts(limit);
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
    await body('id').notEmpty().withMessage('El campo id es obligatorio.').run(req);
    await body('name').notEmpty().withMessage('El campo name es obligatorio.').run(req);
    await body('description').notEmpty().withMessage('El campo description es obligatorio.').run(req);
    await body('quantity').isInt({ gt: 0 }).withMessage('El campo quantity debe ser un entero positivo.').run(req);
    await body('price').isFloat({ gt: 0 }).withMessage('El campo price debe ser un número decimal positivo.').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatus.BAD_REQUEST).json({ errors: errors.array() });
    }

    const allowedFields = ['id', 'name', 'description', 'quantity', 'price', 'imageUrl'];
    const extraFields = Object.keys(req.body).filter((key) => !allowedFields.includes(key));

    if (extraFields.length > 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: `Los siguientes campos no están permitidos: ${extraFields.join(', ')}`,
      });
    }

    const { id, name, description, quantity, price, imageUrl } = req.body;

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

  async update(req: Request, res: Response) {
    const productId = parseInt(req.params.id);

    if (isNaN(productId)) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'El ID del producto debe ser un número válido.' });
    }

    const allowedFields = ['name', 'description', 'quantity', 'price', 'imageUrl'];
    const updates = _.pick(req.body, allowedFields);

    delete updates.id;

    if (Object.keys(updates).length === 0) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: 'No se proporcionaron campos válidos para actualizar.' });
    }

    try {
      const updatedProduct = await this.productUseCase.updateProduct(productId, updates);
      if (!updatedProduct) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Producto no encontrado.' });
      }
      res.status(HttpStatus.OK).json(updatedProduct);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: errorMessage });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    const productRepository = new ProductRepositoryService();

    try {
      const { id } = req.params;
      const deleted = await productRepository.delete(Number(id));

      if (deleted) {
        res.status(HttpStatus.OK).json({ message: 'Producto eliminado correctamente.' });
      } else {
        res.status(HttpStatus.NOT_FOUND).json({ message: 'Producto no encontrado.' });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Error al eliminar el producto.', error: errorMessage });
    }
  }
<<<<<<< HEAD
=======

  async searchProducts(req: Request, res: Response) {
    try {
      const id = typeof req.query.id === 'string' ? req.query.id : undefined;
      const name = typeof req.query.name === 'string' ? req.query.name : undefined;

      const products = await this.productUseCase.searchProducts({ id, name });
      res.status(HttpStatus.OK).json(products);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  }

  async getById(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id, 10);
      if (isNaN(id)) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'El ID proporcionado no es válido.' });
      }

      const product = await this.productUseCase.searchProducts({ id: id.toString() });
      if (!product) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Producto no encontrado.' });
      }

      res.status(HttpStatus.OK).json(product);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Error desconocido';
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: errorMessage });
    }
  }
>>>>>>> develop
}