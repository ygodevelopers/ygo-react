import { usePillar } from '@/context/pillarContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import {View, Text, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

export const SelectPillarDropDown = ({handleSelectPillar, showIcons} : {handleSelectPillar: Function, showIcons: Boolean}) => {
    const {Pillars} = usePillar();
    
    return (
        <SelectDropdown
                data={Pillars}
                onSelect={(selectedItem, index) => {
                    handleSelectPillar(selectedItem);
                }}
                renderButton={(selectedItem, isOpened) => {
                    return (
                        <View style={styles.dropdownButtonStyle}>
                            <Text style={styles.dropdownButtonTxtStyle}>
                                {(selectedItem && selectedItem.title) || 'Select an initial chat Pillar'}
                            </Text>
                            <FontAwesome 
                                name={isOpened ? 'chevron-up' : 'chevron-down'} 
                                size={16} 
                                color="#151E26"
                            />
                        </View>
                    );
                }}
                renderItem={(item, index, isSelected) => {
                    return (
                        <View style={{
                            ...styles.dropdownItemStyle, 
                            ...(isSelected && {backgroundColor: '#D2D9DF'}),
                            borderBottomWidth: index < Pillars.length - 1 ? 1 : 0,
                            borderBottomColor: '#C0C0C0'
                        }}>
                            <Text style={styles.dropdownItemTxtStyle}>{showIcons ? item.icon : item.title}</Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={true}
                dropdownStyle={styles.dropdownMenuStyle}
                dropdownOverlayColor="transparent"
                
            />
    )
}


// Copied styles from documentation
const styles = StyleSheet.create({
    bottomSheetContent: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        alignItems: 'center',
    },
    bottomSheetTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#151E26',
        marginBottom: 20,
    },
    dropdownButtonStyle: {
        width: 300,
        height: 50,
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#D1D5DB',
    },
    dropdownButtonTxtStyle: {
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
        flex: 1,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 12,
        marginTop: 4,
        width: 250,
        maxHeight: 300,
        borderWidth: 1,
        borderColor: '#D1D5DB',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 16,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingVertical: 12,
        minHeight: 44,
    },
    dropdownItemTxtStyle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#151E26',
        textAlign: 'left',
    },
});