import { useState } from 'react';
import SidePortal from './SidePortal';

const useSidePortal = () => {
  const [isSidePortalOpen, toggleSidePortal] = useState(false);

  return [
    isSidePortalOpen,
    toggleSidePortal,
    ({ children }) => (
      <SidePortal isOpen={isSidePortalOpen} closePortalCallback={() => toggleSidePortal(false)}>
        {children}
      </SidePortal>
    ),
  ];
};

export default useSidePortal;
