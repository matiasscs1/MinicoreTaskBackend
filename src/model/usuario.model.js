import mongose from 'mongoose';

const userSchema = new  mongose.Schema({
    nombre:{
        type: String,
        required: true
    },
    apellido:{
        type: String,
        required: true
    },
    
});
export default mongose.model('User', userSchema);
