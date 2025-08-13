
import React from 'react';
import { render } from '@testing-library/react-native';
import SingUp from '@/app/signUp';

describe('<SingUp />', () => {
    it('should render several instances of Sign Up text', () => {
        const { getAllByText } = render(<SingUp />);
        expect(getAllByText("Sign Up").length > 0).toBeTruthy();
    });

    it('should render email, name, and password inputs', () => {
        const { getByPlaceholderText } = render(<SingUp />);
        expect(getByPlaceholderText("Username")).toBeTruthy();
        expect(getByPlaceholderText("Email address")).toBeTruthy();
        expect(getByPlaceholderText("Password")).toBeTruthy();
        expect(getByPlaceholderText("Profile url")).toBeTruthy();
        expect(getByPlaceholderText("Password")).toBeTruthy();
    });

    it('should offer back button', () => {
        const { getByText } = render(<SingUp />);
        expect(getByText("Already have an account?")).toBeTruthy();
    });
});