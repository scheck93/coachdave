import { Camera, CameraType } from 'expo-camera';

export const requestCameraPermission = async () => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  return status === 'granted';
};

export const requestAudioPermission = async () => {
  const { status } = await Camera.requestMicrophonePermissionsAsync();
  return status === 'granted';
};
