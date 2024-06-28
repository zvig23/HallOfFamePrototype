export type Page = {
    name: string;
    route: string;
    icon: React.ReactNode;
  }
  
  export const createPage = (name: string,
    route: string,
    icon: React.ReactNode,
  ): Page => {
    return {
      name: name,
      route: route,
      icon: icon
    }
  }