const routerOptions = [
  {
    path: '/control',
    name: 'control',
    component: () => import('@/views/admin-panel/main-control/main-control.vue'),
    children: [],
    meta: {
      title: '后台面板',
    },
  },
  {
    path: '/goods/list',
    name: '/goods/list',
    component: () => import('@/views/goods/goods-list/goods-list.vue'),
    children: [],
    meta: {
      title: '商品管理',
    },
  },
  {
    path: '/category/list',
    name: '/category/list',
    component: () => import('@/views/goods/category-list/category-list.vue'),
    children: [],
    meta: {
      title: '分裂管理',
    },
  },
  {
    path: '/skus/list',
    name: '/skus/list',
    component: () => import('@/views/goods/skus-list/skus-list.vue'),
    children: [],
    meta: {
      title: '规格管理',
    },
  },
  {
    path: '/coupon/list',
    name: '/coupon/list',
    component: () => import('@/views/goods/skus-list/skus-list.vue'),
    children: [],
    meta: {
      title: '优惠券管理',
    },
  },
  {
    path: '/user/list',
    name: '/user/list',
    component: () => import('@/views/'),
    children: [],
    meta: {
      title: '用户管理',
    },
  },
  {
    path: '/comment/list',
    name: '/comment/list',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '评论管理',
    },
  },
  {
    path: '/manager/list',
    name: '/manager/list',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '管理员管理',
    },
  },
  {
    path: '/access/list',
    name: '/access/list',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '权限管理',
    },
  },
  {
    path: '/role/list',
    name: '/role/list',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '角色管理',
    },
  },
  {
    path: '/setting/base',
    name: '/setting/base',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '基础设置',
    },
  },
  {
    path: '/setting/buy',
    name: '/setting/buy',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '交易设置',
    },
  },
  {
    path: '/setting/ship',
    name: '/setting/ship',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '物流设置',
    },
  },
  {
    path: '/distribution/index',
    name: '/distribution/index',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '分销员管理',
    },
  },
  {
    path: '/distribution/setting',
    name: '/distribution/setting',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '分销设置',
    },
  },
  {
    path: '/image/list',
    name: '/image/list',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '图库管理',
    },
  },
  {
    path: '/notic/list',
    name: '/notic/list',
    component: () => import('@/views'),
    children: [],
    meta: {
      title: '公告管理',
    },
  },
]

export { routerOptions }
