const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'Файл не загружен' });
  }
const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
res.json({ imageUrl });
};

module.exports = { uploadFile };