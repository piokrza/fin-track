export interface MenuItem {
  label: string;
  routerLink?: string;
  command?: () => void;
}
