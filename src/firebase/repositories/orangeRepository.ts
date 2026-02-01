import * as Crypto from "expo-crypto";
import { deleteDoc, doc, setDoc } from "firebase/firestore";
import { getDatabase } from "../database";
import { db as firestoreDb } from "../firebase";

export const orangeRepository = {
  async addOrange(
    userId: string,
    variety: string,
    weight: number,
    circleLine: number,
    createdAt?: string,
    orangeIdOverride?: string,
    imageUri?: string,
  ) {
    const db = await getDatabase();
    const orangeId = orangeIdOverride || Crypto.randomUUID();

    if (createdAt) {
      await db.runAsync(
        `INSERT INTO Oranges_Data (orange_id, user_id, variety, weight, circle_line, created_at, status, image_uri)
         VALUES (?, ?, ?, ?, ?, ?, 'pending', ?)`,
        [
          orangeId,
          userId,
          variety,
          weight,
          circleLine,
          createdAt,
          imageUri || null,
        ],
      );
    } else {
      await db.runAsync(
        `INSERT INTO Oranges_Data (orange_id, user_id, variety, weight, circle_line, status, image_uri)
         VALUES (?, ?, ?, ?, ?, 'pending', ?)`,
        [orangeId, userId, variety, weight, circleLine, imageUri || null],
      );
    }

    try {
      await setDoc(
        doc(firestoreDb, "oranges", orangeId),
        {
          orange_id: orangeId,
          user_id: userId,
          variety,
          weight,
          circle_line: circleLine,
          created_at: createdAt || new Date().toISOString(),
          status: "pending",
          image_uri: imageUri || null,
          updated_at: new Date().toISOString(),
        },
        { merge: true },
      );
    } catch (error) {
      console.log("Firestore sync failed (addOrange):", error);
    }

    return orangeId;
  },

  async getOrangesByUser(userId: string) {
    const db = await getDatabase();
    return await db.getAllAsync(
      "SELECT * FROM Oranges_Data WHERE user_id = ? ORDER BY created_at DESC",
      [userId],
    );
  },

  async getOrangeById(orangeId: string) {
    const db = await getDatabase();
    return await db.getFirstAsync(
      "SELECT * FROM Oranges_Data WHERE orange_id = ?",
      [orangeId],
    );
  },

  async updateOrangeStatus(orangeId: string, status: string) {
    const db = await getDatabase();
    await db.runAsync(
      "UPDATE Oranges_Data SET status = ? WHERE orange_id = ?",
      [status, orangeId],
    );

    try {
      await setDoc(
        doc(firestoreDb, "oranges", orangeId),
        {
          status,
          updated_at: new Date().toISOString(),
        },
        { merge: true },
      );
    } catch (error) {
      console.log("Firestore sync failed (updateOrangeStatus):", error);
    }
  },

  async deleteOrange(orangeId: string) {
    const db = await getDatabase();
    await db.runAsync("DELETE FROM Oranges_Data WHERE orange_id = ?", [
      orangeId,
    ]);

    try {
      await deleteDoc(doc(firestoreDb, "oranges", orangeId));
    } catch (error) {
      console.log("Firestore sync failed (deleteOrange):", error);
    }
  },

  async updateOrange(
    orangeId: string,
    variety: string,
    weight: number,
    circleLine: number,
    createdAt?: string,
    imageUri?: string,
  ) {
    const db = await getDatabase();

    if (createdAt) {
      await db.runAsync(
        `UPDATE Oranges_Data
         SET variety = ?, weight = ?, circle_line = ?, created_at = ?, image_uri = ?
         WHERE orange_id = ?`,
        [variety, weight, circleLine, createdAt, imageUri || null, orangeId],
      );
    } else {
      await db.runAsync(
        `UPDATE Oranges_Data
         SET variety = ?, weight = ?, circle_line = ?, image_uri = ?
         WHERE orange_id = ?`,
        [variety, weight, circleLine, imageUri || null, orangeId],
      );
    }

    try {
      const updateData: Record<string, unknown> = {
        variety,
        weight,
        circle_line: circleLine,
        image_uri: imageUri || null,
        updated_at: new Date().toISOString(),
      };

      if (createdAt) {
        updateData.created_at = createdAt;
      }

      await setDoc(doc(firestoreDb, "oranges", orangeId), updateData, {
        merge: true,
      });
    } catch (error) {
      console.log("Firestore sync failed (updateOrange):", error);
    }
  },
};
