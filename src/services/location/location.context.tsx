import React, { createContext, useState, useEffect } from 'react';
import { locationRequest, locationTransform } from './location.service';

interface Props {
  children: React.ReactNode;
}

interface Location {
  lat: string;
  lng: string;
}

interface LocationCtx {
  isLoading: boolean;
  error: string | null;
  location: Location | null;
  // eslint-disable-next-line no-unused-vars
  search?: (a: string) => void;
  keyword: string;
}

export const LocationContext = createContext<LocationCtx>({
  isLoading: false,
  error: null,
  location: null,
  search: () => null,
  keyword: '',
});

export function LocationContextProvider({ children }: Props) {
  const [location, setLocation] = useState<Location | null>(null);
  const [keyword, setKeyword] = useState<string>('san francisco');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);
    locationRequest(keyword)
      // @ts-ignore: Unreachable code error
      .then(locationTransform)
      .then((res) => {
        setLocation(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onSearch(keyword);
  }, []);

  return (
    <LocationContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        isLoading,
        error,
        location,
        search: onSearch,
        keyword,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}
