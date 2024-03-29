import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import { Item, List, User } from '../constants/types';
import { store } from '../redux/index';
import { SET_USER } from '../redux/reducers/User';

/* ################################### Firebase Configs ###################################### */

const is_link = (str: string) => {
  if (str.startsWith('https://firebasestorage.googleapis.com')) return true;
  return false;
};

/* ############################### Firebase Utils Functions ################################## */

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
export const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const storage = firebaseApp.storage();

export default firebase;

export const signInWithEmailAndPassword = async (email: string, password: string) => {
  try {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const signUpWithEmailAndPassword = async (user: Partial<User> & { password: string; confirmPassword: string }) => {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(user.email!, user.password);
    if (result) {
      const uid = result.user?.uid;
      const _user = {
        username: user.username,
        email: user.email,
        uid,
        created: firebase.firestore.FieldValue.serverTimestamp(),
        image: null,
        settings: {
          currency: {
            symbol: '$',
            name: 'US Dollar',
            symbol_native: '$',
            decimal_digits: 2,
            rounding: 0,
            code: 'USD',
            name_plural: 'US dollars',
          },
        },
      };

      await db.collection('users').doc(uid).set(_user);

      return _user;
    }
  } catch (error: any) {
    throw Error(error.message);
  }
};

export const signOut = async () => {
  await auth.signOut();
  setTimeout(() => {
    store.dispatch({
      type: SET_USER,
      user: null,
    });
  }, 500);
};

/* ##################################### Firestore ######################################### */

export const updateSettings = async (uid: string, obj: object, cb: (v?: any) => void, err: (v?: any) => void) => {
  return db
    .collection('users')
    .doc(uid)
    .update({ settings: obj })
    .then(() => {
      if (cb) cb();
    })
    .catch(error => {
      if (err) err(error);
    });
};

export const sendUserJoinedNotification = async (uid: string, author_id: string, content: any, cb: (v: any) => void, err: (v?: any) => void) => {
  const notificationRef = db.collection('users').doc(author_id).collection('notifications');
  const notification_id = notificationRef.doc().id;

  let pushToken: string | null = null;
  await db
    .collection('users')
    .doc(author_id)
    .get()
    .then(snap => {
      const _data = snap.data() as any;
      pushToken = _data.expo_push_token;
    });

  return notificationRef
    .doc(notification_id)
    .set({
      ...content,
      uid,
      notification_id,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      if (cb) cb(pushToken);
    })
    .catch(error => {
      if (err) err(error);
    });
};

export const getJoinedList = async (uid: string) => {
  const snapshot = await db.collection('lists').where('userIds', 'array-contains', uid).orderBy('created', 'desc').get();

  return snapshot.docs.map(doc => doc.data());
};

export const getMyLists = async (uid: string) => {
  const snapshot = await db.collection('lists').where('author', '==', uid).orderBy('created', 'desc').get();

  return snapshot.docs.map(doc => doc.data() as List);
};

export const getMyItems = async (uid: string) => {
  const snapshot = await db.collectionGroup('items').where('author.id', '==', uid).orderBy('created', 'desc').get();

  return snapshot.docs.map(doc => doc.data() as Item);
};

export const getListItems = async (list_id: string) => {
  const snapshot = await db.collection('lists').doc(list_id).collection('items').orderBy('created', 'desc').get();

  return snapshot.docs.map(doc => doc.data());
};

const uploadImage = async (image: any, name: string, id: string) => {
  const response = await fetch(image);
  const blob = await response.blob();
  const uploadTask = storage.ref(`images/${name.replace(/\s/g, '')}-${id}`).put(blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      snapshot => console.log('image uploading: ', snapshot),
      error => reject(error),
      async () => {
        const image_url = await storage
          .ref('images')
          .child(`${name.replace(/\s/g, '')}-${id}`)
          .getDownloadURL();

        resolve(image_url);
      }
    );
  });
};

export const addList = async (list: List, user: User, cb: () => void, err: (e: any) => void) => {
  const list_id = db.collection('lists').doc().id;
  const uploaded_image_url = list.image ? await uploadImage(list.image, list.name, list_id) : null;

  const new_list = JSON.parse(
    JSON.stringify({
      ...list,
      list_id,
      search_term: list.name.toLowerCase(),
      image: uploaded_image_url,
      author: user.uid,
      userIds: [user.uid],
      users: [
        {
          id: user.uid,
          name: user.username,
          status: 'member',
        },
      ],
    })
  );

  return db
    .collection('lists')
    .doc(list_id)
    .set({
      ...new_list,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      if (cb) cb();
    })
    .catch(error => {
      if (err) err(error);
    });
};

export const addItem = async (item: Item, list_id: string, user: User, cb: () => void, err: (e: any) => void) => {
  const item_id = db.collection('lists').doc(list_id).collection('items').doc().id;
  const uploaded_image_url = item.image ? await uploadImage(item.image, item.name, item_id) : null;

  const new_item = JSON.parse(
    JSON.stringify({
      ...item,
      item_id,
      list_id,
      price: Number(item.price),
      search_term: item.name.toLowerCase(),
      image: uploaded_image_url,
      author: {
        id: user.uid,
        username: user.username,
      },
      currency_code: user.settings?.currency?.code,
    })
  );

  return db
    .collection('lists')
    .doc(list_id)
    .collection('items')
    .doc(item_id)
    .set({
      ...new_item,
      created: firebase.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      if (cb) cb();
    })
    .catch(error => {
      if (err) err(error);
    });
};

export const editList = async (list: List, cb: (v: any) => void, err: (e: any) => void) => {
  const uploaded_image_url =
    list.image && is_link(list.image) ? list.image : list.image ? await uploadImage(list.image, list.name, list.list_id) : null;

  const new_obj = {
    ...list,
    search_term: list.name.toLowerCase(),
    image: uploaded_image_url,
  };

  return db
    .collection('lists')
    .doc(list.list_id)
    .update(new_obj)
    .then(() => {
      if (cb) cb(new_obj);
    })
    .catch(error => {
      if (err) err(error);
    });
};

export const editItem = async (item: Item, user: User, cb: (v: any) => void, err: (e: any) => void) => {
  const uploaded_image_url =
    item.image && is_link(item.image) ? item.image : item.image ? await uploadImage(item.image, item.name, item.item_id) : null;

  const new_obj = {
    ...item,
    search_term: item.name.toLowerCase(),
    image: uploaded_image_url,
    currency_code: user.settings?.currency?.code,
    price: Number(item.price),
  };

  return db
    .collection('lists')
    .doc(item.list_id)
    .collection('items')
    .doc(item.item_id)
    .update(new_obj)
    .then(() => {
      if (cb) cb(new_obj);
    })
    .catch(error => {
      if (err) err(error);
    });
};

export const deleteList = async (list_id: string, cb: () => void, err: (e: any) => void) => {
  return db
    .collection('lists')
    .doc(list_id)
    .delete()
    .then(() => {
      if (cb) cb();
    })
    .catch(function (error) {
      if (err) err(error);
    });
};

export const deleteItem = async (item_id: any, list_id: string, cb: () => void, err: (e: any) => void) => {
  return db
    .collection('lists')
    .doc(list_id)
    .collection('items')
    .doc(item_id)
    .delete()
    .then(() => {
      if (cb) cb();
    })
    .catch(function (error) {
      if (err) err(error);
    });
};

export const updateProfilePic = async (user: User, image: any, cb: () => void, err: (e: any) => void) => {
  const uploaded_image_url = image ? await uploadImage(image, user.username, user.uid) : null;

  return db
    .collection('users')
    .doc(user.uid)
    .update({
      image: uploaded_image_url,
    })
    .then(() => {
      if (cb) cb();
    })
    .catch(error => {
      console.log('ERR @ updateProfilePic\n', error.message);
      if (err) err(error);
    });
};

export const searchLists = async (term: string) => {
  if (term === '') return [];

  const snapshot = await db
    .collection('lists')
    .orderBy('search_term')
    .startAt(term)
    .endAt(term + '\uf8ff')
    .get();

  return snapshot.docs.map(doc => doc.data());
};

export const joinList = async (user: User, list_id: string) => {
  return db
    .collection('lists')
    .doc(list_id)
    .update({
      userIds: firebase.firestore.FieldValue.arrayUnion(user.uid),
      users: firebase.firestore.FieldValue.arrayUnion({
        id: user.uid,
        name: user.username,
      }),
    });
};

export const getNotifications = async (uid: string) => {
  const snapshot = await db.collection('users').doc(uid).collection('notifications').get();

  return snapshot.docs.map(doc => doc.data());
};

export const leaveList = async (user: User | null, list_id: string, cb: () => void, err: (e: any) => void) => {
  if (user) {
    await db
      .collection('lists')
      .doc(list_id)
      .update({
        userIds: firebase.firestore.FieldValue.arrayRemove(user.uid),
        users: firebase.firestore.FieldValue.arrayRemove({
          id: user.uid,
          name: user.username,
        }),
      })
      .then(() => {
        if (cb) cb();
      })
      .catch(error => err(error));
  }
};
