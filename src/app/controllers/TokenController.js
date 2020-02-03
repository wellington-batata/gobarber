import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class TokenController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user || !(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos.' });
    }

    const { id, name } = user;

    res.json({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });

    return this;
  }
}

export default new TokenController();
