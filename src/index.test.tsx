import * as React from 'react';
import { JsonView, defaultStyles, allExpanded, collapseAllNested } from '.';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('JsonView', () => {
  it('should render object', () => {
    render(<JsonView style={defaultStyles} data={{ test: true }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should render object with default styles', () => {
    render(<JsonView data={{ test: true }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should render object with incomplete style object', () => {
    render(<JsonView style={{}} data={{ test: true }} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
  });

  it('should render object and call shouldInitiallyExpand only once', () => {
    let invoked = 0;
    const shouldInitiallyExpand = () => {
      ++invoked;
      return true;
    };
    render(<JsonView data={{ test: true }} shouldInitiallyExpand={shouldInitiallyExpand} />);
    expect(screen.getByText(/test/)).toBeInTheDocument();
    expect(screen.getByText('true')).toBeInTheDocument();
    expect(invoked).toBe(1);
  });

  it('allExpanded should always return true', () => {
    expect(allExpanded()).toBeTruthy();
  });

  it('collapseAllNested should always return true for 0', () => {
    expect(collapseAllNested(0)).toBeTruthy();
    expect(collapseAllNested(1)).toBeFalsy();
    expect(collapseAllNested(2)).toBeFalsy();
    expect(collapseAllNested(3)).toBeFalsy();
  });
});
