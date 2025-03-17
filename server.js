const express = require("express");
const admin = require("firebase-admin");
const cors = require("cors");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

// Use Firebase credentials from Vercel environment variables
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://your-firebase-project.firebaseio.com",
});

const db = admin.firestore();

app.use(cors());
app.use(express.json());

// Send notification to all users
app.post("/send-notification", async (req, res) => {
  try {
    const { title, body } = req.body;

    // Fetch all subscribed users from Firestore
    const usersRef = db.collection("subscribedUsers");
    const snapshot = await usersRef.get();

    let tokens = [];
    snapshot.forEach((doc) => {
      tokens.push(doc.data().token);
    });

    if (tokens.length === 0) {
      return res.status(400).json({ message: "No subscribed users found." });
    }

    // Send notification via Firebase Cloud Messaging
    const message = {
      notification: { title, body },
      tokens,
    };

    const response = await admin.messaging().sendEachForMulticast(message);
    res.json({ success: true, response });
  } catch (error) {
    console.error("Error sending notification:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
