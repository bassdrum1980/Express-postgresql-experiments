// https://github.com/mscdex/busboy

export const parseFormData = (req, res) => {
  const data = [];

  req.pipe(req.busboy);
  req.busboy.on('field', (name, value, info) => {
    console.log(`Field [${name}]: value: %j`, value);
    data.push({ name, value });
  });

  req.busboy.on('file', (name, file, info) => {
    const { filename, encoding, mimeType } = info;
    let fileSize = 0;

    console.log(
      `File [${name}]: filename: %j, encoding: %j, mimeType: %j`,
      filename,
      encoding,
      mimeType
    );

    file
      .on('data', (data) => {
        fileSize += data.length;
        console.log(`File [${name}] got ${data.length} bytes`);
      })
      .on('close', () => {
        console.log(`File [${name}] done`);
        data.push({ name, fileSize: `${(fileSize / 1024).toFixed(2)} kb` });
      });
  });

  req.busboy.on('finish', () => {
    res.status(200);
    res.json({ data });
  });
};
