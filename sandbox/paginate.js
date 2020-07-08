const async = require("async");
const _ = require("underscore");
const AWS = require("aws-sdk");
AWS.config.update({ region: "us-west-2" });

const docClient = new AWS.DynamoDB.DocumentClient();

var startKey = [];
var results = [];
var pages = 0;

async.doWhilst(
  //iterative function takes callback
  (callback) => {
    let params = {
      TableName: "td_notes_test",
      Limit: 3,
    };

    if (!_.isEmpty(startKey)) {
      params.ExclusiveStartKey = startKey;
    }
    docClient.scan(params, (err, data) => {
      if (err) {
        console.log(err);
        callback(err, {});
      } else {
        if (typeof data.LastEvaluatedKey !== "undefined") {
          startKey = data.LastEvaluatedKey;
        } else {
          startKey = [];
        }

        if (!_.isEmpty(data.Items)) {
          results = _.union(results, data.Items);
        }

        pages++;

        callback(null, results);
      }
    });
  },
  //syncrhonous truth test
  () => {
    if (_.isEmpty(startKey)) {
      return false;
    } else {
      return true;
    }
  },
  (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      console.log("Item count: " ,data.length);
      console.log("Pages: ", pages)
    }
  }
);
