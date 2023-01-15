import '@testing-library/jest-dom';
import { fireEvent, screen, render } from '@testing-library/react';
import AuthProvider, { AuthContext } from '../Context/Auth';

describe('Auth Integration', () => {
  it('contains initial user and isLoggedIn Values', () => {
    render(
      <AuthProvider>
        <AuthContext.Consumer>
          {
            ({ isLoggedIn, user }) => (
              <>
                <p data-testid="isLoggedIn">{isLoggedIn.toString()}</p>
                <p data-testid="userObject">{typeof (user)}</p>
                <p data-testid="userKeys">{Object.keys(user).length}</p>
              </>
            )
          }
        </AuthContext.Consumer>
      </AuthProvider>
    );

    const isLoggedInP = screen.getByTestId('isLoggedInP');
    const userObjectP = screen.getByTestId('userObjecPt');
    const userKeysP = screen.getByTestId('userKeysP');

    expect(isLoggedInP).toHaveTextContent('false');
    expect(userObjectP).toHaveTextContent('object');
    expect(userKeysP).toHaveTextContent(0);
  })
})
