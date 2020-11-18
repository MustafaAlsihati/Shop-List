import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

/* ################################### Firebase Configs ###################################### */

var firebaseConfig = {
  apiKey: 'AIzaSyAcTBE3HU_X9P5dfvxjw1m06FpzJu58S9s',
  authDomain: 'react-js-test-da73a.firebaseapp.com',
  databaseURL: 'https://react-js-test-da73a.firebaseio.com',
  projectId: 'react-js-test-da73a',
  storageBucket: 'react-js-test-da73a.appspot.com',
  messagingSenderId: '671160433029',
  appId: '1:671160433029:web:04ef036bf82455b23eecec',
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebaseApp.auth();
const storage = firebaseApp.storage();

/* ######################################## Auth ############################################ */

export const chechAuth = async (cb) => {
  return auth.onAuthStateChanged(cb);
};

export const signInWithEmailAndPassword = async (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(function (error) {
      throw Error(error.message);
    });
};

export const signUpWithEmailAndPassword = async (user) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(user.email, user.password)
    .then((result) => {
      const uid = result.user.uid;
      return db.collection('users').doc(uid).set({
        username: user.username,
        email: user.email,
        uid,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        image: null,
      });
    })
    .catch(function (error) {
      throw Error(error.message);
    });
};

export const signOut = async () => {
  return await auth.signOut();
};

/* ##################################### Firestore ######################################### */

export const getJoinedList = async (uid) => {
  const snapshot = await db
    .collection('lists')
    .where('userIds', 'array-contains', uid)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

export const getMyLists = async (uid) => {
  let lists = [];
  await db
    .collection('lists')
    .where('author', '==', uid)
    .get()
    .then((snapshot) => {
      snapshot.forEach((doc) => {
        lists.push(doc.data());
      });
    });

  return lists;
};

export const getListItems = async (list_id) => {
  const snapshot = await db
    .collection('lists')
    .doc(list_id)
    .collection('items')
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

export const getUserInfo = async (uid) => {
  const snapshot = await db.collection('users').doc(uid).get();
  const data = snapshot.data();

  return data;
};

export const getMyListsNumber = async (uid) => {
  let listsSize = 0;
  await db
    .collection('lists')
    .where('author', '==', uid)
    .get()
    .then((snapshot) => {
      listsSize = snapshot.size;
    });

  return Number(listsSize);
};

export const getMyItemsNumber = async (uid) => {
  let itemsSize = 0;
  await db
    .collectionGroup('items')
    .where('author.id', '==', uid)
    .get()
    .then((snapshot) => {
      itemsSize = snapshot.size;
    });

  return Number(itemsSize);
};
