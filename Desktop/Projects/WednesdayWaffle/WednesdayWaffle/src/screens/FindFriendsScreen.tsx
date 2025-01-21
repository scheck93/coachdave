import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { syncContacts } from '../services/contacts/contactsService';
import { ContactsList } from '../components/ContactsList';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

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

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export const FindFriendsScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [isSyncing, setIsSyncing] = useState(false);
  const [contacts, setContacts] = useState<Contact[]>([]);

  const handleContactsSync = async () => {
    if (isSyncing) return;
    
    setIsSyncing(true);
    try {
      console.log('Starting contacts sync...');
      const result = await syncContacts();
      console.log('Sync result:', result);
      
      if (result.success && result.contacts) {
        // Temporarily marking some contacts as Waffles users for demo
        // In a real app, this would come from your backend
        const contactsWithWafflesStatus = result.contacts.map((contact, index) => ({
          ...contact,
          isOnWaffles: index % 3 === 0 // Every third contact is a Waffles user
        }));
        
        setContacts(contactsWithWafflesStatus);
        console.log(`Successfully synced ${result.contacts.length} contacts`);
        Alert.alert(
          'Success',
          'Your contacts have been synced successfully!'
        );
      } else {
        console.log('Sync failed:', result.error);
        Alert.alert(
          'Error',
          result.error || 'Failed to sync contacts'
        );
      }
    } catch (error) {
      console.error('Error in handleContactsSync:', error);
      Alert.alert(
        'Error',
        'Something went wrong while syncing your contacts. Please try again.'
      );
    } finally {
      setIsSyncing(false);
    }
  };

  const handleAddContact = (contact: Contact) => {
    // Here you would typically make an API call to add the contact as a friend
    Alert.alert('Success', `Added ${contact.name} as a friend!`);
  };

  const handleInviteContact = (contact: Contact) => {
    // Here you would typically trigger your app's invite flow
    Alert.alert('Invite Sent', `Invitation sent to ${contact.name}`);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header with back button */}
      <StyledView className="flex-row items-center px-4 pt-12 pb-4">
        <StyledTouchableOpacity 
          onPress={() => navigation.goBack()}
          className="mr-4"
        >
          <StyledText className="text-blue-500">Back</StyledText>
        </StyledTouchableOpacity>
        <StyledText className="text-2xl font-semibold text-gray-900">
          Find Friends
        </StyledText>
      </StyledView>

      {/* Contacts Section */}
      <StyledView className="px-4 mt-4">
        <StyledText className="text-lg font-semibold text-gray-900 mb-2">
          From Your Contacts
        </StyledText>
        <StyledText className="text-gray-600 mb-4">
          Find friends who are already on Wafflers or invite others to join.
        </StyledText>
        <StyledTouchableOpacity
          className={`rounded-lg py-4 ${isSyncing ? 'bg-blue-400' : 'bg-blue-500'}`}
          onPress={handleContactsSync}
          disabled={isSyncing}
        >
          <StyledView className="flex-row justify-center items-center">
            {isSyncing && (
              <ActivityIndicator color="white" style={{ marginRight: 8 }} />
            )}
            <StyledText className="text-white font-semibold text-center">
              {isSyncing ? 'Syncing Contacts...' : 'Sync Contacts'}
            </StyledText>
          </StyledView>
        </StyledTouchableOpacity>
      </StyledView>

      {/* Contacts List */}
      {contacts.length > 0 && (
        <StyledView className="flex-1 mt-6">
          <ContactsList
            contacts={contacts}
            onAdd={handleAddContact}
            onInvite={handleInviteContact}
          />
        </StyledView>
      )}
    </View>
  );
};
