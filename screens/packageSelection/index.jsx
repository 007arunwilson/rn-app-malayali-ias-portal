/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FullscreenLoader from '../../components/miscellaneous/fullscreenLoader';
import FullscreenEmptyList from '../../components/miscellaneous/fullscreenEmptyList';
import PackageList from './packageList';

import { loadPackages } from '../../store/actions/packageSelecton';

const PackageSelection = () => {
  const dispatch = useDispatch();

  const inProgress = useSelector((state) => state.packageSelection.isLoading);
  const packages = useSelector((state) => state.packageSelection.packages);

  React.useEffect(() => {
    dispatch(loadPackages());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {inProgress && !packages ? <FullscreenLoader /> : null}
      {!inProgress && packages && !packages.length ? (
        <FullscreenEmptyList />
      ) : null}
      {!inProgress && packages && packages.length ? (
        <PackageList packages={packages} />
      ) : null}
    </>
  );
};

// RNN options
PackageSelection.options = {
  topBar: {
    title: {
      text: 'Package Selection',
    },
  },
};

export default PackageSelection;
