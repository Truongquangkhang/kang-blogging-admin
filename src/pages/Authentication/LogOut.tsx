import { Navigate } from 'react-router-dom';
import { logOut } from '../../redux/reducers/auth';
import { removeUser } from '../../redux/reducers/user';
import { useAppDispatch } from '../../hooks/useAppSelectorDitpatch';

const LogOut = () => {
  const dispatch = useAppDispatch();
  dispatch(logOut());
  dispatch(removeUser());
  return <Navigate to="/" />;
};

export default LogOut;
