
import React from 'react';
import { render } from '@testing-library/react-native';
import SingIn from '@/app/signIn';

describe('<SignIn />', () => {
  it('should render forgot password text', () => {
    const { getByText } = render(<SingIn />);
    expect(getByText("Forgot password?")).toBeTruthy();
  });

  it('should render sign in button', () => {
    const { getByText } = render(<SingIn />);
    expect(getByText("Sign In")).toBeTruthy();
  });

  it('should render email and password inputs', () => {
    const { getByPlaceholderText } = render(<SingIn />);
    expect(getByPlaceholderText("Email address")).toBeTruthy();
    expect(getByPlaceholderText("Password")).toBeTruthy();
  });

  it('should render sign up link', () => {
    const { getByText } = render(<SingIn />);
    expect(getByText("Sign Up")).toBeTruthy();
  });
});