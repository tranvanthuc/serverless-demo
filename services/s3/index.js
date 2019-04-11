var AWS = require("aws-sdk");
var s3 = new AWS.S3();

var bucketName = process.env.S3_BUCKET;

exports.handler = function(event, context, callback) {
  console.log(JSON.stringify(event.Records[0].s3));
  const key = event.Records[0].s3.object.key;
  console.log("key", key);

  //Retrieve the file from your bucket
  s3.getObject(
    {
      Bucket: bucketName,
      Key: key
    },
    function(err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(JSON.stringify(data));
      }
    }
  );
};
