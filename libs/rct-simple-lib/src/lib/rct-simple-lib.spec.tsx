import { render } from '@testing-library/react';

import RctSimpleLib from './rct-simple-lib';

describe('RctSimpleLib', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<RctSimpleLib />);
    expect(baseElement).toBeTruthy();
  });
});
