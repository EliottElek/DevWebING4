const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')

const store =  {
  channels: {
    messages:{
      
    }
  }
}
// const level = require('level')
// const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      id = uuid()
      store.channels[id] = channel
      // await db.put(`channels:${id}`, JSON.stringify(channel))
      return merge(channel, {id: id})
    },
    list: async () => {
      return Object.keys(store.channels).map( (id) => {
        const channel = clone(store.channels[id])
        channel.id = id
        return channel
      })
      // return new Promise( (resolve, reject) => {
      //   const channels = []
      //   db.createReadStream({
      //     gt: "channels:",
      //     lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
      //   }).on( 'data', ({key, value}) => {
      //     channel = JSON.parse(value)
      //     channel.id = key.split(':')[1]
      //     channels.push(channel)
      //   }).on( 'error', (err) => {
      //     reject(err)
      //   }).on( 'end', () => {
      //     resolve(channels)
      //   })
      // })
    },
    update: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      store.channels[id] = merge(original, channel)
    },
    delete: (id, channel) => {
      const original = store.channels[id]
      if(!original) throw Error('Unregistered channel id')
      delete store.channels[id]
    },
    messages: {
      create: async (message, channelId) => {
        if(!message.name && !message.content) throw Error('Invalid message')
        id = uuid()
        store.channels[channelId].messages = message
        // await db.put(`messages:${id}`, JSON.stringify(message))
        return merge(message, {id: id})
      },
      list: async (id) => {
        return Object.keys(store.channels[id].messages).map( (idMessage) => {
          const message = clone(store.channels[id].messages[idMessage])
          message.id = id
          return message
        })
        // return new Promise( (resolve, reject) => {
        //   const messages = []
        //   db.createReadStream({
        //     gt: "messages:",
        //     lte: "messages" + String.fromCharCode(":".charCodeAt(0) + 1),
        //   }).on( 'data', ({key, value}) => {
        //     message = JSON.parse(value)
        //     message.id = key.split(':')[1]
        //     messages.push(message)
        //   }).on( 'error', (err) => {
        //     reject(err)
        //   }).on( 'end', () => {
        //     resolve(messages)
        //   })
        // })
      },
      update: (id, message) => {
        const original = store.messages[id]
        if(!original) throw Error('Unregistered message id')
        store.messages[id] = merge(original, message)
      },
      delete: (id, message) => {
        const original = store.messages[id]
        if(!original) throw Error('Unregistered message id')
        delete store.messages[id]
      }
    },
  },
 
  admin: {
    clear: async () => {
      store.channels = {}
      // await db.clear()
    }
  }
}