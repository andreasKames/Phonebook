const express = require('express')
const app = express()
app.use(express.json())
var morgan = require('morgan')
const cors = require('cors')

app.use(cors())
let persons =
[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    } 
]

const generateRandomId = () => {
  const maxId = 10000
  return String(Math.floor(Math.random() * maxId)+1)
}

const now = new Date();
const options = {
    
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  timeZone: 'Europe/Berlin', // <-- Hier wird die Zeitzone festgelegt
  timeZoneName: 'short' // Optional: Fügt den Zeitzonennamen hinzu (z.B. EST/EDT)
};

const maxId = () => {
  const maxId = persons.length > 0
    ? Math.max(...persons.map(n => Number(n.id)))
    : 0
    console.log(`Anzahl der Personen: ${maxId}`)
  return String(maxId)
}

let info =
`Phonebook has info for ${maxId()} people.\n${now.toLocaleString('de-De', options)}`

morgan('tiny')

/*
const app = http.createServer((request, response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' })
  response.end(JSON.stringify(persons))
});
*/
app.get('/api/persons', (request, response) => {
  response.json(persons)
});

app.get('/info', (request, response) => {
  response.end(info)
});


app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)
  
  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({ 
      error: 'name or number missing' 
    })
  }
  const filteredPerson = persons.find(person =>person.name === body.name)
 
  if (filteredPerson !== undefined){
        return response.status(400).json({
            error: 'Name is already in the phonebook'
    })
   }

  const person = {
    name: body.name,
    number: body.number,
    id: generateRandomId(),
  }
  persons = persons.concat(person)
  response.json(person)
})

const PORT = process.env.PORT || 3001
app.listen(PORT)
console.log(`Server running on Port ${PORT}.`)