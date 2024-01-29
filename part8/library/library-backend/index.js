require('dotenv').config()
const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql');
const uuid = require('uuid')
const jwt = require('jsonwebtoken')

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const password = process.argv[2]
require('dotenv').config()

const url = `mongodb+srv://part8:${password}@cluster1.obc9ysp.mongodb.net/?retryWrites=true&w=majority`

console.log('connecting to', url)

mongoose.connect(url)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

/*
  you can remove the placeholder query once your first one has been implemented 
*/

const typeDefs = `
type Book {
  title: String!
  published: Int!
  author: Author!
  id: ID!
  genres: [String!]!
}
type Author {
  name: String
  id: ID!
  born: Int
  bookCount: Int
}

type User {
  username: String!
  favoriteGenre: String!
  id: ID!
}
type Token {
  value: String!
}

type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author:String, genre:String): [Book!]!
  allAuthors: [Author!]!
  me: User
}

type Mutation {
  addBook(
    title: String!
    author: String!
    published: Int!
    genres: [String!]!
    id: ID
  ): Book

  editAuthor(
    name: String!
    setBornTo: Int!
  ): Author

  createUser(
    username: String!
    favoriteGenre: String
  ): User

  login(
    username: String!
    password: String!
  ): Token
}
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),

    authorCount: async () => Author.collection.countDocuments(),

    allBooks: async (root, { author, genre }) => {

      try {
        const books = await Book.find({}).populate('author')

        const filteredBooks = books.filter((book) => {
          return (!author || book.author.name === author) &&
            (!genre || book.genres.includes(genre))
        })

        return filteredBooks

      }
      catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Failed to fetch books');
      }
    },

    allAuthors: async () =>
      await Author.find({}),

    me: (root, args, context) => {
      console.log(context)
      return context.currentUser
    }
  },
  Author: {
    bookCount: async (root, args) => {
      const authorsBooks = await Book.find({ author: root._id.toString() })
        .populate('author')
      return authorsBooks.length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {

      const currentUser = context.currentUser
      console.log('context', context)
      if (!currentUser) {
        throw new GraphQLError('user is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 }
          }
        })
      }

      let author = await Author.findOne({ name: args.author });

      // if author not existing , create new author // 
      try {
        if (!author) {
          const newAuthor = new Author({ name: args.author, id: uuid.v4(), born: null })
          await newAuthor.save()
          author = newAuthor
        }
      }
      catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: 'GRAPHQL_VALIDATION_FAILED',
            invalidArgs: args.author, error
          }
        })
      }

      // create book // 
      try {
        const newBook = new Book({
          ...args,
          author: author
        })
        return await newBook.save()
      }
      catch (error) {
        throw new GraphQLError(error, {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title, error
          }
        })
      }
    },

    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('user is not authenticated', {
          extensions: {
            code: 'UNAUTHENTICATED',
            http: { status: 401 }
          }
        })
      }
      const author = await Author.findOne({ name: args.name })
      try {
        author.born = args.setBornTo
        await author.save()
      }
      catch (error) {
        throw new GraphQLError('Setting authors born date failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.name,
            error
          }
        })
      }
      return author
    },

    createUser: async (root, args) => {

      const user = new User({ username: args.username })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'secret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
  context: async ({ req, res }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.startsWith('Bearer ')) {
      const decodedToken = jwt.verify(
        auth.substring(7), process.env.JWT_SECRET
      )
      const currentUser = await User
        .findById(decodedToken.id)
      return { currentUser }
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})