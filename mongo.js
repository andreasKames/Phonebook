const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://andi:${password}@cluster0.s89twoo.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`
const url1 = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
const url2 = `mongodb+srv://fullstack:${password}@cluster0.a5qfl.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', noteSchema)

const contact = new Contact({
  name: process.argv[3],
  number: process.argv[4],
})
if (process.argv.length<4){
    console.log("Phonebook:")
    Contact.find({}).then(result => {
        result.forEach(contact => {
        console.log(`${contact.name} ${contact.number}`)
    })
    mongoose.connection.close()
})
}else{
    contact.save().then(result => {
        console.log('note saved!')
        console.log(`added ${contact.name} number ${contact.number} to phonebook`)
        mongoose.connection.close()
        
    })
}


