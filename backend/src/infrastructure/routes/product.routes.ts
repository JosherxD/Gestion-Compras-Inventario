import { Router } from 'express';
import { ProductController } from '../controller/product.controller';
import { ProductUseCase } from '../../application/use_case/product.usecase';
import { ProductRepositoryService } from '../services/product.repository.service';

const router = Router();
const productRepository = new ProductRepositoryService();
const productUseCase = new ProductUseCase(productRepository);
const productController = new ProductController(productUseCase);

router.post('/productos', (req, res) => {
  productController.create(req, res).catch(err => {
    console.error('Error en POST /productos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.get('/productos', (req, res) => {
  productController.getAll(req, res).catch(err => {
    console.error('Error en GET /productos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.get('/products', (req, res) => {
  productController.getAll(req, res).catch(err => {
    console.error('Error en GET /products:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.get('/productos/mas-vendidos', (req, res) => {
  productController.getTopProducts(req, res).catch(err => {
    console.error('Error en GET /productos/mas-vendidos:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.get('/productos/:id', (req, res) => {
  productController.getById(req, res).catch(err => {
    console.error('Error en GET /productos/:id:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.put('/productos/:id', (req, res) => {
  productController.update(req, res).catch(err => {
    console.error('Error en PUT /productos/:id:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.delete('/productos/:id', (req, res) => {
  productController.delete(req, res).catch(err => {
    console.error('Error en DELETE /productos/:id:', err);
    res.status(500).json({ error: 'Error interno del servidor' });
  });
});

router.get('/test-connection', (req, res) => {
  res.json({ message: 'Conexión exitosa' });
});

export default router;