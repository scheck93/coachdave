import React from 'react';
import { View, ViewStyle } from 'react-native';
import { styled } from 'nativewind';
import { Ionicons } from '@expo/vector-icons';

const StyledView = styled(View);

interface IconProps {
  name: keyof typeof Ionicons.glyphMap;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

export const Icon = ({ name, size = 24, color = '#000000', style }: IconProps) => {
  return (
    <StyledView style={style}>
      <Ionicons name={name} size={size} color={color} />
    </StyledView>
  );
};
