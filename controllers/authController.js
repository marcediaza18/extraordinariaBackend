const jwt = require('jsonwebtoken');

// Simulación de base de datos (usuario hardcoded)
const userFake = {
  id: 1,
  username: 'admin',
  password: '1234'
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  if (username === userFake.username && password === userFake.password) {
    const payload = {
      id: userFake.id,
      username: userFake.username
    };

    const token = jwt.sign(payload, 'password', { expiresIn: '24h' });

    res.json({ token });
  } else {
    res.status(401).json({ message: 'Credenciales inválidas' });
  }
};
