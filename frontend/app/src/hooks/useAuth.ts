import { useContext } from "react";
import { apiClient } from "../lib/apiClient";
import { useCookies } from "react-cookie";
import { SignUpParams, SignInParams } from "../types/User";
import { AuthContext } from '../App';

export const useAuth = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['_access_token', '_client', '_uid']);
  const { setLoading, setIsSignedIn, setIsSignedInAdmin, setCurrentUser } = useContext(AuthContext);

  const setCookies = (res: any) => {
    setCookie('_access_token', res.headers['access-token'], { path: '/' });
    setCookie('_client', res.headers['client'], { path: '/' });
    setCookie('_uid', res.headers['uid'], { path: '/' });
  }

  const removeCookies = () => {
    removeCookie('_access_token');
    removeCookie('_client');
    removeCookie('_uid');
  }

  const signUp = async (params: SignUpParams) => {
    return apiClient.post('/auth', params)
    .then((res) => {
      setCookies(res);
      return res;
    })
    .catch(e => {
      console.error('signUp failed:', e);
      throw e;
    });
  };

  const signIn = async (params: SignInParams) => {
    return apiClient.post('/auth/sign_in', params)
    .then((res) => {
      setCookies(res);
      return res;
    })
    .catch(e => {
      console.error('signIn failed:', e);
      throw e;
    });
  };

  const signOut = async () => {
    return apiClient.delete('/auth/sign_out', {
      headers: {
        "access-token": cookies._access_token,
        "client": cookies._client,
        "uid": cookies._uid,
      }
    })
    .then((res) => {
      removeCookies();
      return res;
    })
    .catch(e => {
      console.error('signOut failed:', e);
      throw e;
    });
  };

  const handleSignOut = async () => {
    return signOut()
    .then(() => {
      setIsSignedIn(false);
      setIsSignedInAdmin(false);
      setCurrentUser(undefined);
    })
    .catch(e => {
      console.error('handleSignOut failed:', e);
    });
  }

  const fetchCurrentUser = async () => {
    return apiClient.get('/auth/sessions', {
      headers: {
        "access-token": cookies._access_token,
        "client": cookies._client,
        "uid": cookies._uid,
      }
    })
    .then(res => {
      return res;
    })
    .catch(e => {
      console.error('fetchCurrentUser failed:', e);
      throw e;
    });
  };

  const handleFetchCurrentUser = async () => {
    return fetchCurrentUser()
    .then((res) => {
      setIsSignedIn(res.data.is_login);
      setIsSignedInAdmin(res.data.user?.is_admin);
      setCurrentUser(res.data.user);
    })
    .catch(e => {
      console.error('handleFetchCurrentUser failed:', e);
    })
    .finally(() => {
      setLoading(false);
    });
  }
  
  return { signUp, signIn, signOut, handleSignOut, fetchCurrentUser, handleFetchCurrentUser };
};