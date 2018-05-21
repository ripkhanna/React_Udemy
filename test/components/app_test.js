import { renderComponent , expect } from '../test_helper';
import App from '../../src/components/app';

describe('App' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(App);
  });

  it('show comment box', () => {
    expect(component.find('.CommentBox')).to.exist;
  });

  it('shows comment list', () => {
    expect(component.find('.CommentList')).to.exist;
  });


});
