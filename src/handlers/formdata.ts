export const parseFormData = (req, res) => {
  const data = [];

  req.pipe(req.busboy);
  req.busboy.on('field', (name, value, info) => {
    console.log(`Field [${name}]: value: %j`, value);
    data.push({ name, value });
  });

  req.busboy.on('finish', () => {
    res.status(200);
    res.json({ data });
  });
};
