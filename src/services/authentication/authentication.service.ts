import * as firebase from 'firebase';

export default function loginRequest(email: string, password: string) {
  return firebase.auth().signInWithEmailAndPassword(email, password);
}
