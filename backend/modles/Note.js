import mongoose from "mongoose";

//1. create a schema meance structure.....
//2. modle based on the schema ...

const noteSchema= new mongoose.Schema({

    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    }
},

{
    timestamps:true//created at updated at
});

const Note=mongoose.model("Note",noteSchema);

export default Note;