const  Role =require("../models/Role") 


exports.createRoles=async()=>{
    try {
        const count=await Role.estimatedDocumentCount();
        if(count > 0) return;

        const values=await Promise.all([
            new Role({name:"estudiante"}).save(),
            new Role({name:"ofertador"}).save(),
            new Role({name:"admin"}).save(),
        ]);

        console.log(values);
    } catch (error) {
      console.error(error);
    }
  };