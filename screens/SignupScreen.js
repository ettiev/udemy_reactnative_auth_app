import { useContext, useState } from 'react';
import { Alert } from 'react-native';

import AuthContent from '../components/Auth/AuthContent';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import { createUser } from '../util/auth';
import { AuthContext } from '../store/auth-context';


function SignupScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  const authCtx = useContext(AuthContext);

  async function signupHandler({email, password}) {
    setIsAuthenticating(true);
    try{
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Sign Up Failed!", "Please check your input or try again later!")
      setIsAuthenticating(false);
    }
      
  }
  
  if (isAuthenticating) {
    return <LoadingOverlay message='Creating user...' />
  }

  return <AuthContent onAuthenticate={signupHandler}/>;
}

export default SignupScreen;
