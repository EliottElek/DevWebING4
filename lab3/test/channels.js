
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/dbChannels')

describe('test channels', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  it('should return an empty list', async () => {
    // Return an empty channel list by default
    const {body: channels} = await supertest(app)
    .get('/channels')
    .expect(200)
    channels.should.eql([], "la liste n'est pas vide.")
  })
  
  it('should return one list one element', async () => {
    // Create a channel
    await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Ensure we list the channels correctly
    const {body: channels} = await supertest(app)
    .get('/channels')
    .expect(200)
    channels.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      // id: /^channels:\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1'
    }], "la liste n'a pas retourné l'élement : {id, name : channel 1}.")
  })
  
  it('should add one element', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    .expect(201)
    // Check its return value
    channel.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1'
    })
    // Check it was correctly inserted
    const {body: channels} = await supertest(app)
    .get('/channels')
    channels.length.should.eql(1)
  })
  
})
