import { ChatroomNg2RxjsDemoCliPage } from './app.po';

describe('chatroom-ng2-rxjs-demo-cli App', function() {
  let page: ChatroomNg2RxjsDemoCliPage;

  beforeEach(() => {
    page = new ChatroomNg2RxjsDemoCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
