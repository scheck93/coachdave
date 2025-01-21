import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { GroupDetailsModal } from './GroupDetailsModal';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface FeedItemProps {
  username: string;
  groupInfo?: string;
  memberCount?: number;
  streakCount?: number;
  timeAgo: string;
  action: string;
  likes: number;
  comments: number;
}

export const FeedItem = ({
  username,
  groupInfo,
  memberCount = 0,
  streakCount,
  timeAgo,
  action,
  likes,
  comments
}: FeedItemProps) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleRequestJoin = () => {
    // Handle join request
    setModalVisible(false);
  };

  const handleRequestGuest = () => {
    // Handle guest request
    setModalVisible(false);
  };

  return (
    <>
      <StyledView className="bg-white p-4 mb-2">
        <StyledView className="flex-row justify-between items-center mb-2">
          <StyledView className="flex-row items-center flex-1">
            <StyledView className="w-10 h-10 bg-gray-200 rounded-full mr-3" />
            <StyledView className="flex-1">
              <StyledView className="flex-row items-center">
                <StyledText className="font-semibold text-base">{username}</StyledText>
                {streakCount && (
                  <StyledView className="bg-orange-100 rounded-full px-3 py-1 ml-2">
                    <StyledText className="text-orange-500 text-sm">🔥 {streakCount} week streak!</StyledText>
                  </StyledView>
                )}
              </StyledView>
              {groupInfo && (
                <StyledText className="text-gray-500 text-sm">{groupInfo} • {timeAgo}</StyledText>
              )}
              {!groupInfo && (
                <StyledText className="text-gray-500 text-sm">{timeAgo}</StyledText>
              )}
            </StyledView>
          </StyledView>
          <StyledTouchableOpacity onPress={() => setModalVisible(true)}>
            <StyledText className="text-gray-400 text-2xl">...</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        <StyledView className="bg-gray-50 rounded-lg p-3 mb-3">
          <StyledView className="flex-row items-center">
            <StyledText className="text-gray-800">{action} 🧇</StyledText>
          </StyledView>
        </StyledView>

        <StyledView className="flex-row items-center">
          <StyledTouchableOpacity className="flex-row items-center mr-4">
            <StyledText className="text-gray-500">♡ {likes}</StyledText>
          </StyledTouchableOpacity>
          <StyledTouchableOpacity className="flex-row items-center">
            <StyledText className="text-gray-500">💬 {comments}</StyledText>
          </StyledTouchableOpacity>
        </StyledView>
      </StyledView>

      <GroupDetailsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        groupName={groupInfo?.split('•')[0].trim() || ''}
        memberCount={memberCount}
        onRequestJoin={handleRequestJoin}
        onRequestGuest={handleRequestGuest}
      />
    </>
  );
};
