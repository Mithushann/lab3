// import { gql } from "@apollo/client";

 // get most starred repos in the last 30 days

// export const REPO_QUERY = gql `
// {
//   search(query: "stars:>1000000 language:TypeScript ", type: REPOSITORY, first: 100) {
//     edges {
//       node {
//         ... on Repository {
//           id
//           name
//           description
//           url
//           stars: stargazerCount
//           createdAt
//           primaryLanguage {
//             color
//             id
//             name
//           }
//           forkCount
//           nameWithOwner
//           repositoryTopics(first: 10) {
//             edges {
//               node {
//                 topic {
//                   name
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// }

//   `;
//latest
// {
//   search(query: "stars:>100000", type: REPOSITORY, first: 100, ) {
//     edges {
//       node {
//         ... on Repository {
//           name
//           description
//           url
//           stars: stargazerCount
//           createdAt
//           primaryLanguage {
//             name
//           }
//           forkCount
//         }
//       }
//     }
//   }
// }


  // query {  
  //   search(query: "stars:>100000", type: REPOSITORY, first: 100) { 
  //     edges {
  //       node {
  //         ... on Repository {
  //           name
  //           description
  //           url
  //           stars: stargazerCount
            
  //         }
  //       }
  //     }
  //   }
  // }	


  // query {
  //   search(query: "stars", type: REPOSITORY, first: 10) {
  //     edges {
  //       node {
  //         ... on Repository {
  //           name
  //           description
  //           url
  //         }
  //       }
  //     }
  //   }
  // }

// most starred repos in the last 5 days 
// query {  
//   search(query: "stars:>1", type: REPOSITORY, first: 10) { 
//     edges {
//       node {
//         ... on Repository {
//           name
//           description
//           url
//         }
//       }
//     }
//   }
// }

