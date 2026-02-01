import * as Crypto from "expo-crypto";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { getDatabase } from "../database";
import { db as firestoreDb } from "../firebase";

export const analysisRepository = {
  async addAnalysisResult(
    orangeId: string,
    brixValue: number,
    volume: number,
    grade: string,
  ) {
    const db = await getDatabase();
    const resultId = Crypto.randomUUID();

    await db.runAsync(
      `INSERT INTO Analysis_Results (result_id, orange_id, brix_value, volume, grade, status)
       VALUES (?, ?, ?, ?, ?, 'pending')`,
      [resultId, orangeId, brixValue, volume, grade],
    );

    try {
      await setDoc(
        doc(firestoreDb, "analysis_results", resultId),
        {
          result_id: resultId,
          orange_id: orangeId,
          brix_value: brixValue,
          volume,
          grade,
          analyzed_at: new Date().toISOString(),
          status: "pending",
          updated_at: new Date().toISOString(),
        },
        { merge: true },
      );
    } catch (error) {
      console.log("Firestore sync failed (addAnalysisResult):", error);
    }

    return resultId;
  },

  async getAnalysisByOrange(orangeId: string) {
    const db = await getDatabase();
    return await db.getFirstAsync(
      "SELECT * FROM Analysis_Results WHERE orange_id = ?",
      [orangeId],
    );
  },

  async getAllAnalysis(userId: string) {
    const db = await getDatabase();
    return await db.getAllAsync(
      `SELECT ar.*, od.variety, od.weight, od.circle_line, od.image_uri 
       FROM Analysis_Results ar
       JOIN Oranges_Data od ON ar.orange_id = od.orange_id
       WHERE od.user_id = ? 
       ORDER BY ar.analyzed_at DESC`,
      [userId],
    );
  },

  async updateAnalysisStatus(resultId: string, status: string) {
    const db = await getDatabase();
    await db.runAsync(
      "UPDATE Analysis_Results SET status = ? WHERE result_id = ?",
      [status, resultId],
    );

    try {
      await setDoc(
        doc(firestoreDb, "analysis_results", resultId),
        {
          status,
          updated_at: new Date().toISOString(),
        },
        { merge: true },
      );
    } catch (error) {
      console.log("Firestore sync failed (updateAnalysisStatus):", error);
    }
  },

  async deleteAnalysis(resultId: string) {
    const db = await getDatabase();
    await db.runAsync("DELETE FROM Analysis_Results WHERE result_id = ?", [
      resultId,
    ]);

    try {
      await deleteDoc(doc(firestoreDb, "analysis_results", resultId));
    } catch (error) {
      console.log("Firestore sync failed (deleteAnalysis):", error);
    }
  },
};
