const mongoose =  require('mongoose') ;
mongoose.connect('mongodb://localhost:27017/CrudDB', (err)=> {
    if (!err)
        console.log('connection succeded') ;
    else 
        console.log('connection error:' + JSON.stringify(err , undefined , 2)) ;
}) ;
  
module.exports = mongoose ;