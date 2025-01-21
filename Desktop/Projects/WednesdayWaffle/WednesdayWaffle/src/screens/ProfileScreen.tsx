import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export const ProfileScreen = () => {
  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <StyledView className="px-4 pt-12 pb-2">
        <StyledText className="text-2xl font-semibold text-gray-900">
          Profile
        </StyledText>
      </StyledView>

      {/* Content */}
      <StyledView className="p-4">
        <StyledText className="text-gray-600">
          Your Waffle Profile
        </StyledText>
      </StyledView>
    </ScrollView>
  );
};
