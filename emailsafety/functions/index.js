import * as functions from "firebase-functions";
const admin = require("firebase-admin");
admin.initializeApp();

const db = admin.firestore();

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// user table

export const addUser = functions.auth.user().onCreate((user) => {
    db.collection("users")
        .doc(user.uid)
        .set(JSON.parse(JSON.stringify(user)));
}
);
