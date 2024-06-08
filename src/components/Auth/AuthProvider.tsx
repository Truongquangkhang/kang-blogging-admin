import React, { createContext, useContext, ReactNode } from 'react';
import { AxiosResponse } from 'axios';
import axiosClient from '../../apis/kang-blogging/axios_client';
import ApiIam from '../../apis/kang-blogging/iam';
import { setAuth } from '../../redux/reducers/auth';
import { setNotify } from '../../redux/reducers/notify';
import {
  useAppDispatch,
  useAppSelector,
} from '../../hooks/useAppSelectorDitpatch';

// Define AuthContextType interface
interface AuthContextType {
  // user: IUSerMetadata | null
  // login: (username: string, password: string) => Promise<void>;
  // logout: () => Promise<void>;
}

// Create AuthContext with undefined as initial value
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define AuthProviderProps interface
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const authStates = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const contextValue: AuthContextType = {
    // user,
  };
  axiosClient.interceptors.request.use(
    function (config) {
      if (authStates.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${authStates.accessToken}`;
      } else {
        console.log('Hello');
        // window.open('/auth/login');
      }
      return config;
    },
    function (error) {
      return Promise.reject(error);
    },
  );

  axiosClient.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (authStates.refreshToken) {
          ApiIam.refreshToken(authStates.refreshToken).then((rs) => {
            if (rs) {
              const newAccessToken = rs.data.data.access_token;
              dispatch(
                setAuth({
                  isLogin: true,
                  accessToken: newAccessToken,
                  refreshToken: authStates.refreshToken,
                }),
              );
              originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
              return axiosClient(originalRequest);
            }
          });
        } else {
          dispatch(
            setNotify({
              title: 'Please login !!!',
              description: '',
              mustShow: true,
            }),
          );
        }
      }
      return Promise.reject(error);
    },
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
