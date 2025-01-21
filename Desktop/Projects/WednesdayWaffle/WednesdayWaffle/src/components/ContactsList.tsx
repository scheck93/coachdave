import React from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface Contact {
  id: string;
  name: string;
  phoneNumbers: string[];
  emails: string[];
  isOnWaffles?: boolean;
}

interface ContactsListProps {
  contacts: Contact[];
  onAdd: (contact: Contact) => void;
  onInvite: (contact: Contact) => void;
}

export const ContactsList = ({ contacts, onAdd, onInvite }: ContactsListProps) => {
  const renderContact = ({ item: contact }: { item: Contact }) => (
    <StyledView className="flex-row items-center justify-between p-4 border-b border-gray-200">
      <StyledView className="flex-1">
        <StyledText className="text-base font-medium text-gray-900">
          {contact.name}
        </StyledText>
        {contact.phoneNumbers[0] && (
          <StyledText className="text-sm text-gray-500">
            {contact.phoneNumbers[0]}
          </StyledText>
        )}
      </StyledView>
      
      {contact.isOnWaffles ? (
        <StyledTouchableOpacity
          className="bg-blue-500 px-4 py-2 rounded-lg"
          onPress={() => onAdd(contact)}
        >
          <StyledText className="text-white font-medium">
            Add
          </StyledText>
        </StyledTouchableOpacity>
      ) : (
        <StyledTouchableOpacity
          className="bg-gray-500 px-4 py-2 rounded-lg"
          onPress={() => onInvite(contact)}
        >
          <StyledText className="text-white font-medium">
            Invite
          </StyledText>
        </StyledTouchableOpacity>
      )}
    </StyledView>
  );

  return (
    <FlatList
      data={contacts}
      renderItem={renderContact}
      keyExtractor={(item) => item.id}
      className="bg-white"
      ListEmptyComponent={
        <StyledView className="p-4">
          <StyledText className="text-center text-gray-500">
            No contacts found
          </StyledText>
        </StyledView>
      }
    />
  );
};
