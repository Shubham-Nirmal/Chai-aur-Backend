import mongoose,{ Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';


const videoSchema = new Schema({
    videofile:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
     description:{
         type:String,
         default:'',

     },
     duration:{
         type:Number,
         required:true,
     },
     views:{
         type:Number,
         default:0,
     },
     isPublished:{
         type:Boolean,
         default:false,
     },
     owener:{

     },
},
{
    timestamps:true
}
);

videoSchema.plugin(mongooseAggregatePaginate);

export default mongoose.model('Video',videoSchema);