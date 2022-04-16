import  mongoose  from 'mongoose';
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import products from './Data/ProductsSample.js';
import users from './Data/userSample.js'
import Product from './Models/ProductModel.js'
import User from './Models/userModel.js'

dotenv.config()

connectDB()

const importData = async() =>{
    try {
     
        await Product.deleteMany()
        await User.deleteMany()
    
        const createdUsers = await User.insertMany(users)
    
        const adminUser = createdUsers[0]._id
    
        const sampleProducts = products.map((product) => {
          return { ...product, user: adminUser }
        })
    
      
        await Product.insertMany(sampleProducts)
    } catch (error) {
        console.error(error)
        process.exit(1)
        
    }
}
const destroyData = async() =>{
    try {
   
        await Product.deleteMany()
        process.exit(1)
    } catch (error) {
        console.error(error)
        process.exit(1)
        
    }
}

if(process.argv[2]==='-d'){
    destroyData()

}else{
    importData()
}