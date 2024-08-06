import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkAuthState } from "../store/features/authSlice";
import { fetchFoldersAsync } from "../store/features/folderSlice";

const withDataLoading = WrappedComponent => {
  const DataLoadingComponent = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    useEffect(() => {
      dispatch(checkAuthState());
    }, [dispatch]);

    useEffect(() => {
      if (user && user.uid) {
        dispatch(fetchFoldersAsync());
      }
    }, [dispatch, user]);

    return <WrappedComponent />;
  };

  return DataLoadingComponent;
};

export default withDataLoading;
