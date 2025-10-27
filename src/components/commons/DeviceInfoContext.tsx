import {PropsWithChildren, createContext, useEffect, useState} from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isTouchDevice: boolean;
}

const defaultDeviceInfo = () => ({
  isMobile: true,
  isTablet: false,
  isDesktop: false,
  isTouchDevice: false
});

const DeviceInfoContext = createContext<DeviceInfo>(defaultDeviceInfo());
export default DeviceInfoContext;

/**
 * Wrap your application with this provider.
 * All child components can ```useContext(DeviceInfoContext)``` to get an always up-2-date {@link DeviceInfo} object
 */
export const DeviceInfoContextProvider = ({children}: PropsWithChildren) => {
  const [di, setDi] = useState<DeviceInfo>(defaultDeviceInfo());

  useEffect(() => {
    setDi(detectDevice());

    const handleResize = () => setDi(detectDevice());

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return <DeviceInfoContext.Provider value={di}>{children}</DeviceInfoContext.Provider>;
};

/**
 * Detects information about the device (mobile, tablet, desktop) based on user agent and screen size.
 */
function detectDevice(): DeviceInfo {
  const userAgent = navigator.userAgent.toLowerCase();
  const screenWidth = window.innerWidth;

  // User agent detection for mobile devices
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
  const tabletRegex = /ipad|tablet|android(?!.*mobile)/i;

  // Touch capability detection
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  // Screen size breakpoints
  const isMobileScreen = screenWidth < 768;
  const isTabletScreen = screenWidth >= 768 && screenWidth < 1024;

  // Combine user agent and screen size for better detection
  const isMobile = mobileRegex.test(userAgent) || (isTouchDevice && isMobileScreen);
  const isTablet = tabletRegex.test(userAgent) || (isTouchDevice && isTabletScreen);
  const isDesktop = !isMobile && !isTablet;

  return {
    isMobile,
    isTablet,
    isDesktop,
    isTouchDevice
  };
}
