import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Camera } from 'expo-camera';
import styled from 'styled-components/native';
import {
  Text, TouchableOpacity, View, Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';

const ProfileCamera = styled(Camera)`
  width: 100%;
  height: 100%;
  background-color: #fff;
`;

const windowWidth = Dimensions.get('window').width;

const CameraIconContainer = styled.View`
  align-items: center;
  justify-content: flex-end;
  flex: 1;
`;
const CameraIcon = styled(Ionicons)`
  color: tomato;
`;

export default function CameraScreen({ navigation }: { navigation: any }) {
  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const cameraRef = React.useRef<Camera | null>();
  const { user } = React.useContext(AuthenticationContext);

  const ratio = windowWidth < 400 ? '4:3' : '16:9';

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current?.takePictureAsync();
      if (photo) {
        await AsyncStorage.setItem(`${user?.uid}-photo`, photo.uri);
        navigation.goBack();
      }
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ProfileCamera
      // eslint-disable-next-line no-return-assign
      ref={(camera) => (cameraRef.current = camera)}
      type={Camera.Constants.Type.front}
      ratio={ratio}
    >
      <CameraIconContainer>
        <TouchableOpacity onPress={() => snap()}>
          <CameraIcon name="camera" size={50} />
        </TouchableOpacity>
      </CameraIconContainer>
    </ProfileCamera>
  );
}
