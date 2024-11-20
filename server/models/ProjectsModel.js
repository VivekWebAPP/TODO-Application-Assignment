import mongoose from "mongoose";

const ProjectModel = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    creationDate: {
        type: Date,
        require:true,
    },
    creationTime:{
        type:String,
        require:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    }
},{ timestamps: true });

const Project = mongoose.model('project',ProjectModel);

export default Project;