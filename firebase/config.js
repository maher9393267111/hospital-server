
var admin = require("firebase-admin");

var serviceAccount = require("./mern-4dbe9-firebase-adminsdk-h4wem-dabe2cb22f.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});





module.exports =admin