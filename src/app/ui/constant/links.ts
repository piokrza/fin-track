import { Path } from '#core/enum';
import { Link } from '#ui/model';

export const links: Link[] = [
  {
    label: 'Dashboard',
    routerLink: Path.DASHBOARD,
  },
  {
    label: 'Categories',
    routerLink: Path.CATEGORIES,
  },
  {
    label: 'History',
    routerLink: Path.HISTORY,
  },
  {
    label: 'Budget',
    routerLink: Path.BUDGET,
  },
  {
    label: 'Settings',
    routerLink: Path.SETTINGS,
  },
];
