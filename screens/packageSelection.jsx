/**
 * @format
 * @flow strict-local
 */
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import FullscreenLoader from '../components/miscellaneous/fullscreenLoader';

import { updateInprogress } from '../store/actions/packageSelecton';

const PackageSelection = () => {
  const dispatch = useDispatch();

  const inProgress = useSelector((state) => state.packageSelection.inProgress);
  const packages = useSelector((state) => state.packageSelection.packages);

  React.useEffect(() => {
    dispatch(updateInprogress(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{inProgress && !packages ? <FullscreenLoader /> : null}</>;
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
