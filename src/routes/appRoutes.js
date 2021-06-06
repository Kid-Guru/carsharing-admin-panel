export default {
  root: () => '/',
  login: () => '/login',
  dashboard: () => '/dashboard',
  dashboardOrders: () => '/dashboard/orders',
  dashboardOrder: (id) => `/dashboard/order/${id}`,
  dashboardCars: () => '/dashboard/cars',
};
