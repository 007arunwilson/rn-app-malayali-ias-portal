import { Dimensions } from 'react-native';
import { useState } from 'react';

/**
 * Returns true of the screen is in landscape mode
 */
const isPortraitCheck = () => {
  const dim = Dimensions.get('window');
  return !!(dim.height > dim.width);
};

/**
 * React hook for detecting orientation.
 *
 * @return {[ isPortrait, isLandscape ]} [ isPortrait, isLandscape ]
 *
 * @example
 *
 *     const [ isPortrait, isLandscape ] = useOrientation();
 */
export const useOrientation = () => {
  const isPortraitOnload = isPortraitCheck();
  const [isPortrait, setIsPortrait] = useState(isPortraitOnload);
  Dimensions.addEventListener('change', () => {
    setIsPortrait(isPortraitCheck());
  });

  return [isPortrait, !isPortrait];
};
