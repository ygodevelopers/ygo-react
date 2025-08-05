import React from 'react';
import { render } from '@testing-library/react-native';
import { MessageBubble } from '@/components/MessageBubble';
import { User } from '@/types';

describe('<MessageBubble />', () => {
    it('should render text correctly', () => {
        const { getByText } = render(<MessageBubble message={'hello'} fromUser={true}/>);
        expect(getByText("hello")).toBeTruthy();
    });

});