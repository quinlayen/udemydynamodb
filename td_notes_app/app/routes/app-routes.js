const express= require('express');
const router = express.Router();
const _ = require('underscore');
const {v4:uuidv4} = require('uuid');
const moment = require('moment');

const AWS = require('aws-sdk');
AWS.config.update({region: 'us-west-2'});

docClient = new AWS.DynamoDB.DocumentClient();

const TableName = 'td_notes'
let user_id = 'test_user_2';
let user_name = 'Test User 2';


router.post('/api/note', (req, res, next)=>{
    let item = req.body.Item;
    item.user_id = user_id;
    item.user_name = user_name;
    item.expires = moment().add(90, 'days').unix();
    item.note_id = `${user_id}:${uuidv4()}`;
    item.timestamp = moment().unix();
 

    docClient.put({
        TableName,
        Item: item
    }, (err,data)=>{
        if(err){
            console.log(err);
            return res.status(err.statusCode).send({
                message: err.message,
                status:err.statusCode
            })
        }else{
            return res.status(200).send(item)
        }
    })
})

router.patch('/api/note', (req, res, next)=>{
    let item = req.body.Item;
    item.user_id = user_id;
    item.user_name = user_name;
    item.expires = moment().add(90, 'days').unix();

    docClient.put({
        TableName,
        Item: item,
        ConditionExpression: '#t = :t',
        ExpressionAttributeNames:{
            '#t': 'timestamp'
        },
        ExpressionAttributeValues: {
            ":t": item.timestamp
        }
    }, (err,data)=>{
        if(err){
            console.log(err);
            return res.status(err.statusCode).send({
                message: err.message,
                status:err.statusCode
            })
        }else{
            return res.status(200).send(item)
        }
    })
})

router.get('/api/notes', (req, res, next)=>{
    let limit = req.query.limit ? parseInt(req.query.limit) : 5;
    let params = {
        TableName,
        KeyConditionExpression: "user_id = :uid",
        ExpressionAttributeValues: {
            ":uid": user_id
        },
        Limit: limit,
        ScanIndexForward: false
    };

    let startTimestamp = req.query.start ? parseInt(req.query.start) : 0;

    if(startTimestamp > 0) {
        params.ExclusiveStartKey = {
            user_id,
            timestamp: startTimestamp
        }
    }

    docClient.query(params, (err, data)=>{
        if(err) {
            console.log(err);
            return res.status(err.statusCode).send({
                message: err.message,
                status: err.statusCode
            });
        } else {
            return res.status(200).send(data);
        }
    });
});

router.get('/api/note/:note_id', (req, res, next )=>{
    let note_id = req.params.note_id;
    let params = {
        TableName,
        IndexName: 'note_id-index',
        KeyConditionExpression: "note_id = :note_id",
        ExpressionAttributeValues: {
            ":note_id": note_id        
        },
        Limit: 1
    };
    docClient.query(params, (err,data)=>{
        if(err){
            console.log(err);
            return res.status(err.statusCode).send({
                message: err.message,
                status: err.statusCode
            });
        }else{
            if(!_.isEmpty(data.Items)){
                return res.status(200).send(data.Items[0]);
            }else{
                return res.status(404).send();
            }
        }
    })
})

module.exports = router;