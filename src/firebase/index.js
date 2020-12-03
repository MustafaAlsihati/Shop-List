import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

/* ################################### Firebase Configs ###################################### */

const is_link = (str) => {
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
      return db
        .collection('users')
        .doc(uid)
        .set({
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

export const updateSettings = async (uid, obj, cb, err) => {
  return db
    .collection('users')
    .doc(uid)
    .update({ settings: obj })
    .then(() => {
      if (cb) cb();
    })
    .catch((error) => {
      if (err) err(error);
    });
};

export const sendUserJoinedNotification = async (
  uid,
  author_id,
  content,
  cb,
  err
) => {
  const notificationRef = db
    .collection('users')
    .doc(author_id)
    .collection('notifications');
  const notification_id = notificationRef.doc().id;

  let pushToken = null;
  await db
    .collection('users')
    .doc(author_id)
    .get()
    .then((snap) => {
      pushToken = snap.data().expo_push_token;
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
    .catch((error) => {
      if (err) err(error);
    });
};

export const getJoinedList = async (uid) => {
  const snapshot = await db
    .collection('lists')
    .where('userIds', 'array-contains', uid)
    .orderBy('created', 'desc')
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

export const getMyLists = async (uid) => {
  const snapshot = await db
    .collection('lists')
    .where('author', '==', uid)
    .orderBy('created', 'desc')
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

export const getMyItems = async (uid) => {
  const snapshot = await db
    .collectionGroup('items')
    .where('author.id', '==', uid)
    .orderBy('created', 'desc')
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

export const getListItems = async (list_id) => {
  const snapshot = await db
    .collection('lists')
    .doc(list_id)
    .collection('items')
    .orderBy('created', 'desc')
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

const uploadImage = async (image, name, id) => {
  const response = await fetch(image);
  const blob = await response.blob();
  const uploadTask = storage
    .ref(`images/${name.replace(/\s/g, '')}-${id}`)
    .put(blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => console.log('image uploading: ', snapshot),
      (error) => reject(error),
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

export const addList = async (list, user, cb, err) => {
  const list_id = db.collection('lists').doc().id;
  const uploaded_image_url = list.image
    ? await uploadImage(list.image, list.name, list_id)
    : null;

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
    .catch((error) => {
      if (err) err(error);
    });
};

export const addItem = async (item, list_id, user, cb, err) => {
  const item_id = db.collection('lists').doc(list_id).collection('items').doc()
    .id;
  const uploaded_image_url = item.image
    ? await uploadImage(item.image, item.name, item_id)
    : null;

  const new_item = JSON.parse(
    JSON.stringify({
      ...item,
      item_id,
      list_id,
      search_term: item.name.toLowerCase(),
      image: uploaded_image_url,
      author: {
        id: user.uid,
        username: user.username,
      },
      currency_code: user.settings.currency.code,
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
    .catch((error) => {
      if (err) err(error);
    });
};

export const editList = async (list, cb, err) => {
  const uploaded_image_url =
    list.image && is_link(list.image)
      ? list.image
      : list.image
      ? await uploadImage(list.image, list.name, list_id)
      : null;

  return db
    .collection('lists')
    .doc(list.list_id)
    .update({
      ...list,
      search_term: list.name.toLowerCase(),
      image: uploaded_image_url,
    })
    .then(() => {
      if (cb) cb();
    })
    .catch((error) => {
      if (err) err(error);
    });
};

export const editItem = async (item, user, cb, err) => {
  const uploaded_image_url =
    item.image && is_link(item.image)
      ? item.image
      : item.image
      ? await uploadImage(item.image, item.name, item_id)
      : null;

  return db
    .collection('lists')
    .doc(item.list_id)
    .collection('items')
    .doc(item.item_id)
    .update({
      ...item,
      search_term: item.name.toLowerCase(),
      image: uploaded_image_url,
      currency_code: user.settings.currency.code,
    })
    .then(() => {
      if (cb) cb(uploaded_image_url);
    })
    .catch((error) => {
      if (err) err(error);
    });
};

export const deleteList = async (list_id, cb, err) => {
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

export const deleteItem = async (item_id, list_id, cb, err) => {
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

export const updateProfilePic = async (user, image, cb, err) => {
  const uploaded_image_url = image
    ? await uploadImage(image, user.username, user.uid)
    : null;

  return db
    .collection('users')
    .doc(user.uid)
    .update({
      image: uploaded_image_url,
    })
    .then(() => {
      if (cb) cb();
    })
    .catch((error) => {
      console.log('ERR @ updateProfilePic\n', error.message);
      if (err) err(error);
    });
};

export const searchLists = async (term) => {
  if (term === '') return [];

  const snapshot = await db
    .collection('lists')
    .orderBy('search_term')
    .startAt(term)
    .endAt(term + '\uf8ff')
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

export const joinList = async (user, list_id) => {
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

export const getNotifications = async (uid) => {
  const snapshot = await db
    .collection('users')
    .doc(uid)
    .collection('notifications')
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

export const leaveList = async (user, list_id, cb, err) => {
  return db
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
    .catch((error) => err(error));
};
