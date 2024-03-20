/**
 * Enum for routes used for navigation in the frontend.
 */
export enum NavRoutes {
  // basic routes
  TENANT = 'tenant',
  DASHBOARD = 'dashboard',
  USER = 'user',
  TIME_TRACKING = 'time-tracking',
  CALENDAR = 'calendar',
  MAP = 'map',
  CUSTOMERS = 'customers',

  // settings routes
  SETTINGS = 'settings',
  PROFILE = 'profile',
  ROLES = 'roles',
  PASSWORD = 'password',
  GLOBAL_USERS = 'global-users',

  // auth routes
  AUTH = 'auth',
  LOGIN = 'login',
  RESET_PASSWORD = 'reset-password',

  // error routes
  ERROR = 'error',
  ERROR_OUT = 'error-out',
}
