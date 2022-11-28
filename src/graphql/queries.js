import { gql } from '@apollo/client';

import { REPOSITORY_DETAILS, REVIEW_DETAILS } from './fragments';

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
    $after: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
      after: $after
      first: 8
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
  ${REPOSITORY_DETAILS}
`;

export const ME = gql`
  query Me($includeReviews: Boolean = false, $after: String) {
    me {
      id
      username
      reviews(first: 6, after: $after) @include(if: $includeReviews) {
        totalCount
        edges {
          node {
            ...ReviewDetails
            repositoryId
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REVIEW_DETAILS}
`;

export const GET_REPOSITORY = gql`
  query ($rid: ID!, $after: String) {
    repository(id: $rid) {
      ...RepositoryDetails
      url
      reviews(first: 5, after: $after) {
        totalCount
        edges {
          node {
            ...ReviewDetails
          }
          cursor
        }
        pageInfo {
          endCursor
          startCursor
          hasNextPage
        }
      }
    }
  }
  ${REPOSITORY_DETAILS}
  ${REVIEW_DETAILS}
`;
