import React from 'react';
import { View, Text, TouchableOpacity, Modal } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface GroupDetailsModalProps {
  visible: boolean;
  onClose: () => void;
  groupName: string;
  memberCount: number;
  onRequestJoin: () => void;
  onRequestGuest: () => void;
}

export const GroupDetailsModal = ({
  visible,
  onClose,
  groupName,
  memberCount,
  onRequestJoin,
  onRequestGuest
}: GroupDetailsModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <StyledView className="flex-1 justify-end bg-black/50">
        <StyledView className="bg-white rounded-t-3xl p-6">
          <StyledView className="items-center mb-6">
            <StyledView className="w-12 h-1 bg-gray-300 rounded-full mb-4" />
            <StyledText className="text-2xl font-bold">{groupName}</StyledText>
            <StyledText className="text-gray-500 mt-1">{memberCount} members</StyledText>
          </StyledView>

          <StyledView className="space-y-4">
            <StyledTouchableOpacity
              className="bg-blue-500 rounded-xl p-4"
              onPress={onRequestJoin}
            >
              <StyledText className="text-white text-center font-semibold text-lg">
                Request to Join Weekly Waffle
              </StyledText>
              <StyledText className="text-white/80 text-center mt-1">
                Participate every Wednesday
              </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className="border border-blue-500 rounded-xl p-4"
              onPress={onRequestGuest}
            >
              <StyledText className="text-blue-500 text-center font-semibold text-lg">
                Request Guest Appearance
              </StyledText>
              <StyledText className="text-gray-500 text-center mt-1">
                Join for one Wednesday
              </StyledText>
            </StyledTouchableOpacity>

            <StyledTouchableOpacity
              className="p-4"
              onPress={onClose}
            >
              <StyledText className="text-gray-500 text-center">
                Cancel
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>
      </StyledView>
    </Modal>
  );
};
