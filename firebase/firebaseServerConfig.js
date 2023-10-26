const admin = require('firebase-admin');
const serviceAccount = require('./ease-8d84a-firebase-adminsdk-jqkar-605f6e8d67.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://console.firebase.google.com/u/3/project/ease-8d84a/database/ease-8d84a-default-rtdb/data/~2F?hl=es-419',
});