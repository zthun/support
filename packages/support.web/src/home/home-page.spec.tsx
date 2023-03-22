import { render, waitFor } from '@testing-library/react';
import React from 'react';
import { ZSupportHomePage } from './home-page';

/* eslint-disable require-jsdoc */
describe('ZSupportHomePage', () => {
  async function createTestTarget() {
    const target = render(<ZSupportHomePage />);

    await waitFor(() => expect(target.container.querySelector('.ZSupportHomePage-root')).toBeTruthy());

    return target;
  }

  it('should render the component.', async () => {
    // Arrange.
    // Act
    const target = await createTestTarget();
    // Assert
    expect(target).toBeTruthy();
  });
});
