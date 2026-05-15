import { deleteDoc, doc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

export const removeBookmark = async (slug: string) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User belum login");
    }

    await deleteDoc(doc(db, "users", user.uid, "bookmarks", slug));

    console.log("Bookmark dihapus");
  } catch (error) {
    console.error(error);
  }
};
