import prisma from '../db';

export const getUpdates = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    select: {
      products: {
        select: {
          updates: true,
        },
      },
    },
  });

  const updates = user.products.reduce(
    (updates, product) => updates.concat(product.updates),
    []
  );

  res.json({ data: updates });
};

export const createUpdate = async (req, res) => {
  const { title, body, productId } = req.body;
  const { id: userId } = req.user;

  const product = await prisma.product.findUnique({
    where: {
      id_belongsToId: {
        id: productId,
        belongsToId: userId,
      },
    },
  });

  if (product) {
    const update = await prisma.update.create({
      data: {
        updatedAt: new Date(),
        title,
        body,
        productId,
      },
    });

    res.json({ data: update });
  } else {
    res.status(403);
    res.json({ message: "Product hasn't been found" });
  }
};
