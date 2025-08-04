import React from 'react';
import { render } from '@testing-library/react-native';
import { ContactBanner } from '@/components/ContactBanner';
import { User } from '@/types';

const testUser : User = {
    email: 'test@test.com',
    firstName: 'FName',
    lastName: 'LName',
    id: '123'
}

describe('<ContactBanner />', () => {
    it('should render email, first name, and last name', () => {
        const { getByText } = render(<ContactBanner contact={testUser} />);
        expect(getByText(/FName/)).toBeTruthy();
        expect(getByText(/LName/)).toBeTruthy();
        expect(getByText("test@test.com")).toBeTruthy();
    });

});