const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  GraphQLNonNull,
  GraphQLEnumType,
} = require("graphql");

const API_HOSTNAME = "http://localhost:3000";

const SignType = new GraphQLObjectType({
  name: "Sign",
  fields: {
    id: { type: GraphQLString },
    content: { type: GraphQLString },
    nickname: { type: GraphQLString },
    country: { type: GraphQLString },
    created_at: { type: GraphQLString },
  },
});

const query = new GraphQLObjectType({
  name: "Query",
  fields: {
    signs: {
      type: new GraphQLList(SignType),
      resolve(parentValue, args) {
        return axios.get(`${API_HOSTNAME}/signs`).then((res) => res.data);
      },
    },
  },
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addSign: {
      type: SignType,
      args: {
        // id: { type: new GraphQLNonNull(GraphQLString) },
        nickname: { type: new GraphQLNonNull(GraphQLString) },
        content: { type: new GraphQLNonNull(GraphQLString) },
        country: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        const created_at = new Date().toISOString();

        return axios
          .post(`${API_HOSTNAME}/signs`, {
            id: args.id,
            nickname: args.nickname,
            content: args.content,
            country: args.country,
            created_at: created_at,
          })
          .then((res) => res.data)
          .catch((e) => console.log(e));
      },
    },
    deleteSign: {
      type: SignType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
      },
      resolve(parentValue, args) {
        return axios.delete(`${API_HOSTNAME}/signs/${args.id}`);
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query,
  mutation,
});
