import sortBy from "sort-by";

import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export async function getContacts() {
  const querySnapshot = await getDocs(collection(db, "imageRecords"));
  let contacts = [];
  querySnapshot.forEach((doc) => {
    contacts.push({ ...doc.data(), id: doc.id });
  });
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {
  let contact;
  let contacts = await getContacts();
  try {
    const docRef = await addDoc(collection(db, "imageRecords"), {
      createdAt: Timestamp.now(),
    });
    let id = docRef.id;
    contact = { id, createdAt: docRef.createdAt };
    contacts.unshift(contact);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return contact;
}

export async function getContact(id) {
  let contact;
  const docRef = doc(db, "imageRecords", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    contact = { ...docSnap.data(), id: docSnap.id };
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return contact ?? null;
}

export async function updateContact(id, updates) {
  let contact = getContact(id);
  if (!contact) throw new Error("No contact found for", id);

  const docRef = doc(db, "imageRecords", id);
  console.log(
    "updates to send to Firebase (from update function in 'contacts'): ",
    updates,
  );
  // Update Firestore with the URLs array
  try {
    await setDoc(
      docRef,
      {
        imgPath: updates.imgPath,
      },
      { merge: true },
    ).then((r) => {
      console.log("done");
    });
    await updateDoc(docRef, updates);
  } catch (err) {
    alert(err);
  }

  return contact;
}

export async function deleteContact(id) {
  await deleteDoc(doc(db, "imageRecords", id));
}
