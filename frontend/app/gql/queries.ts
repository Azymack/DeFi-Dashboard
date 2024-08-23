import { gql } from "@apollo/client";

export const GET_LAST_ACTIVITIES = gql`
  query GetLastActivities {
    lastActivities {
      rows {
        method
        decoded {
          amount0Out
        }
        transaction_hash
        block_timestamp
      }
    }
  }
`;
