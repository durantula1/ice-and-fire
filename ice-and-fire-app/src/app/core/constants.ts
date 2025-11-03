export const CARDS_SKELETON_DELAY = 500;
export const CARDS_SKELETON_COUNT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
export enum ToastSeverity {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}
export const DEFAULT_TOAST_TITLE = {
  SUCCESS: 'Success',
  ERROR: 'Error',
  INFO: 'Info',
  WARNING: 'Warning',
};

export const HEADER_MENU_ITEMS = [
  {
    label: 'Characters',
    icon: 'pi pi-users',
    routerLink: '/characters',
  },
  {
    label: 'Favorites',
    icon: 'pi pi-heart',
    routerLink: '/favorites',
  },
];
