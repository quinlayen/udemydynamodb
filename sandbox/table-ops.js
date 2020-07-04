const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const dynamodb = new AWS.DynamoDB();

// dynamodb.listTables({}, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(data);
//   }
// });

// const params = {
//   TableName: "td_notes_test",
// };
// dynamodb.describeTable( params, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(JSON.stringify(data,null,2));
//   }
// });

// const params = {
//   TableName: "td_notes_sdk",
//   AttributeDefinitions: [
//     {
//       AttributeName: "user_id",
//       AttributeType: "S",
//     },
//     {
//       AttributeName: "timestamp",
//       AttributeType: "N",
//     },
//   ],
//   KeySchema: [
//     {
//       AttributeName: "user_id",
//       KeyType: "HASH",
//     },
//     {
//       AttributeName: "timestamp",
//       KeyType: "RANGE",
//     },
//   ],
//   ProvisionedThroughput: {
//     ReadCapacityUnits: 1,
//     WriteCapacityUnits: 1,
//   },
// };

// dynamodb.createTable(params, (err, data) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(JSON.stringify(data, null, 2));
//   }
// });

// dynamodb.updateTable({
//     TableName: "td_notes_sdk",
//     ProvisionedThroughput: {
//         ReadCapacityUnits: 2,
//         WriteCapacityUnits: 2
//     }
// }, (err, data)=>{
//     if (err){
//         console.log(err);
//     }else{
//         console.log(JSON.stringify(data, null,2));
//     }
// })

dynamodb.deleteTable({ TableName: "td_notes_sdk" }, (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
});
