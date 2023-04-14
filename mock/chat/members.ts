import Mock from 'mockjs';
import { resultSuccess } from "../_util";
import { listenerCount } from 'events';

const Random = Mock.Random;

const members = [{
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}, {
  id: Random.id(),
  nickname: "张三",
  avatar: "../../src/assets/logo.png",
  online: false
}];

export default [
  {
    url: '/api/planets/1/members',
    method: 'get',
    response: () => {
      return resultSuccess({ total: listenerCount.length, list: members });
    },
  },
];
