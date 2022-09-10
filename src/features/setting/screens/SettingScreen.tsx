/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styled from 'styled-components/native';
import { List, Avatar } from 'react-native-paper';
// eslint-disable-next-line import/no-extraneous-dependencies
import { User } from '@firebase/auth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useFocusEffect } from '@react-navigation/core';
import { AuthenticationContext } from '../../../services/authentication/authentication.context';
import SafeArea from '../../../components/utility/SafeArea';

const SettingItem = styled(List.Item)`
  padding: 16px;
`;

const AvatarContainer = styled.View`
  align-items: center;
`;

const UserText = styled.Text`
  color: ${(props) => props.theme.Color.text.primary};
  font-family: ${(props) => props.theme.Font.fonts.heading}
  margin-top: 10px;
`;

export default function SettingScreen({ navigation }: { navigation: any }) {
  const { onSignOut, user } = React.useContext(AuthenticationContext);
  const [photo, setPhoto] = React.useState<string | null>(null);

  const getProfileAsync = async (currentUser: User | null) => {
    const photoUri = await AsyncStorage.getItem(`${currentUser?.uid}-photo`);
    setPhoto(photoUri);
  };

  useFocusEffect(() => {
    getProfileAsync(user);
  });

  return (
    <SafeArea>
      <AvatarContainer>
        <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
          {!photo && (
            <Avatar.Icon
              size={80}
              icon="human"
              style={{ backgroundColor: '#2182BD' }}
            />
          )}
          {photo && (
            <Avatar.Image
              size={80}
              source={{ uri: photo }}
              style={{ backgroundColor: '#2182BD' }}
            />
          )}
        </TouchableOpacity>
        <UserText>{user?.email}</UserText>
      </AvatarContainer>
      <List.Section>
        <SettingItem
          title="Favorites"
          description="View your favorites"
          left={(props) => <List.Icon {...props} color="black" icon="heart" />}
          onPress={() => navigation.navigate('Favorites')}
        />
        <SettingItem
          title="Logout"
          left={(props) => <List.Icon {...props} color="black" icon="door" />}
          onPress={onSignOut}
        />
      </List.Section>
    </SafeArea>
  );
}
