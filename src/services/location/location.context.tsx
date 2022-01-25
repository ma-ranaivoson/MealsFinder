import React, { createContext, useState, useEffect } from 'react';
import { locationTransform, LocationType } from './location.service';
import { host } from '../../utils/env';

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
  location: Location | null | any;
  // eslint-disable-next-line no-unused-vars
  search: (a: string) => void;
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
  const [keyword, setKeyword] = useState<string>('Itaosy');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = async (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);

    if (!searchKeyword.length) return;

    fetch(`${host}/geocode?city=${searchKeyword.toLowerCase()}&mock=false`)
      .then((response) => response.json())
      .then((data) => {
        const loc = data as LocationType;
        const locTransformed = locationTransform(loc);
        setLocation(locTransformed);
        setIsLoading(false);
        return locTransformed;
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    onSearch(keyword);
  }, []);

  const value = React.useMemo(
    // eslint-disable-next-line object-curly-newline
    () => ({ isLoading, error, location, search: onSearch, keyword }),
    [isLoading, error, location, keyword, onSearch],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
