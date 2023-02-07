import prisma from '../db';

// Get All Updates
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

// Get One Update
export const getUpdate = async (req, res) => {
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

  const update = updates.find((update) => update.id === req.params.id);

  if (update) {
    res.json({ data: update });
  } else {
    res.status(404);
    res.json({ message: 'Update Not Found' });
  }
};

// Create Update
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
    res.json({ message: 'Product Not Found' });
  }
};

// Modify update
// export const modifyUpdate = async (req, res) => {
//   const user = await prisma.user.findUnique({
//     where: {
//       id: req.user.id,
//     },
//     select: {
//       products: {
//         select: {
//           updates: true,
//         },
//       },
//     },
//   });

//   const updates = user.products.reduce(
//     (updates, product) => updates.concat(product.updates),
//     []
//   );

//   const update = updates.find((update) => update.id === req.params.id);

//   if (update) {

//   } else {
//     res.status(404);
//     res.json({ message: 'Update Not Found' });
//   }
// };
