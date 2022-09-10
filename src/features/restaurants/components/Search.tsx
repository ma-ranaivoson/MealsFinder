import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { Searchbar } from 'react-native-paper';
import { LocationContext } from '../../../services/location/location.context';

const SearchContainer = styled.View`
  justify-content: center;
`;

function Search({
  isFavoritesToggled,
  onFavoritesToggle,
}: {
  isFavoritesToggled: boolean;
  onFavoritesToggle: () => void;
}) {
  const { keyword, search } = useContext(LocationContext);
  const [searchKeyword, setSearchKeyword] = useState(keyword);

  useEffect(() => {
    setSearchKeyword(keyword);
    search(keyword);
  }, [keyword]);

  return (
    <SearchContainer>
      <Searchbar
        placeholder="Search for a location"
        value={searchKeyword}
        onIconPress={onFavoritesToggle}
        onSubmitEditing={() => {
          search(searchKeyword);
        }}
        onChangeText={(text) => setSearchKeyword(text)}
        icon={isFavoritesToggled ? 'heart' : 'heart-outline'}
      />
    </SearchContainer>
  );
}

export default Search;
