import { gql } from "@apollo/client";

export const DATA_UPDATE_SUBSCRIPTION = gql`
  subscription OnDataUpdate {
    dataUpdate {
      method
      decoded {
        amount0Out
      }
      transaction_hash
      block_timestamp
    }
  }
`;
