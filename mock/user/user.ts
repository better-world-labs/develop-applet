import Mock from 'mockjs';
import { resultSuccess } from '../_util';

const Random = Mock.Random;

const token = Random.string('upper', 32, 32);

const adminInfo = {
  userId: '1',
  username: 'admin',
  realName: 'Admin',
  avatar: Random.image(),
  password: Random.string('upper', 4, 16),
  token,
};

export default [
  {
    url: '/api/login',
    method: 'post',
    response: () => {
      return resultSuccess({ token });
    },
  },
  {
    url: '/api/users/info',
    method: 'post',
    response: () => {
      // const token = getRequestToken(request);
      // if (!token) return resultError('Invalid token');
      return resultSuccess(adminInfo);
    },
  },
];
