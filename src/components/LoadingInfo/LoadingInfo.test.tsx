import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { LoadingInfo } from './LoadingInfo';

describe('the LoadingInfo component', () => {
  it('should display loading text', () => {
    const loadingInfo = render(<LoadingInfo />);

    const paragraph = loadingInfo.getByText('Loading...');

    expect(paragraph).toBeDefined();
  });
});
