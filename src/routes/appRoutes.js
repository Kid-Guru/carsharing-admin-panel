export default {
  root: () => '/',
  login: () => '/login',
  dashboard: () => '/dashboard',
  dashboardOrders: () => '/dashboard/orders',
  dashboardOrder: (id) => `/dashboard/order/${id}`,
  dashboardCars: () => '/dashboard/cars',
  dashboardCarEdit: (id) => `/dashboard/car/${id}`,
  dashboardCarNew: () => '/dashboard/carNew/',
  dashboardCities: () => '/dashboard/cities',
  dashboardPoints: () => '/dashboard/points',
  dashboardRates: () => '/dashboard/rates',
  dashboardRateTypes: () => '/dashboard/rateTypes',
};
