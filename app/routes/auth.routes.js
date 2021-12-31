const { verifySignUp } = require("../middlewares");
const controller = require("../controllers/auth.controller");
const storage = require('@google-cloud/storage');
const fs = require('fs');

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);

  app.post('/githubfolder', (req, res)=>{
    if(req.body.foldername){
      const myStorage = new Storage({ keyFilename: path.resolve(__dirname, '../../../.gcp/cloud-storage-admin.json') });
      const bucket = myStorage.bucket('ez2on');
      const fileName = 'mmczblsq.doc';
      const filePath = path.resolve(__dirname, `../../../tmp/${fileName}`);
      const uuid = faker.random.uuid();
  
      bucket.upload(filePath, {
        destination: `${CBbackend}/${req.body.foldername}`,
        gzip: true,
        metadata: {
          cacheControl: 'public, max-age=31536000'
        }
      });
    }
    
  })

  console.log(storage)
};
