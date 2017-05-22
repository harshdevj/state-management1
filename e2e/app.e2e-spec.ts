import { StateManagementPage } from './app.po';

describe('state-management App', () => {
  let page: StateManagementPage;

  beforeEach(() => {
    page = new StateManagementPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
