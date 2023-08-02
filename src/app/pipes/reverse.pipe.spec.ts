import { ReversePipe } from './reverse.pipe';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });

  it('reverse text: sala to alas', () => {
    const pipe = new ReversePipe();
    const text = 'sala';
    const textTransformed =  pipe.transform(text);

    expect(textTransformed).toEqual('alas');
    
  });

});
