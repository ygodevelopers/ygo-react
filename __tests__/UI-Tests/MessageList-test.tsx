import React from 'react';
import { render } from '@testing-library/react-native';
import { MessageList } from '@/components/MessageList';
import { Message } from '@/types';

const messages : Message[] = [
    {fromId: 'john', toId: 'test', id: '123', isEncrypted: false, messageText: 'hello world!', status: 0, timestamp: new Date() as any}
]

describe('<MessageList />', () => {
    it('should render messages correctly', () => {
        const { getByText } = render(<MessageList messages={messages} userID='john'/>);
        expect(getByText("hello world!")).toBeTruthy();
    });

});