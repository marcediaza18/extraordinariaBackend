const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  let token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ ok: false, message: 'Token no proporcionado' });
  }

  token = token.replace('Bearer ', '');

  try {
    const decoded = jwt.verify(token, 'password');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ ok: false, message: 'Token inválido' });
  }
}

module.exports = verifyToken;
