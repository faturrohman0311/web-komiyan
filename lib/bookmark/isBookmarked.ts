import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export const isBookmarked = async (slug: string) => {
  try {
    const user = auth.currentUser;

    if (!user) return false;

    const snapshot = await getDoc(
      doc(db, "users", user.uid, "bookmarks", slug),
    );

    return snapshot.exists();
  } catch (error) {
    console.error(error);

    return false;
  }
};
