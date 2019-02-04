export class MenuItem {
    linkText: string;
    linkSref: string;
    isActive: boolean;
    subMenu?: MenuItem[];
    onClick?: Function;
    toggleSubMenu?: boolean;
    icon?: string;
  }
  