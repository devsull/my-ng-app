import { MyNgAppPage } from './app.po';

describe('my-ng-app App', () => {
  let page: MyNgAppPage;

  beforeEach(() => {
    page = new MyNgAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
