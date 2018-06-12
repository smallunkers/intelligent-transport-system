const express = require('express');
const router = express.Router();
const apiConstant = require('../../../service/serviceNameList');
const service = require('../../../service/service');
const paramUtil = require('../../../public/src/utils/paramUtil');

let result=null
let yellowResult= []
let distanceOldAll = null

router.post('/roadCrowd',function (req, res, next){
    let params = paramUtil.getParams(req);
    let parameters = {

    };
    let fs = require('fs');
    let data = fs.readFileSync('data/roadCrowd.json','utf-8');
    // console.log(data);
    res.status(200).send(data);
    // return service.roadCrowd(parameters).then((resp) => {
    //     res.json(resp);
    // })
});

router.post('/resolveItem',function(req, res, next) {
    let params = paramUtil.getParams(req);
    let parameters = {

    }
    // console.log(req);
    console.log('params is--------')
    console.log(params)
    let fs = require('fs');
    let data = JSON.parse(fs.readFileSync('data/resolveItem.json','utf-8'));
    // console.log(data);
    let start = params.start,
        end = params.end,
        direction = params.direction,
        // direction = 'right',
        rowStart = parseInt(start.split(',')[0]),
        // rowStart = 3,
        colStart = parseInt(start.split(',')[1]),
        // colStart = 0,
        rowEnd = parseInt(end.split(',')[0]),
        // rowEnd = 7,
        colEnd = parseInt(end.split(',')[1]),
        // colEnd = 2,
        resultDistance = [],
        hasGetNode=[],
        listData = data.data.YRoad;
    let node = listData[rowStart].node[colStart];
    // console.log('node is ----')
    // console.log(node)
    let name = listData[rowStart].node[colStart].nodeName;
    let nodeEnd = listData[rowEnd].node[colEnd];
    distanceOldAll = null
    crowdNode(node,direction,0,nodeEnd,listData);
    node.yellowFlag = false
    if(params.type=='0'){
        let resultNode = findNode(node,direction,resultDistance,0,node.coordinate,name, hasGetNode,listData,nodeEnd)
        console.log('result is ----------------------')
        console.log(result);
        if(yellowResult.length > 0) {
            yellowResult.sort(compare)
            console.log(yellowResult)
            if(result){
                result = result.distance < yellowResult[0].distance ?result: yellowResult[0]
            }else{
                result = yellowResult[0]
            }
            yellowResult.splice(0,yellowResult.length) // 清空数组
        }
        console.log('result is ----------------------')
        console.log(result);
        let record = result.record.split('|');
        let latList=[]
        for(let j=0;j <record.length;j++ ){
            let row = record[j].split(',')[0];
            let col = record[j].split(',')[1];
            let obj = {
                lgd:listData[row].node[col].lgd,
                lat:listData[row].node[col].lat
            }
            latList.push(obj)
        }
        res.status(200).send({
            code:'0',
            msg:'has way to replace',
            data:{
                resolve:result,
                latList:latList,
                oldDistance:distanceOldAll
            }
        })
    }else{
        res.status(200).send({
            code:'0',
            msg:'no way to replace',
            data:''
        })
    }
    // res.status(200).send(result);
    // return service.resolveItem(parameters).then((resp) => {
    //     res.json(resp);
    // })
});
function crowdNode(node,direction,prevDistance = 0,nodeEnd,listData) {
    if(nodeEnd.coordinate == node.coordinate){
        distanceOldAll = prevDistance
        return prevDistance
    }else {
        if(direction=='bottom') {
            let bottom = node.connectNode[0].bottomNode;
            let distance = prevDistance + parseInt(bottom.distance) + bottom.redDistance*50 + bottom.yellowDistance*10;
            console.log('bottom is ------')
            console.log(bottom);
            let row = parseInt(bottom.coordinateY.split(',')[0])
            let col = parseInt(bottom.coordinateY.split(',')[1])
            let nodeItem = listData[row].node[col]
            crowdNode(nodeItem,direction,distance,nodeEnd,listData)
        }
        if(direction == 'right') {
            let right = node.connectNode[0].rightNode
            let distance = prevDistance + parseInt(right.distance) + right.redDistance*50 + right.yellowDistance*10;
            let row = parseInt(right.coordinateY.split(',')[0])
            let col = parseInt(right.coordinateY.split(',')[1])
            let nodeItem = listData[row].node[col]
            crowdNode(nodeItem,direction,distance,nodeEnd,listData)
        }
    }
}
function findNode(node,direction,resultDistance,prevDistance = 0,record, nodeName=``,hasGetNode, listData, nodeEnd) {
    console.log('node is -------')
    console.log(node)
    let leftFlag = true,
        rightFlag = true,
        bottomFlag = true,
        topFlag = true;
    for(let i=0;i<hasGetNode.length;i++ ){
        if(node.connectNode[0].topNode.coordinateY && node.connectNode[0].topNode.coordinateY==hasGetNode[i].coordinate){
            topFlag = false
        }
        if(node.connectNode[0].bottomNode.coordinateY && node.connectNode[0].bottomNode.coordinateY==hasGetNode[i].coordinate){
            bottomFlag = false
        }
        if(node.connectNode[0].leftNode.coordinateY && node.connectNode[0].leftNode.coordinateY==hasGetNode[i].coordinate){
            leftFlag = false
        }
        if(node.connectNode[0].rightNode.coordinateY && node.connectNode[0].rightNode.coordinateY==hasGetNode[i].coordinate){
            rightFlag = false
        }
    }
    if(direction.indexOf('top') < 0 && node.connectNode[0].topNode && node.connectNode[0].topNode.coordinateY&& topFlag) {
        let top = node.connectNode[0].topNode
        let isRepeat = false
        let row = parseInt(top.coordinateY.split(',')[0])
        let col = parseInt(top.coordinateY.split(',')[1])
        let distance = prevDistance + parseInt(top.distance) + top.redDistance*50 + top.yellowDistance*10;
        if(distance > 2500) {

        }else {
            let nodeItem = listData[row].node[col]
            if(node.yellowFlag){
                nodeItem.yellowFlag = true
            }else {
                nodeItem.yellowFlag = parseInt(top.yellowDistance) > 0 ? true: false
            }
            let obj= {
                ...nodeItem,
                distance:distance,
                record:`${record}|${top.coordinateY}`,
                nodeRecord:`${nodeName}->${nodeItem.nodeName}`,
                direction:'bottom'
            }
            if(top.coordinateY==nodeEnd.coordinate){
                if(nodeItem.yellowFlag){
                    yellowResult.push(obj)
                }else{
                    result = obj;
                    return obj;
                }
            }
            // 寻找该数组中是否有于将要push的节点重复的节点，如果有则比较距离，短的代替
            for(let j=0;j<resultDistance.length;j++){
                if(obj.coordinate==resultDistance[j].coordinate) {
                    if(obj.distance < resultDistance[j].distance ){
                        obj.direction = `${obj.direction}|${resultDistance[j].direction}`
                        resultDistance.splice(j,1,obj)
                    }
                    isRepeat = true
                }
            }
            if(!isRepeat) {
                resultDistance.push(obj)
            }
        }
    }
    if(direction.indexOf('bottom') < 0 && node.connectNode[0].bottomNode && node.connectNode[0].bottomNode.coordinateY&&bottomFlag) {
        let bottom = node.connectNode[0].bottomNode
        let isRepeat = false
        let row = parseInt(bottom.coordinateY.split(',')[0])
        let col = parseInt(bottom.coordinateY.split(',')[1])
        let distance = prevDistance + parseInt(bottom.distance) + bottom.redDistance*50 + bottom.yellowDistance*10;
        if(distance > 2500) {

        }else {
            let nodeItem = listData[row].node[col]
            if(node.yellowFlag){
                nodeItem.yellowFlag = true
            }else {
                nodeItem.yellowFlag = parseInt(bottom.yellowDistance) > 0 ? true: false
            }
            let obj= {
                ...nodeItem,
                distance:distance,
                record:`${record}|${bottom.coordinateY}`,
                nodeRecord:`${nodeName}->${nodeItem.nodeName}`,
                direction:'top'
            }
            if(bottom.coordinateY==nodeEnd.coordinate){
                if(nodeItem.yellowFlag){
                    yellowResult.push(obj)
                }else{
                    result = obj;
                    return obj;
                }
            }
            // 寻找该数组中是否有于将要push的节点重复的节点，如果有则比较距离，短的代替
            for(let j=0;j<resultDistance.length;j++){
                if(obj.coordinate==resultDistance[j].coordinate) {
                    if(obj.distance < resultDistance[j].distance ){
                        obj.direction = `${obj.direction}|${resultDistance[j].direction}`
                        resultDistance.splice(j,1,obj)
                    }
                    isRepeat = true
                }
            }
            if(!isRepeat) {
                resultDistance.push(obj)
            }
        }
    }
    if(direction.indexOf('left') < 0 && node.connectNode[0].leftNode && node.connectNode[0].leftNode.coordinateY&&  leftFlag) {
        let left = node.connectNode[0].leftNode
        let row = parseInt(left.coordinateY.split(',')[0])
        let col = parseInt(left.coordinateY.split(',')[1])
        let isRepeat = false
        let distance = prevDistance + parseInt(left.distance) + left.redDistance*50 + left.yellowDistance*10;
        if(distance > 2500) {

        }else {
            let nodeItem = listData[row].node[col]
            if(node.yellowFlag){
                nodeItem.yellowFlag = true
            }else {
                nodeItem.yellowFlag = parseInt(left.yellowDistance) > 0 ? true: false
            }
            let obj= {
                ...nodeItem,
                distance:distance,
                record:`${record}|${left.coordinateY}`,
                nodeRecord:`${nodeName}->${nodeItem.nodeName}`,
                direction:'right'
            }
            if(left.coordinateY==nodeEnd.coordinate){
                if(nodeItem.yellowFlag){
                    yellowResult.push(obj)
                }else{
                    result = obj;
                    return obj;
                }
            }
            // 寻找该数组中是否有于将要push的节点重复的节点，如果有则比较距离，短的代替
            for(let j=0;j<resultDistance.length;j++){
                if(obj.coordinate==resultDistance[j].coordinate) {
                    if(obj.distance < resultDistance[j].distance ){
                        obj.direction = `${obj.direction}|${resultDistance[j].direction}`
                        resultDistance.splice(j,1,obj)
                    }
                    isRepeat = true
                }
            }
            if(!isRepeat) {
                resultDistance.push(obj)
            }
        }
    }
    if(direction.indexOf('right') < 0 && node.connectNode[0].rightNode && node.connectNode[0].rightNode.coordinateY&& rightFlag) {
        let right = node.connectNode[0].rightNode
        let row = parseInt(right.coordinateY.split(',')[0])
        let col = parseInt(right.coordinateY.split(',')[1])
        let isRepeat = false
        let distance = prevDistance + parseInt(right.distance) + right.redDistance*50 + right.yellowDistance*15;
        if(distance > 2500) {

        }else {
            let nodeItem = listData[row].node[col]
            if(node.yellowFlag){
                nodeItem.yellowFlag = true
            }else {
                nodeItem.yellowFlag = parseInt(right.yellowDistance) > 0 ? true: false
            }
            let obj= {
                ...nodeItem,
                distance:distance,
                record:`${record}|${right.coordinateY}`,
                nodeRecord:`${nodeName}->${nodeItem.nodeName}`,
                direction:'left'
            }
            if(right.coordinateY==nodeEnd.coordinate){
                if(nodeItem.yellowFlag){
                    yellowResult.push(obj)
                }else{
                    result = obj;
                    return obj;
                }
            }
            // 寻找该数组中是否有于将要push的节点重复的节点，如果有则比较距离，短的代替
            for(let j=0;j<resultDistance.length;j++){
                if(obj.coordinate==resultDistance[j].coordinate) {
                    if(obj.distance < resultDistance[j].distance ){
                        obj.direction = `${obj.direction}|${resultDistance[j].direction}`
                        resultDistance.splice(j,1,obj)
                    }
                    isRepeat = true
                }
            }
            if(!isRepeat) {
                resultDistance.push(obj)
            }
        }
    }
    hasGetNode.push(node);
    if(resultDistance.length > 0){
        resultDistance.sort(compare)
        let popNode = resultDistance.shift()
        findNode(popNode,popNode.direction,resultDistance,popNode.distance,popNode.record,popNode.nodeRecord,hasGetNode, listData, nodeEnd)
    }else {
        result =null
        return null
    }
}
let  compare = function(x,y) {
    if(x.distance > y.distance) {
        return 1
    }
    if(x.distance < y.distance) {
        return -1
    }
    return 0
}
module.exports = router;