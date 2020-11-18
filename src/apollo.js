import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
  resolvers: {
    Movie: {
      isLiked: () => false,
    },
    Mutation: {
      toggleLikeMovie: (_, { id, isLiked }, { cache }) => {
        cache.modify({
          id: `${id}`,
          query: gql`
            {
              movies(limit: 20, rating: 8) {
                id
                medium_cover_image
                isLiked @client
              }
            }
          `,
          data: {
            isLiked: !isLiked,
          },
        });
      },
    },
  },
});
export default client;
