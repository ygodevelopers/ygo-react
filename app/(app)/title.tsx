import { Text } from "react-native"

interface TitleProps {
    text: string;
    color?: string; // Optional prop with a default value
  }

  export default function Title({ text, color = 'white' }:TitleProps)
{
    return (
        <Text 
            style={{
                color: color,
                textAlign: 'center',
                fontSize: 40
            }}>
            {text}
        </Text>
    )
}
