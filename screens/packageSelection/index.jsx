/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { useSelector } from 'react-redux';
import PackageList from './packageList';

const PackageSelection = () => {
  const packages = useSelector(
    (state) => state.user.activeSubscriptions.byIndex,
  );

  return <PackageList packages={packages} />;
};

// RNN options
PackageSelection.options = {
  topBar: {
    rightButtons: [
      {
        id: 'profile',
        component: {
          name: 'topbar.menuIcon',
          aligment: 'center',
        },
      },
    ],
    title: {
      text: 'Select a package',
    },
  },
};

export default PackageSelection;
