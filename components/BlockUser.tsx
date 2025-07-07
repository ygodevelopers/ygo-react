import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const blockUser = async (currentUserId: string, userIdToBlock: string) => {
  const userDocRef = doc(db, "users", currentUserId);
  const userSnap = await getDoc(userDocRef);
  const data = userSnap.data();

  let blockedUsers: string[] = data?.blockedUsers ?? [];

  if (!blockedUsers.includes(userIdToBlock)) {
    blockedUsers.push(userIdToBlock);
    await updateDoc(userDocRef, { blockedUsers });
  }
};