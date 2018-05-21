import { renderComponent , expect } from '../test_helper';
import CommentBox from '../../src/components/comment_box';

describe('CommentBox' , () => {
  let component;

  beforeEach(() => {
    component = renderComponent(CommentBox);
  });

  it('has correct class', () => {
    expect(component).to.have.class('CommentBox');
  });

  it('has text area', () => {
    expect(component.find('textarea')).to.exist;
  });

  it('has button', () => {
    expect(component.find('button')).to.exist;
  });

  describe('entering some test',() => {

    beforeEach(() => {
        component.find('textarea').simulate('change','new comment');
      });

    it('shows text in textArea', () => {
        expect(component.find('textarea')).to.have.value('new comment');
      });
    
      it('when submitted,clears input', () => {
        component.simulate('submit'); 
        expect(component.find('textarea')).to.have.value('');
      });
  });
  

});
