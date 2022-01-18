import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function loginRequest(email: string, password: string) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password);
}
