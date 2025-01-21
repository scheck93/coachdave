import { Platform, Alert, Linking } from 'react-native';
import * as ExpoContacts from 'expo-contacts';

interface FormattedContact {
  id: string;
  name: string;
  phoneNumbers: string[];
  emails: string[];
}

interface ContactsResponse {
  success: boolean;
  contacts?: FormattedContact[];
  error?: string;
}

const checkIOSPermission = async (): Promise<boolean> => {
  try {
    const { status } = await ExpoContacts.requestPermissionsAsync();
    
    if (status === 'granted') {
      return true;
    }
    
    if (status === 'denied') {
      Alert.alert(
        'Contacts Permission Required',
        'Please enable contacts access in your device settings to connect with friends.',
        [
          { text: 'Not Now', style: 'cancel' },
          { 
            text: 'Open Settings',
            onPress: () => Linking.openSettings()
          }
        ]
      );
    }
    
    return false;
  } catch (error) {
    console.error('Error checking iOS contacts permission:', error);
    return false;
  }
};

const checkAndroidPermission = async (): Promise<boolean> => {
  try {
    const { status } = await ExpoContacts.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error checking Android contacts permission:', error);
    return false;
  }
};

export const requestContactsPermission = async (): Promise<boolean> => {
  if (Platform.OS === 'ios') {
    return checkIOSPermission();
  } else {
    return checkAndroidPermission();
  }
};

export const syncContacts = async (): Promise<ContactsResponse> => {
  try {
    const hasPermission = await requestContactsPermission();
    
    if (!hasPermission) {
      return {
        success: false,
        error: 'Contacts permission not granted'
      };
    }

    const { data } = await ExpoContacts.getContactsAsync({
      fields: [
        ExpoContacts.Fields.ID,
        ExpoContacts.Fields.Name,
        ExpoContacts.Fields.PhoneNumbers,
        ExpoContacts.Fields.Emails
      ]
    });

    const formattedContacts: FormattedContact[] = data.map((contact: ExpoContacts.Contact) => ({
      id: contact.id,
      name: contact.name || '',
      phoneNumbers: contact.phoneNumbers?.map((phone: ExpoContacts.PhoneNumber) => phone.number) || [],
      emails: contact.emails?.map((email: ExpoContacts.Email) => email.email) || []
    }));

    return {
      success: true,
      contacts: formattedContacts
    };
  } catch (error) {
    console.error('Error syncing contacts:', error);
    return {
      success: false,
      error: 'Failed to sync contacts'
    };
  }
};
