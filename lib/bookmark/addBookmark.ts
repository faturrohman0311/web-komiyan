import { doc, serverTimestamp, setDoc } from "firebase/firestore";

import { auth, db } from "@/lib/firebase";

import { Comic } from "@/types/comic";

export const addBookmark = async (comic: Comic) => {
  try {
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User belum login");
    }

    await setDoc(doc(db, "users", user.uid, "bookmarks", comic.slug), {
      ...comic,
      createdAt: serverTimestamp(),
    });

    console.log("Bookmark berhasil");
  } catch (error) {
    console.error(error);
  }
};
