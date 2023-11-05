const mongoose = require("mongoose")


const connectionDB = async()=>{
    const conn = await mongoose.connect(process.env.databaseUrl)
    console.log(`successfully connected to database:${conn.connection.host}`)
}

module.exports = connectionDB