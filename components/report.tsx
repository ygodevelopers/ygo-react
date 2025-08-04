import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "@/firebaseConfig";

export const fetchUserActivity = async (userId: string) => {
  const q = query(collection(db, "pillar_usage"), where("userId", "==", userId));
  const snapshot = await getDocs(q);

  const pillarUsages = snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      pillarId: data.pillarId,
      startDate: data.startDate.toDate(),
      endDate: data.endDate?.toDate?.(),
      totalTimeSpent: data.totalTimeSpent,
      lastActiveDate: data.lastActiveDate?.toDate?.(),
    };
  });

  return {
    id: userId,
    userId,
    pillarUsages,
  };
};

export const groupUsageByMonth = (usages: any[]) => {
  const monthlyUsage: { [month: number]: number } = {};
  usages.forEach((usage) => {
    const month = usage.startDate.getMonth() + 1;
    if (!monthlyUsage[month]) monthlyUsage[month] = 0;
    monthlyUsage[month] += usage.totalTimeSpent / 60;
  });
  return monthlyUsage;
};
