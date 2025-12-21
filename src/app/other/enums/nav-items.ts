// declaration of one NavItem
export type NavItem = {
  tooltip: string;
  icon: string;
  link: string;
};

/**
 * Enum for all menu items in order to switch between them in the sidenav.
 */
export enum NavItems {
  DASHBOARD,
}
