import { useContext, useState } from 'react';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { login } from '../util/auth';
import { Alert } from 'react-native';
import { AuthContext } from '../store/auth-context';

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticationg] = useState(false);
  
  const authCtx = useContext(AuthContext);

  async function loginHandler({email, password}) {
    setIsAuthenticationg(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);  
    } catch (error) {
      Alert.alert("Authentication failed!",
        "Could not log you in! Check credentials or try again later."
      )
      setIsAuthenticationg(false);
    }
      
  }
  
  if (isAuthenticating) {
    return <LoadingOverlay message='Logging in...' />
  }

  return <AuthContent isLogin onAuthenticate={loginHandler}/>;
}

export default LoginScreen;
