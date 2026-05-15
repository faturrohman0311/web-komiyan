import { collection, getDocs, orderBy, query } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export const getBookmarks = async () => {
  try {
    const user = auth.currentUser;

    if (!user) return [];

    const q = query(
      collection(db, "users", user.uid, "bookmarks"),
      orderBy("createdAt", "desc"),
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error(error);

    return [];
  }
};
