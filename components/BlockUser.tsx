import { doc, getDoc, updateDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import { User } from "@/types";


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

export const unblockUser = async (currentUserId: string, userIdToUnblock: string) => {
    const userDocRef = doc(db, "users", currentUserId);
    const userSnap = await getDoc(userDocRef);
    const data = userSnap.data();

    const updatedBlockedUsers = (data?.blockedUsers ?? []).filter((id: string) => id !== userIdToUnblock);
    await updateDoc(userDocRef, { blockedUsers: updatedBlockedUsers });
};

export async function fetchBlockedUserIds(userId: string): Promise<string[]> {
    try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
            const data = userDoc.data();
            return data?.blockedUsers || [];
        } else {
            console.warn("User document not found");
            return [];
        }
    } catch (error) {
        console.error("Error fetching blocked user IDs:", error);
        return [];
    }
}

export async function fetchBlockedUsers(currentUserId: string): Promise<User[]> {
    try {
        const blockedIds = await fetchBlockedUserIds(currentUserId);
        if (blockedIds.length === 0) return [];

        const usersRef = collection(db, "users");
        const batches = chunkArray(blockedIds, 10);

        const results: User[] = [];

        for (const batch of batches) {
            const q = query(usersRef, where("id", "in", batch));
            const snapshot = await getDocs(q);
            snapshot.forEach((doc) => {
                results.push(doc.data() as User);
            });
        }

        return results;
    } catch (error) {
        console.error("Error fetching blocked users:", error);
        return [];
    }
}


function chunkArray<T>(arr: T[], size: number): T[][] {
    const result: T[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}