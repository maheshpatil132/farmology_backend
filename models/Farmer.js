const mongoose = require('mongoose');

const FarmerModel = mongoose.Schema({
    name:{
        type:String,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    mobile:{
        type:Number,
        length:10,
        required:true
    },
    role:{
        type:String,
        default:'farmer'
    },
    pincode:{
        type:String,
        required:true
    },
    village: {
        type:String,
        required:true
    }
})


FarmerModel.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
    this.password = await bcrypt.hash(this.password, 10)
  })
  
  // generate the token
  FarmerModel.methods.generateToken = function () {
    const token = jwt.sign({ id: this._id , role:this.role}, process.env.JWT_SECRET_KEY)
    return token
  }
  
  // compare the password
  FarmerModel.methods.comparePassword = function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
  }
  
  //resetpassword token generate
  FarmerModel.methods.getresetToken = function () {
    const resettoken = crypto.randomBytes(20).toString('hex')
    this.resetpasswordToken = crypto.createHash('sha256')
      .update(resettoken)
      .digest('hex');
    this.resetPasswordExpires = Date.now() + 15 * 60 * 1000
    return resettoken
  }
  





module.exports = mongoose.model('farmer',FarmerModel)