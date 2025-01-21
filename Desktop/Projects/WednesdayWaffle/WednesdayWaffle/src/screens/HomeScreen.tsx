import React, { useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { styled } from 'nativewind';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { MainTabParamList, RootStackParamList } from '../navigation/types';
import { Card } from '../components/Card';
import { GroupSelector } from '../components/GroupSelector';
import { Icon } from '../components/Icon';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

type Props = CompositeScreenProps<
  BottomTabScreenProps<MainTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

// Mock data
const groups = [
  {
    name: "College Friends",
    members: [
      { name: "Sarah", hasSubmitted: true },
      { name: "Mike", hasSubmitted: true },
      { name: "Alex", hasSubmitted: false },
      { name: "You", hasSubmitted: false },
    ],
    deadline: "2 days left"
  },
  {
    name: "Family",
    members: [
      { name: "Mom", hasSubmitted: true },
      { name: "Dad", hasSubmitted: false },
      { name: "Sister", hasSubmitted: true },
      { name: "You", hasSubmitted: false },
    ],
    deadline: "3 days left"
  }
];

export const HomeScreen = ({ navigation }: Props) => {
  const [selectedGroup, setSelectedGroup] = useState(0);
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = (screenWidth - 48) / 2; // 48 = padding (16 * 2) + gap (16)

  const getWaffleImage = (name: string) => {
    switch (name) {
      case 'Sarah':
        return require('../../assets/sarah-waffle.png');
      case 'Mike':
        return require('../../assets/mike-waffle.png');
      default:
        return null;
    }
  };

  return (
    <ScrollView className="flex-1 bg-gray-50">
      {/* Header */}
      <StyledView className="px-4 pt-12 pb-2">
        <StyledView className="flex-row justify-between items-center">
          <StyledText className="text-2xl font-semibold text-gray-900">
            Ready to Waffle, David?
          </StyledText>
          <StyledView className="flex-row items-center bg-yellow-400 px-3 py-1 rounded-full">
            <Icon name="flame-outline" size={16} color="#000000" />
            <StyledText className="ml-1 font-medium">12 day streak!</StyledText>
          </StyledView>
        </StyledView>
      </StyledView>

      {/* Group Selector */}
      <GroupSelector 
        groups={groups}
        selectedIndex={selectedGroup}
        onSelect={setSelectedGroup}
      />

      {/* Group Info */}
      <StyledView className="px-4 py-2 flex-row justify-between items-center">
        <StyledText className="text-sm text-gray-600">
          {groups[selectedGroup].deadline}
        </StyledText>
        <StyledTouchableOpacity 
          className="flex-row items-center gap-1"
          onPress={() => {/* Handle group chat */}}
        >
          <Icon name="chatbubble-outline" size={16} color="#4B5563" />
          <StyledText className="text-sm text-gray-600">
            Group Chat
          </StyledText>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Video Grid */}
      <StyledView className="p-4 flex-row flex-wrap gap-4">
        {groups[selectedGroup].members.map((member, index) => (
          <Card key={index} className="overflow-hidden" style={{ width: cardWidth }}>
            {member.hasSubmitted ? (
              <StyledView className="aspect-[3/4] bg-gray-100">
                {getWaffleImage(member.name) && (
                  <Image 
                    source={getWaffleImage(member.name)}
                    className="w-full h-full"
                    resizeMode="cover"
                  />
                )}
                <StyledView className="absolute bottom-0 left-0 right-0 p-2 bg-black/50">
                  <StyledText className="text-white text-sm">{member.name}</StyledText>
                </StyledView>
              </StyledView>
            ) : (
              member.name === "You" ? (
                <StyledTouchableOpacity 
                  className="aspect-[3/4] bg-gray-100 items-center justify-center"
                  onPress={() => navigation.navigate('Camera')}
                >
                  <StyledView className="w-12 h-12 rounded-full bg-yellow-400 items-center justify-center">
                    <Icon name="add" size={24} color="#000000" />
                  </StyledView>
                  <StyledText className="mt-2 text-sm text-gray-600">
                    Add your waffle
                  </StyledText>
                </StyledTouchableOpacity>
              ) : member.name === "Alex" ? (
                <StyledView className="aspect-[3/4] bg-gray-100 items-center justify-center">
                  <Image 
                    source={require('../../assets/alex-waffle.png')}
                    className="w-12 h-12 rounded-full"
                  />
                  <StyledText className="mt-2 text-sm text-gray-400">
                    {member.name}
                  </StyledText>
                  <StyledTouchableOpacity>
                    <StyledText className="mt-1 text-xs text-yellow-600">
                      Send reminder
                    </StyledText>
                  </StyledTouchableOpacity>
                </StyledView>
              ) : (
                <StyledView className="aspect-[3/4] bg-gray-100 items-center justify-center">
                  <StyledView className="w-12 h-12 rounded-full bg-gray-200 items-center justify-center">
                    <Icon name="time-outline" size={24} color="#9CA3AF" />
                  </StyledView>
                  <StyledText className="mt-2 text-sm text-gray-400">
                    {member.name}
                  </StyledText>
                  <StyledTouchableOpacity>
                    <StyledText className="mt-1 text-xs text-yellow-600">
                      Send reminder
                    </StyledText>
                  </StyledTouchableOpacity>
                </StyledView>
              )
            )}
          </Card>
        ))}
      </StyledView>
    </ScrollView>
  );
};
