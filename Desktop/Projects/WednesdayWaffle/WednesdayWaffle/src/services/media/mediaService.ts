import * as MediaLibrary from 'expo-media-library';

export const requestMediaLibraryPermission = async () => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  return status === 'granted';
};

export const saveToLibrary = async (uri: string) => {
  try {
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync('WednesdayWaffle', asset, false);
    return true;
  } catch (error) {
    console.error('Error saving to library:', error);
    return false;
  }
};
