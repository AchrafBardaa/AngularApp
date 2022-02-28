const express = require('express');
var  {Employee} = require('../modeles/employee');
var router = express.Router() ;
var ObjectID = require('mongoose').Types.ObjectId ;

//=> localhost: 3000/employees/
//get les employees 
router.get('/', (req,res) => {
    Employee.find((err,docs) => {
        if (!err) { res.send(docs) ; }
        else {console.log('error in Retriving Emplyees :'+ JSON.stringify(err , undefined , 2 )) ;}

    }) ;
}) ;
//get By Id
router.get('/:id', (req,res) => {
    if (!ObjectID.isValid(req.params.id))
        return res.status(400).send('No record with given id ' + req.params.id ) ;

    Employee.findById(req.params.id, (err, doc)=> {
        if (!err) {res.send(doc); }
        else {console.log('error in retriving Employee :' + JSON.stringify(err , undefined , 2))}
    }) ;

    
}) ;

//l'ajout 
router.post('/', (req , res) => {
    var emp = new Employee ({
        name: req.body.name ,
        position: req.body.position ,
        office: req.body.office ,
        salary: req.body.salary ,
    } ) ;
    emp.save((err,doc)=> {
        if (!err) {res.send(doc);}
    else 
         {console.log('Error in Employee Save : '+ JSON.stringify(err , undefined , 2 )) ;}
 }) ;
});

router.put('/:id' , (req,res)=> {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('No record with given id ' + req.params.id ) ;
    var emp = {
        name: req.body.name ,
        position: req.body.position ,
        office: req.body.office ,
        salary: req.body.salary ,
    }  ;
    Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err,doc)=> {
        if (!err) {res.send(doc);}
        else 
             {console.log('Error in Employee Update : '+ JSON.stringify(err , undefined , 2 )) ;
    }}) ; 
});

router.delete('/:id' , (req,res)=> {
    if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('No record with given id ' + req.params.id ) ;
    
        Employee.findByIdAndRemove(req.params.id, (err,doc)=> {
            if (!err) {res.send(doc);}
            else 
                 {console.log('Error in Employee delete : '+ JSON.stringify(err , undefined , 2 )) ;
        }}) ;
    });

module.exports = router ;