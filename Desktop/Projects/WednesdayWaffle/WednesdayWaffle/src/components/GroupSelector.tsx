import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledText = styled(Text);

interface GroupSelectorProps {
  groups: Array<{ name: string }>;
  selectedIndex: number;
  onSelect: (index: number) => void;
}

export const GroupSelector = ({ groups, selectedIndex, onSelect }: GroupSelectorProps) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="px-4 py-2"
    >
      {groups.map((group, index) => (
        <StyledTouchableOpacity
          key={index}
          onPress={() => onSelect(index)}
          className={`mr-3 px-4 py-2 rounded-full ${
            selectedIndex === index 
              ? 'bg-yellow-400' 
              : 'bg-gray-200'
          }`}
        >
          <StyledText className={
            selectedIndex === index 
              ? 'text-black' 
              : 'text-gray-600'
          }>
            {group.name}
          </StyledText>
        </StyledTouchableOpacity>
      ))}
    </ScrollView>
  );
};
