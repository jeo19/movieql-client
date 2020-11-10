import React from 'react';
import { useParams } from 'react-router-dom';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';

const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      medium_cover_image
    }
  }
`;
// eslint-disable-next-line consistent-return
export default () => {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    // eslint-disable-next-line radix
    variables: { id: parseInt(id) },
  });
  if (loading) {
    return 'loading';
  }
  if (data && data.movie) {
    return data.movie.title;
  }
};
