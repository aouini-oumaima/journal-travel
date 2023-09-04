const mysql= require("mysql2")

const connection=mysql.createConnection({host:"localhost",
host: 'localhost',
user: 'root',
password: 'root',
database: 'experience'
})


connection.connect((err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log('database travel connected');
    }
})
module.exports=connection




