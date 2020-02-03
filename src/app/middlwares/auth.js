import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import authConfig from '../../config/auth';

export default (req, res, next) => {
  const authHeader = req.headers.authorization;

  const [, token] = authHeader.split(' ');

  if (!token) {
    return res.status(401).json({ error: 'Token não informado.' });
  }

  try {
    const decoded = promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;

    return next();
  } catch (err) {
    res.status(401).json({ error: 'Token inválido.' });
  }

  return next();
};
