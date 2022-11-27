import { gql } from "@apollo/client";

export const CONTINENT_QUERY = gql`
  query ContinentQuery {
    continents {
      code
      name
    }
  }
`;

// query github trending repos for react native graphql

//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 

export const REPO_QUERY = gql`
  query RepoQuery {
    search(query: "trending ", type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            name
            description
          }
        }
      }
    }
  }
`;

// grapgql query with authentication token for github api
