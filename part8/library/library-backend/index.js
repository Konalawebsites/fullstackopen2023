const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require('graphql');
const uuid = require('uuid')

let authors = [
  {
    name: 'Robert Martin',
    id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
    born: 1952,
  },
  {
    name: 'Martin Fowler',
    id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
    born: 1963
  }
]
let books = [
  {
    title: 'Refactoring, edition 2',
    published: 2018,
    author: 'Martin Fowler',
    id: "afa5de00-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring']
  },
  {
    title: 'Refactoring to patterns',
    published: 2008,
    author: 'Joshua Kerievsky',
    id: "afa5de01-344d-11e9-a414-719c6709cf3e",
    genres: ['refactoring', 'patterns']
  }
]

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Book = require('./models/book')
const Author = require('./models/author')
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
type Query {
  bookCount: Int!
  authorCount: Int!
  allBooks(author:String, genre:String): [Book!]!
  allAuthors: [Author!]!
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
      await Author.find({})
  },
  Author: {
    bookCount: async (root, args) => {
      const authorsBooks = await Book.find({ author: root._id.toString() })
        .populate('author')
      return authorsBooks.length
    }
  },

  Mutation: {
    addBook: async (root, args,) => {

      let author = await Author.findOne({ name: args.author });

      // if author not existing , create new author// 
      try {
        if (!author) {
          const newAuthor = new Author({ name: args.author, id: uuid.v4(), born: null })
          await newAuthor.save()
          author = newAuthor
        }
      }
      catch (error) {
        throw new GraphQLError(error)
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
        throw new GraphQLError(error)
      }
    },

    editAuthor: async (root, args,) => {
      console.log(args)
      const searchableName = args.name

      const updatedAuthors = authors.map(author => {
        if (author.name === searchableName)
          return { ...author, born: args.setBornTo }
        return author
      }
      )
      authors = updatedAuthors
      return authors.find(author => author.name === searchableName) || null
    }
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
