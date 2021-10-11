const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')

const store =  {
  users: {
  }
}
// const level = require('level')
// const db = level(__dirname + '/../db')

module.exports = {
  users: {
    create: async (user) => {
      if(!user.username) throw Error('Invalid user')
      id = uuid()
      store.users[id] = user
      // await db.put(`users:${id}`, JSON.stringify(user))
      return merge(user, {id: id})
    },
    list: async () => {
      return Object.keys(store.users).map( (id) => {
        const user = clone(store.users[id])
        user.id = id
        return user
      })
      // return new Promise( (resolve, reject) => {
      //   const users = []
      //   db.createReadStream({
      //     gt: "users:",
      //     lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
      //   }).on( 'data', ({key, value}) => {
      //     user = JSON.parse(value)
      //     user.id = key.split(':')[1]
      //     users.push(user)
      //   }).on( 'error', (err) => {
      //     reject(err)
      //   }).on( 'end', () => {
      //     resolve(users)
      //   })
      // })
    },
    update: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      store.users[id] = merge(original, user)
    },
    delete: (id, user) => {
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id]
    }
  },
  admin: {
    clear: async () => {
      store.users = {}
      // await db.clear()
    }
  }
}