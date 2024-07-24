import sortBy from "sort-by";
import {
  collection,
  query,
  where,
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

export async function getImageRecords() {
  // const imageRecordsRef = collection(db, "imageRecords");
  // const q = query(imageRecordsRef, where("route", "==", "shop"));
  // const querySnapshot = await getDocs(q);
  const querySnapshot = await getDocs(collection(db, "imageRecords"));
  let imageRecords = [];
  querySnapshot.forEach((doc) => {
    imageRecords.push({ ...doc.data(), id: doc.id });
  });
  return imageRecords.sort(sortBy("title", "createdAt"));
}

export async function createImageRecord() {
  let imageRecord;
  let imageRecords = await getImageRecords();
  try {
    const docRef = await addDoc(collection(db, "imageRecords"), {
      createdAt: Timestamp.now(),
    });
    let id = docRef.id;
    imageRecord = { id, createdAt: docRef.createdAt };
    imageRecords.unshift(imageRecord);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
  return imageRecord;
}

export async function getImageRecord(id) {
  let imageRecord;
  const docRef = doc(db, "imageRecords", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    imageRecord = { ...docSnap.data(), id: docSnap.id };
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
  }
  return imageRecord ?? null;
}

export async function updateImageRecord(
  id,
  updates,
  updateImagesCheck,
  favorite,
) {
  let imageRecord = getImageRecord(id);
  if (!imageRecord) throw new Error("No image record found for", id);

  const docRef = doc(db, "imageRecords", id);
  console.log(
    "updates to send to Firebase (from update function in 'imageRecords'): ",
    updates,
  );
  // Update Firestore with the URLs array
  try {
    if (updateImagesCheck) {
      await setDoc(
        docRef,
        {
          imgPath: updates.imgPath,
        },
        { merge: true },
      ).then((r) => {
        console.log(
          "updating Firestore document with final imgPath array: done",
        );
      });
    }
    if (favorite) {
      await setDoc(
        docRef,
        {
          favorite: updates.favorite,
        },
        { merge: true },
      ).then((r) => {
        console.log("updating Firestore document favorite prop value");
      });
    }
    await updateDoc(docRef, updates);
  } catch (err) {
    alert(err);
  }
  return imageRecord;
}

// export async function updateImageRecordFav(id, updates, favorite) {
//   let imageRecord = getImageRecord(id);
//   if (!imageRecord) throw new Error("No image record found for", id);

//   const docRef = doc(db, "imageRecords", id);
//   console.log(
//     "updates to send to Firebase (from update function in 'imageRecords'): ",
//     updates,
//   );
//   // Update Firestore with the URLs array
//   try {
//     if (favorite) {
//       await setDoc(
//         docRef,
//         {
//           favorite: updates.favorite,
//         },
//         { merge: true },
//       ).then((r) => {
//         console.log("updating Firestore document favorite prop value");
//       });
//     }
//     await updateDoc(docRef, updates);
//   } catch (err) {
//     alert(err);
//   }
//   return imageRecord;
// }

export async function deleteImageRecord(id) {
  await deleteDoc(doc(db, "imageRecords", id));
}

export async function getRouteImages(route) {
  const imageRecordsRef = collection(db, "imageRecords");
  const q = query(imageRecordsRef, where("route", "==", route));
  const querySnapshot = await getDocs(q);
  let imageRecords = [];
  querySnapshot.forEach((doc) => {
    imageRecords.push({ ...doc.data(), id: doc.id });
  });
  const compare = (a, b) => {
    if (Number(a.order) > Number(b.order)) return 1;
    if (Number(a.order) < Number(b.order)) return -1;
    return 0;
  };
  console.log("imageRecords (sorted): ", imageRecords.sort(compare));
  return imageRecords.sort(compare);
  // return imageRecords.sort(sortBy("order", "createdAt"));
}

// export async function createSubscribedEmailRecord() {
//   let emailRecord;
//   try {
//     const docRef = await addDoc(collection(db, "subscribedEmails"), {
//       createdAt: Timestamp.now(),
//     });
//     let id = docRef.id;
//     emailRecord = { id, createdAt: docRef.createdAt };
//   } catch (e) {
//     console.error("Error adding document: ", e);
//   }
//   return emailRecord;
// }
