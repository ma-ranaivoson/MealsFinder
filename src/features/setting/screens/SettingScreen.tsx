/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import styled from 'styled-components/native';
import { List, Avatar } from 'react-native-paper';
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

  return (
    <SafeArea>
      <AvatarContainer>
        <Avatar.Icon
          size={80}
          icon="human"
          style={{ backgroundColor: '#2182BD' }}
        />
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
