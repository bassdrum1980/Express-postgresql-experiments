import prisma from '../db';

// Get All Products
export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });

  res.json({ data: user.products });
};

// Get One Product
export const getOneProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const product = await prisma.product.findFirst({
    where: {
      id: productId,
      belongsTo: userId,
    },
  });

  res.json({ data: product });
};

// Create Product
export const createProduct = async (req, res) => {
  const userId = req.user.id;
  const product = await prisma.product.create({
    data: {
      name: req.body.name,
      belongsToId: userId,
    },
  });

  res.json({ data: product });
};

// Update Product
export const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const name = req.body.name;

  const updated = await prisma.product.update({
    where: {
      id_belongsToId: {
        id: productId,
        belongsToId: userId,
      },
    },
    data: {
      name,
    },
  });

  res.json({ data: updated });
};

// Delete Product
export const deleteProduct = async (req, res) => {
  const productId = req.params.id;
  const userId = req.user.id;
  const deleted = await prisma.product.delete({
    where: {
      id_belongsToId: {
        id: productId,
        belongsToId: userId,
      },
    },
  });

  res.json(deleted);
};
