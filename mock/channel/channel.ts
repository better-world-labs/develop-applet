import { resultSuccess } from '../_util';

const channels = [
  {
    id: 1,
    name: '新人接待',
    icon: 'https://xxx/xxx',
    groupId: 1,
    planetId: 1,
  },
  {
    id: 2,
    name: '社区守则',
    icon: 'https://xxx/xxx',
    groupId: 1,
    planetId: 1,
  },
  {
    id: 4,
    name: '职场生存互助',
    icon: 'https://xxx/xxx',
    groupId: 2,
    planetId: 2,
  },
  {
    id: 5,
    name: '今天上班也很累，快来吐槽吧',
    icon: 'https://xxx/xxx',
    groupId: 2,
    planetId: 2,
  },
  {
    id: 6,
    name: '优雅女性情感互助',
    icon: 'https://xxx/xxx',
    groupId: 2,
    planetId: 2,
  },
];

const groups = [
  {
    id: 1,
    name: '欢迎大厅',
    icon: 'https://xxx/xxx',
    planetId: 1,
  },
  {
    id: 2,
    name: '信息处',
    icon: 'https://xxx/xxx',
    planetId: 1,
  },
];

export default [
  {
    url: '/api/planets/1/channels',
    method: 'get',
    response: () => {
      return resultSuccess({ list: channels });
    },
  },
  {
    url: '/api/planets/1/channel-groups',
    method: 'get',
    response: () => {
      return resultSuccess({ list: groups });
    },
  },
];
