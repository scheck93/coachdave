import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { Icon } from '../components/Icon';

type Props = NativeStackScreenProps<RootStackParamList, 'Camera'>;

export default function CameraScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.camera}>
        <View style={styles.mockCamera}>
          {/* Camera mockup content */}
          <View style={styles.mockCameraContent}>
            <Text style={styles.mockText}>Camera Preview</Text>
            <Text style={styles.mockSubText}>Camera functionality is currently unavailable</Text>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => navigation.goBack()}
            >
              <Icon name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.recordButton}
              onPress={() => {}}
            >
              <View style={styles.recordIndicator} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
  },
  mockCamera: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  mockCameraContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mockText: {
    color: '#ffffff',
    fontSize: 24,
    marginBottom: 10,
  },
  mockSubText: {
    color: '#888888',
    fontSize: 16,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  recordButton: {
    alignSelf: 'center',
    marginBottom: 30,
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordIndicator: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#FF3B30',
  },
});
