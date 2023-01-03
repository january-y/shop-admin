export const routeOptions = [
  {
    path: '/main-control',
    name: '/main-control',
    component: () => import('@/views/admin-panel/main-control/main-control.vue'),
    children: [],
    meta: {
      title: '主控台',
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
      title: '分类管理',
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
    component: () => import('@/views/goods/coupon-list/coupon-list.vue'),
    children: [],
    meta: {
      title: '优惠券管理',
    },
  },
  {
    path: '/user/list',
    name: '/user/list',
    component: () => import('@/views/user/user-list/user-list.vue'),
    children: [],
    meta: {
      title: '用户管理',
    },
  },
  {
    path: '/level/list',
    name: '/level/list',
    component: () => import('@/views/user/level-list/level-list.vue'),
    children: [],
    meta: {
      title: '会员等级',
    },
  },
  {
    path: '/order/list',
    name: '/order/list',
    component: () => import('@/views/order/order-list/order-list.vue'),
    children: [],
    meta: {
      title: '订单管理',
    },
  },
  {
    path: '/comment/list',
    name: '/comment/list',
    component: () => import('@/views/order/comment-list/comment-list.vue'),
    children: [],
    meta: {
      title: '评论管理',
    },
  },
  {
    path: '/manager/list',
    name: '/manager/list',
    component: () => import('@/views/manager/manager-list/manager-list.vue'),
    children: [],
    meta: {
      title: '管理员管理',
    },
  },
  {
    path: '/access/list',
    name: '/access/list',
    component: () => import('@/views/manager/access-list/access-list.vue'),
    children: [],
    meta: {
      title: '权限管理',
    },
  },
  {
    path: '/role/list',
    name: '/role/list',
    component: () => import('@/views/manager/role/role.vue'),
    children: [],
    meta: {
      title: '角色管理',
    },
  },
  {
    path: '/setting/base',
    name: '/setting/base',
    component: () => import('@/views/setting/setting-origin/setting-origin.vue'),
    children: [],
    meta: {
      title: '基础设置',
    },
  },
  {
    path: '/setting/buy',
    name: '/setting/buy',
    component: () => import('@/views/setting/setting-buy/setting-buy.vue'),
    children: [],
    meta: {
      title: '交易设置',
    },
  },
  {
    path: '/setting/ship',
    name: '/setting/ship',
    component: () => import('@/views/setting/setting-ship/setting-ship.vue'),
    children: [],
    meta: {
      title: '物流设置',
    },
  },
  {
    path: '/distribution/index',
    name: '/distribution/index',
    component: () => import('@/views/distribution/distribution-index/distribution-index.vue'),
    children: [],
    meta: {
      title: '分销员管理',
    },
  },
  {
    path: '/distribution/setting',
    name: '/distribution/setting',
    component: () => import('@/views/distribution/distribution-setting/distribution-setting.vue'),
    children: [],
    meta: {
      title: '分销设置',
    },
  },
  {
    path: '/image/list',
    name: '/image/list',
    component: () => import('@/views/more/image-list/image-list.vue'),
    children: [],
    meta: {
      title: '图库管理',
    },
  },
  {
    path: '/notice/list',
    name: '/notice/list',
    component: () => import('@/views/more/notice-list/notice-list.vue'),
    children: [],
    meta: {
      title: '公告管理',
    },
  },
]
