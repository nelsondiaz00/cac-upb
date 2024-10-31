import HeaderTemplate from '../../shared/template/HeaderTemplate.js';

export default class IndexView {
  private readonly elements: { [name: string]: HTMLElement };

  constructor() {
    this.elements = {
      searchForm:
        (document.querySelector('#search') as unknown as HTMLInputElement) ??
        document.createElement('form'),
      main: document.querySelector('main') ?? document.createElement('main'),
      path:
        document.querySelector('meta[name=path]') ??
        document.createElement('meta'),
    };
  }

  public getPageFromMeta = (): string => {
    const pathElement = this.elements['path'];
    return pathElement ? pathElement.getAttribute('page') ?? 'error' : 'error';
  };

  // public init = (searchMovies: (search: string) => void): void => {
  //   this.searchMoviesForm(searchMovies);
  // };

  public renderMain = (componentName: string): void => {
    if (this.elements['main'] !== undefined) {
      this.elements['main'].innerHTML = '';
      this.elements['main'].appendChild(document.createElement(componentName));
      this.addDropdown();
    }
  };

  public async addDropdown(): Promise<void> {
    const navigateApp = document.querySelector('.navigate-app');
    if (navigateApp) {
      const employeeData = localStorage.getItem('employee');
      const parsedUser = employeeData ? JSON.parse(employeeData) : null;
      console.log(parsedUser);
      if (parsedUser) {
        let templateString;
        if (parsedUser.role === 'ADMIN') {
          templateString = await HeaderTemplate.renderDropDownAdmin(
            parsedUser.name
          );
        } else {
          templateString = await HeaderTemplate.renderDropDownEmployee(
            parsedUser.name
          );
        }
        const template = document.createElement('div');
        template.className = 'item';
        template.innerHTML = templateString;
        navigateApp.appendChild(template);
      } else {
        const templateString = await HeaderTemplate.renderHeaderButton();
        const template = document.createElement('div');
        template.className = 'item';
        template.innerHTML = templateString;
        navigateApp.appendChild(template);
      }
    }
  }
}
