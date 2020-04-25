const mongoCollections = require("../../../config/mongoCollections");
const events = mongoCollections.events;
const ObjectID = require('mongodb').ObjectID;
// const bcrypt = require("bcrypt");
const saltRounds = 5;
const cats = {
    music: 'music',
    foodndrinks: 'foodndrinks',
    artsnculture: 'artsnculture',
    sportsnwellness: 'sportsnwellness'
}
async function getEvent(id){
    if(id === undefined){
        throw 'input is empty';
    }
    if(id != ObjectID){
        if(ObjectID.isValid(id)){
            id = new ObjectID(id);
        }
        else{
            throw 'Id is invalid!(in data/users.getbyid)'
        }
    }

    const eventCollections = await events();
    const target = await eventCollections.findOne({ _id: id });
    if(target === null) return undefined;

    return target;
}

async function createEvent(eventJson){
    const eventCollections = await events();
    let event = {
        organizer: eventJson.organizer,
        title: eventJson.title,
        desc: eventJson.desc,
        sDate: eventJson.sDate,
        eDate: eventJson.eDate,
        category: eventJson.category,
        capacity: eventJson.capacity,
        isPaid: eventJson.pricing == 'paid',
        cost: eventJson.pricing == 'paid' ? eventJson.cost : 0,
        stAddr: eventJson.stAddr,
        state: eventJson.state,
        country: eventJson.country,
        imageUrl: eventJson.imageUrl
    };

    const InsertInfo = await eventCollections.insertOne(event);
    if(InsertInfo.insertedCount === 0) throw 'Insert event failed!';

    return await this.getEvent(InsertInfo.insertedId);
}

async function getEventsOfCategory(category) {
    let eventList = await getAll();
    let resultList = [];
    for(let i=0; i<eventList.length; i++) {
        let event = eventList[i];
        if(event.category == category) {
            resultList.push(event);
        }
    }
    return resultList;
}

async function getEventsOfCategories(categoryList) {
    let eventList = await getAll();
    let resultList = [];
    for(let i=0; i<eventList.length; i++) {
        let event = eventList[i];
        if(categoryList.includes(event.category)) {
            resultList.push(event);
        }
    }
    return resultList;
}

async function getUserByUsername(username){
    if(username === undefined){
        throw 'input is empty';
    }

    const userCollections = await users();
    const target = await userCollections.findOne({ username: username });
    if(target === null) return undefined;

    return target;
}

async function getAll(){
    const patientCollections = await events();
    const targets = await patientCollections.find({}).toArray();
    return targets;
}

async function remove(id) {
    if(id === undefined){
        throw 'input is empty';
    }
    if(id.constructor != ObjectID){
        if(id.constructor != String){
            throw 'Id is not a String!';
        }
        if(ObjectID.isValid(id)){
            id = new ObjectID(id);
        }
        else{
            throw 'Id is invalid!(in data/patient.delpaient)'
        }
    }

    const patientCollections = await patient();
    const target = await this.getEvent(id);

    const delinfo = await patientCollections.removeOne({ _id: id });
    if(delinfo.deletedCount === 0) throw 'Can not delete id: ' + id;

    return target;
}

async function update() {
    if(id === undefined){
        throw 'input is empty';
    }
    if(id.constructor != ObjectID){
        if(id.constructor != String){
            throw 'Id is not a String!';
        }
        if(ObjectID.isValid(id)){
            id = new ObjectID(id);
        }
        else{
            throw 'Id is invalid!(in data/patient.updatepatient)'
        }
    }

    const patientCollections = await users();
    const target = await this.getEvent(id);
    let changePWD = true;

    if(data.email == "" || data.email === undefined){
        data.email = target.email;
    }
    if(data.lname == "" || data.lname === undefined){
        data.lname = target.lname;
    }
    if(data.fname == "" || data.fname === undefined){
        data.fname = target.fname;
    }
    if(data.gender == "" || data.gender === undefined){
        data.gender = target.gender;
    }
    if(data.dob == "" || data.dob === undefined){
        data.dob = target.dob;
    }
    if(data.password == "" || data.password === undefined){
        data.password = target.password;
        changePWD = false;
    }

    if (changePWD) {
        data.password = await bcrypt.hash(data.password, saltRounds);
    }

    let updatedata = {
        $set:{
            _id: id,
            username: data.email,
            email: data.email,
            gender: data.gender,
            dob: data.dob,
            fname: data.fname,
            lname: data.lname,
            password: data.password
        }
    }

    const updateinfo = await patientCollections.updateOne({ _id: id } , updatedata);
    return await this.getEvent(id);
}

module.exports = {
    getEvent,
    getAll,
    getUserByUsername,
    createEvent,
    getEventsOfCategory,
    getEventsOfCategories,
    cats
};