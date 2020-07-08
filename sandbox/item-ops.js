const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

// docClient.put(
//   {
//     TableName: "td_notes_test",
//     Item: {
//       user_id: "bb",
//       timestamp: 1,
//       title: "my_title",
//       content: "my newly added conent",
//     },
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// docClient.get(
//   {
//     TableName: "td_notes_test",
//     Key: {
//       user_id: "bb",
//       timestamp: 1,
//     },
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// docClient.update(
//   {
//     TableName: "td_notes_test",
//     Key: {
//       user_id: "bb",
//       timestamp: 1,
//     },
//     UpdateExpression: "set #t = :t",
//     ExpressionAttributeNames: {
//       "#t": "title"
//     },
//     ExpressionAttributeValues: {
//       ":t": "updated title"
//     },
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// docClient.delete(
//   {
//     TableName: "td_notes_test",
//     Key: {
//       user_id: "bb",
//       timestamp: 1,
//     },
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

// docClient.batchWrite(
//   {
//     RequestItems: {
//       'td_notes_test': [
//         {
//           DeleteRequest: {
//             Key: {
//               user_id: "A",
//               timestamp: 1,
//             }
//           }
//         },
//         {
//           DeleteRequest: {
//             Key: {
//               user_id: "B",
//               timestamp: 5,
//             }
//           }
//         },
//         {
//           PutRequest: {
//             Item: {
//               user_id: '11',
//               timestamp: 1,
//               title: "title 11",
//               content: "Content 11"
//             }
//           }
//         },
//         {
//           PutRequest: {
//             Item: {
//               user_id: "23",
//               timestamp: 23,
//               title: "title 23",
//               content: "Contents for 23"
//             }
//           }
//         }
//       ],
//     },
//   },
//   (err, data) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(data);
//     }
//   }
// );

docClient.scan({
    TableName:'td_notes_test',
    FilterExpression: 'cat = :cat',
    ExpressionAttributeValues:{
        ':cat': 'general'
    }
}, (err,data)=>{
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
})
