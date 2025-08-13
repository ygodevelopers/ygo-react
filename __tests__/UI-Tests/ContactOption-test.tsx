import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import { ContactOption } from '@/components/ContactOption';

// Mock the FontAwesome6 component
jest.mock('@expo/vector-icons', () => ({
  FontAwesome6: ({ name, size, color, testID, ...props }) => {
    const MockedIcon = require('react-native').Text;
    return (
      <MockedIcon testID={testID || 'mocked-icon'} {...props}>
        {name}
      </MockedIcon>
    );
  },
}));

describe('ContactOption Component', () => {
    const mockHandlePress = jest.fn();
    const mockSymbol = <FontAwesome6 name="phone" size={20} color="#374151" testID="contact-icon" />;
    const mockText = 'Call Support';

    beforeEach(() => {
        mockHandlePress.mockClear();
    });

    describe('Rendering', () => {
        it('renders correctly with all props', () => {
            const { getByTestId, getByText } = render(
                <ContactOption
                symbol={mockSymbol}
                text={mockText}
                handlePress={mockHandlePress}
                />
            );
            expect(getByText(mockText)).toBeTruthy();
            expect(getByTestId('contact-icon')).toBeTruthy();
        });

        it('renders the provided text correctly', () => {
            const customText = 'Send Email';
            const { getByText } = render(
                <ContactOption
                symbol={mockSymbol}
                text={customText}
                handlePress={mockHandlePress}
                />
            );
            expect(getByText(customText)).toBeTruthy();
        });

        it('renders the provided symbol component', () => {
            const customSymbol = <FontAwesome6 name="email" size={20} color="#374151" testID="email-icon" />;
            const { getByTestId } = render(
                <ContactOption
                symbol={customSymbol}
                text={mockText}
                handlePress={mockHandlePress}
                />
            );
            expect(getByTestId('email-icon')).toBeTruthy();
        });

        it('matches snapshot', () => {
            const component = render(
                <ContactOption
                symbol={mockSymbol}
                text={mockText}
                handlePress={mockHandlePress}
                />
            );

            expect(component.toJSON()).toMatchSnapshot();
        });
    });

    describe('Props validation', () => {
        it('handles different text lengths correctly', () => {
            const longText = 'This is a very long contact option text that should still render properly';
            const { getByText } = render(
                <ContactOption
                symbol={mockSymbol}
                text={longText}
                handlePress={mockHandlePress}
                />
            );
            expect(getByText(longText)).toBeTruthy();
        });

        it('handles empty text', () => {
            const { queryByText } = render(
                <ContactOption
                symbol={mockSymbol}
                text=""
                handlePress={mockHandlePress}
                />
            );
            expect(queryByText('')).toBeTruthy();
        });

        it('handles different icon components', () => {
            const customIcon = <FontAwesome6 name="chat" size={24} color="#059669" testID="chat-icon" />;
            const { getByTestId } = render(
                <ContactOption
                symbol={customIcon}
                text={mockText}
                handlePress={mockHandlePress}
                />
            );

            expect(getByTestId('chat-icon')).toBeTruthy();
        });
    });

    describe('Multiple instances', () => {
        it('renders multiple ContactOption components correctly', () => {
            const options = [
                { symbol: <FontAwesome6 name="phone" testID="phone-icon" />, text: 'Call', handler: jest.fn() },
                { symbol: <FontAwesome6 name="email" testID="email-icon" />, text: 'Email', handler: jest.fn() },
                { symbol: <FontAwesome6 name="chat" testID="chat-icon" />, text: 'Chat', handler: jest.fn() }
            ];

            const { getByText, getByTestId } = render(
                <>
                {options.map((option, index) => (
                    <ContactOption
                    key={index}
                    symbol={option.symbol}
                    text={option.text}
                    handlePress={option.handler}
                    />
                ))}
                </>
            );

            options.forEach((option) => {
                expect(getByText(option.text)).toBeTruthy();
            });

            expect(getByTestId('phone-icon')).toBeTruthy();
            expect(getByTestId('email-icon')).toBeTruthy();
            expect(getByTestId('chat-icon')).toBeTruthy();
        });
    })
});