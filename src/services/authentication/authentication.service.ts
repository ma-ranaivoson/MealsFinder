import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';

export function loginRequest(email: string, password: string) {
  const auth = getAuth();

  return signInWithEmailAndPassword(auth, email, password);
}

export function register(email: string, password: string) {
  const auth = getAuth();

  return createUserWithEmailAndPassword(auth, email, password);
}
