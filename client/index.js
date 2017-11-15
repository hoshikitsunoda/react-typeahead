const { MongoClient } = require('mongodb')
const url = 'mongodb://localhost/typeahead'
const express = require('express')
const app = express()

MongoClient.connect(url, (err, db) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }

  const typeaheadData = db.collection('typeaheadData')

  app.use(express.static('./server/public'))

  app.get('/typeaheadData', (req, res) => {
    typeaheadData
      .find({}, { _id: 0 })
      .toArray()
      .then(response => res.send(response))
      .catch(err => console.error(err))
  })
  app.listen('3000', () => console.log('listening on port 3000...'))
})
