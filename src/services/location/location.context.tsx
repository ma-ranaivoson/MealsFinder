import React, { createContext, useState, useEffect } from 'react';
import {
  locationRequest,
  locationTransform,
  LocationType,
} from './location.service';

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
  const [keyword, setKeyword] = useState<string>('San Francisco');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSearch = (searchKeyword: string) => {
    setIsLoading(true);
    setKeyword(searchKeyword);

    if (!searchKeyword.length) return;

    locationRequest(searchKeyword.toLowerCase())
      .then((res) => {
        const loc = res as LocationType;
        const locTransformed = locationTransform(loc);
        return locTransformed;
      })
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

  const value = React.useMemo(
    // eslint-disable-next-line object-curly-newline
    () => ({ isLoading, error, location, search: onSearch, keyword }),
    [isLoading, error, location, keyword],
  );

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}
