/**
 * @format
 * @flow strict-local
 */
import React, { useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PackageList from './packageList';
import { processPackageSelection } from '../../store/actions/packageSelecton';
import FullscreenLoader from '../../components/miscellaneous/fullscreenLoader';
import { Navigation } from 'react-native-navigation';
import { navComponents } from '../../navigation';

const PackageSelection = () => {
  const dispatch = useDispatch();
  const [selectionInProgress, setSelectionInProgress] = useState(false);

  const { byIndex: userSubscriptionsPackageActive } = useSelector(
    (state) => state.subscription.userSubscriptionsPackageActive,
  );

  const handlePackageSelection = (packageItem) => {
    setSelectionInProgress(true);
    dispatch(processPackageSelection(packageItem.package_id)).then(() => {
      Navigation.setRoot({ root: navComponents.home });
    });
  };

  const packages = useMemo(() => {
    const packagesById = {};
    userSubscriptionsPackageActive.forEach((element) => {
      if (!packagesById[element.package_id]) {
        packagesById[element.package_id] = {
          package_id: element.package_id,
          package_title: element.package_title,
          package_description: element.package_description,
        };
      }
    });
    return Object.values(packagesById);
  }, [userSubscriptionsPackageActive]);

  return (
    <>
      {selectionInProgress ? (
        <FullscreenLoader />
      ) : (
        <PackageList
          handlePackageSelection={handlePackageSelection}
          packages={packages}
        />
      )}
    </>
  );
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
