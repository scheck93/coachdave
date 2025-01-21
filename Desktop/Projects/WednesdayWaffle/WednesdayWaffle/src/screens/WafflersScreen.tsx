import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { styled } from 'nativewind';
import { Card, CardContent } from '../components/Card';
import { FeedItem } from '../components/FeedItem';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Mock data - would be replaced with real data from backend
const mockFeed = [
  {
    id: '1',
    username: 'Sarah Chen',
    groupInfo: 'Sydney Squad • 4 members',
    memberCount: 4,
    streakCount: 15,
    timeAgo: '2 hours ago',
    action: 'Completed their Wednesday Waffle!',
    likes: 12,
    comments: 3
  },
  {
    id: '2',
    username: 'Mike Thompson',
    groupInfo: 'College Crew',
    memberCount: 6,
    streakCount: 32,
    timeAgo: '4 hours ago',
    action: 'Added Alex Rivera as this week\'s guest waffler!',
    likes: 8,
    comments: 2
  }
];

export const WafflersScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const isFocused = useIsFocused();
  const [hasContacts, setHasContacts] = useState(false);

  useEffect(() => {
    if (isFocused) {
      // Mock check for synced contacts - replace with real implementation
      const checkSyncedContacts = async () => {
        setHasContacts(true);
      };
      checkSyncedContacts();
    }
  }, [isFocused]);

  if (!hasContacts) {
    return (
      <StyledView className="flex-1 bg-white">
        <StyledView className="pt-14 pb-4 px-4 border-b border-gray-200">
          <StyledText className="text-2xl font-bold">Wafflers</StyledText>
        </StyledView>

        <Card className="m-4">
          <CardContent>
            <StyledText className="text-lg font-semibold mb-2">Find friends on Wafflz</StyledText>
            <StyledText className="text-gray-600 mb-4">Connect with friends to see their weekly Waffles!</StyledText>
            <StyledTouchableOpacity 
              className="bg-blue-500 rounded-lg py-2 px-4 self-start"
              onPress={() => navigation.navigate('FindFriends')}
            >
              <StyledText className="text-white font-semibold">Find Friends</StyledText>
            </StyledTouchableOpacity>
          </CardContent>
        </Card>

        <StyledView className="flex-1 justify-center items-center px-4">
          <StyledText className="text-gray-500 text-lg text-center">
            Add friends to see their Waffling activity
          </StyledText>
        </StyledView>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-gray-100">
      <StyledView className="bg-white pt-14 pb-4 px-4 border-b border-gray-200">
        <StyledText className="text-2xl font-bold">Wafflers</StyledText>
      </StyledView>

      <StyledScrollView className="flex-1">
        {mockFeed.map((item) => (
          <FeedItem
            key={item.id}
            username={item.username}
            groupInfo={item.groupInfo}
            memberCount={item.memberCount}
            streakCount={item.streakCount}
            timeAgo={item.timeAgo}
            action={item.action}
            likes={item.likes}
            comments={item.comments}
          />
        ))}
      </StyledScrollView>
    </StyledView>
  );
};
