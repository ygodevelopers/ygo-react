import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SelectPillarDropDown } from '@/components/SelectPillarDropDown';

// Mock the usePillar hook
jest.mock('@/context/pillarContext', () => ({
  usePillar: () => ({
    Pillars: [
      { id: 1, title: 'Health', icon: '🏥' },
      { id: 2, title: 'Finance', icon: '💰' },
      { id: 3, title: 'Career', icon: '💼' },
    ]
  })
}));

// Mock FontAwesome
jest.mock('@expo/vector-icons/FontAwesome', () => 'FontAwesome');

// Mock SelectDropdown with interactive functionality
jest.mock('react-native-select-dropdown', () => {
  const React = require('react');
  const { View, Text, TouchableOpacity } = require('react-native');
  
  return React.forwardRef(({
    data = [],
    onSelect,
    renderButton,
    renderItem,
    ...props
  }, ref) => {
    const [selectedItem, setSelectedItem] = React.useState(null);
    const [isOpened, setIsOpened] = React.useState(false);

    const handleSelect = (item, index) => {
      setSelectedItem(item);
      onSelect && onSelect(item, index);
      setIsOpened(false);
    };

    const toggleDropdown = () => {
      setIsOpened(!isOpened);
    };

    return (
      <View testID="select-dropdown-container">
        <TouchableOpacity
          testID="dropdown-button"
          onPress={toggleDropdown}
        >
          {renderButton ? renderButton(selectedItem, isOpened) : (
            <Text testID="button-text">{selectedItem?.title || 'Select an option'}</Text>
          )}
        </TouchableOpacity>
        
        {isOpened && (
          <View testID="dropdown-menu">
            {data.map((item, index) => (
              <TouchableOpacity
                key={index}
                testID={`dropdown-item-${index}`}
                onPress={() => handleSelect(item, index)}
              >
                {renderItem ? renderItem(item, index, selectedItem === item) : (
                  <Text testID={`item-text-${index}`}>{item.title}</Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        
        <Text testID="dropdown-data-length">{data?.length || 0}</Text>
      </View>
    );
  });
});

describe('<SelectPillarDropDown />', () => {
  const mockHandleSelectPillar = jest.fn();

  beforeEach(() => {
    mockHandleSelectPillar.mockClear();
  });

  it('should render default text correctly', () => {
    const { getByText } = render(
      <SelectPillarDropDown 
        handleSelectPillar={mockHandleSelectPillar} 
        showIcons={true}
      />
    );
    expect(getByText("Select an initial chat Pillar")).toBeTruthy();
  });

  it('should render with mocked pillars data', () => {
    const { getByTestId } = render(
      <SelectPillarDropDown 
        handleSelectPillar={mockHandleSelectPillar} 
        showIcons={true}
      />
    );
    // Check that the component receives the mocked data
    expect(getByTestId('dropdown-data-length')).toHaveTextContent('3');
  });

  it('should open dropdown when button is pressed', () => {
    const { getByTestId, queryByTestId } = render(
      <SelectPillarDropDown 
        handleSelectPillar={mockHandleSelectPillar} 
        showIcons={false}
      />
    );

    // Initially dropdown menu should not be visible
    expect(queryByTestId('dropdown-menu')).toBeNull();

    // Press the dropdown button
    fireEvent.press(getByTestId('dropdown-button'));

    // Now dropdown menu should be visible
    expect(getByTestId('dropdown-menu')).toBeTruthy();
  });

  it('should display pillar options when dropdown is opened', () => {
    const { getByTestId, getByText } = render(
      <SelectPillarDropDown 
        handleSelectPillar={mockHandleSelectPillar} 
        showIcons={false}
      />
    );

    // Open the dropdown
    fireEvent.press(getByTestId('dropdown-button'));

    // Check that all pillar options are displayed
    expect(getByText('Health')).toBeTruthy();
    expect(getByText('Finance')).toBeTruthy();
    expect(getByText('Career')).toBeTruthy();
  });

  it('should replace default text when a pillar is selected', () => {
    const { getByTestId, getByText, queryByText } = render(
      <SelectPillarDropDown 
        handleSelectPillar={mockHandleSelectPillar} 
        showIcons={false}
      />
    );

    // Initially shows default text
    expect(getByText("Select an initial chat Pillar")).toBeTruthy();

    // Open dropdown
    fireEvent.press(getByTestId('dropdown-button'));

    // Select the "Health" pillar
    fireEvent.press(getByTestId('dropdown-item-0'));

    // Default text should be replaced with selected pillar title
    expect(queryByText("Select an initial chat Pillar")).toBeNull();
    expect(getByText("Health")).toBeTruthy();
  });

  it('should call handleSelectPillar with correct pillar when item is selected', () => {
    const { getByTestId } = render(
      <SelectPillarDropDown 
        handleSelectPillar={mockHandleSelectPillar} 
        showIcons={false}
      />
    );

    // Open dropdown
    fireEvent.press(getByTestId('dropdown-button'));

    // Select the "Finance" pillar (index 1)
    fireEvent.press(getByTestId('dropdown-item-1'));

    // Check that handleSelectPillar was called with the correct pillar
    expect(mockHandleSelectPillar).toHaveBeenCalledTimes(1);
    expect(mockHandleSelectPillar).toHaveBeenCalledWith({
      id: 2,
      title: 'Finance',
      icon: '💰'
    });
  });

  it('should close dropdown after selecting an item', () => {
    const { getByTestId, queryByTestId } = render(
      <SelectPillarDropDown 
        handleSelectPillar={mockHandleSelectPillar} 
        showIcons={false}
      />
    );

    // Open dropdown
    fireEvent.press(getByTestId('dropdown-button'));
    expect(getByTestId('dropdown-menu')).toBeTruthy();

    // Select an item
    fireEvent.press(getByTestId('dropdown-item-0'));

    // Dropdown should be closed
    expect(queryByTestId('dropdown-menu')).toBeNull();
  });

  it('should display icons when showIcons is true', () => {
    const { getByTestId, getByText } = render(
      <SelectPillarDropDown 
        handleSelectPillar={mockHandleSelectPillar} 
        showIcons={true}
      />
    );

    // Open dropdown
    fireEvent.press(getByTestId('dropdown-button'));

    // Check that icons are displayed instead of titles
    expect(getByText('🏥')).toBeTruthy();
    expect(getByText('💰')).toBeTruthy();
    expect(getByText('💼')).toBeTruthy();
  });

  it('should display titles when showIcons is false', () => {
    const { getByTestId, getByText } = render(
      <SelectPillarDropDown 
        handleSelectPillar={mockHandleSelectPillar} 
        showIcons={false}
      />
    );

    // Open dropdown
    fireEvent.press(getByTestId('dropdown-button'));

    // Check that titles are displayed instead of icons
    expect(getByText('Health')).toBeTruthy();
    expect(getByText('Finance')).toBeTruthy();
    expect(getByText('Career')).toBeTruthy();
  });

  it('should handle multiple selections correctly', () => {
    const { getByTestId, getByText, queryByText } = render(
      <SelectPillarDropDown 
        handleSelectPillar={mockHandleSelectPillar} 
        showIcons={false}
      />
    );

    // Select first pillar
    fireEvent.press(getByTestId('dropdown-button'));
    fireEvent.press(getByTestId('dropdown-item-0'));
    expect(getByText("Health")).toBeTruthy();

    // Select different pillar
    fireEvent.press(getByTestId('dropdown-button'));
    fireEvent.press(getByTestId('dropdown-item-2'));
    
    // Should show new selection and hide previous
    expect(queryByText("Health")).toBeNull();
    expect(getByText("Career")).toBeTruthy();
    
    // Handler should be called twice
    expect(mockHandleSelectPillar).toHaveBeenCalledTimes(2);
  });
});