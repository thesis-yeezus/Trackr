import { TrackrPage } from './app.po';

describe('trackr App', function() {
  let page: TrackrPage;

  beforeEach(() => {
    page = new TrackrPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
