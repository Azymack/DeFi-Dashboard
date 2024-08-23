// "use client";
// import { useQuery, useSubscription } from "@apollo/client";
// import { ExternalLinkIcon, MoveIcon, WidthIcon } from "@radix-ui/react-icons";
// import { Badge } from "@radix-ui/themes";
// import clsx from "clsx";
// import { DATA_UPDATE_SUBSCRIPTION } from "../../gql/subscriptions";
// import { GET_LAST_ACTIVITIES } from "../../gql/queries";
// import { useEffect, useState } from "react";

// // Define TypeScript interfaces for GraphQL responses
// interface Activity {
//   id: string;
//   method: "swap" | "move"; // Adjust based on possible methods
//   block_timestamp: string | number;
//   decoded: {
//     amount0Out: number;
//   };
//   transaction_hash: string;
// }

// interface LastActivitiesResponse {
//   lastActivities: {
//     rows: Activity[];
//   };
// }

// interface DataUpdateResponse {
//   dataUpdate: Activity;
// }

// export default function LastActivities() {
//   const [lastActivities, setLastActivities] = useState<Activity[]>([]);
//   const [isDataUpdated, setIsDataUpdated] = useState<Boolean>(false);
//   useQuery<LastActivitiesResponse>(GET_LAST_ACTIVITIES, {
//     onCompleted(data) {
//       console.log("fetched last activities");
//       if (data?.lastActivities?.rows) {
//         setLastActivities(data.lastActivities.rows);
//       }
//     },
//   });

//   // Subscription to listen for real-time updates
//   useSubscription<DataUpdateResponse>(DATA_UPDATE_SUBSCRIPTION, {
//     onData({ data }) {
//       if (data.loading || data.error || !data.data?.dataUpdate) return;
//       setLastActivities(
//         [data.data.dataUpdate, ...lastActivities].slice(
//           0,
//           lastActivities.length
//         )
//       );
//       setIsDataUpdated(true);
//       setTimeout(() => {
//         setIsDataUpdated(false);
//       }, 1000);
//     },
//   });

//   return (
//     <div className="container flex flex-col p-4 md:p-0">
//       <div className="dark:text-dark-secondary text-sm">Last Activities</div>
//       <div className="mt-3 overflow-x-auto rounded-content">
//         <table className="w-full text-left rtl:text-right min-w-[800px]">
//           <thead className="text-xxs dark:bg-dark-elevation-3 dark:text-dark-secondary">
//             <tr className="border-b-2 dark:border-dark-elevation">
//               <th scope="col" className="px-6 py-3">
//                 Activities
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Points
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 Date
//               </th>
//               <th scope="col" className="px-6 py-3">
//                 TXID
//               </th>
//             </tr>
//           </thead>
//           <tbody className="w-full">
//             {lastActivities.length > 0 &&
//               lastActivities.map((tx, index) => {
//                 console.log(tx.block_timestamp);
//                 const time = new Date(
//                   !!Number(tx.block_timestamp)
//                     ? Number(tx.block_timestamp)
//                     : tx.block_timestamp
//                 );

//                 return (
//                   <tr
//                     key={tx.transaction_hash}
//                     className={clsx(
//                       "border-b-2 dark:border-dark-elevation dark:bg-dark-elevation-1 w-full transition-all duration-500 ease-in-out",
//                       {
//                         "dark:bg-dark-elevation-2": index % 2 !== 0,
//                       },
//                       {
//                         "dark:bg-dark-secondary-100":
//                           index == 0 && isDataUpdated,
//                       }
//                     )}
//                   >
//                     <td className="px-6 py-5 text-xs md:w-1/4">
//                       <div className="flex items-center">
//                         <span className="mr-1">
//                           {tx.method === "swap" ? <WidthIcon /> : <MoveIcon />}
//                         </span>
//                         <span>{tx.method}</span>
//                       </div>
//                     </td>
//                     <td className="px-6 py-5 text-xxs md:w-1/4">
//                       <Badge
//                         variant="soft"
//                         className="dark:bg-dark-success-1 text-dark-success py-1 px-2 rounded-corner"
//                       >
//                         +{tx.decoded.amount0Out}
//                       </Badge>
//                     </td>
//                     <td className="px-6 py-5 dark:text-dark-secondary md:w-1/4">
//                       <span className="text-xs">
//                         {`${time.getDate()}.${
//                           time.getMonth() + 1
//                         }.${time.getFullYear()} `}
//                       </span>
//                       <Badge
//                         variant="soft"
//                         className="dark:bg-dark-secondary-50 py-1 px-2 text-xxs rounded-corner"
//                       >
//                         {`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}
//                       </Badge>
//                     </td>
//                     <td className="px-6 py-5 dark:text-dark-secondary text-xs md:w-1/4">
//                       <div className="flex justify-between">
//                         <span>
//                           <span className="mr-2">
//                             {`${tx.transaction_hash.slice(
//                               0,
//                               5
//                             )}...${tx.transaction_hash.slice(-4)}`}
//                           </span>
//                           <Badge
//                             variant="soft"
//                             className="dark:bg-dark-secondary-50 py-1 px-2 text-xxs rounded-corner"
//                           >
//                             <button>Copy</button>
//                           </Badge>
//                         </span>
//                         <button>
//                           <ExternalLinkIcon />
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

"use client";
import { useQuery, useSubscription } from "@apollo/client";
import { ExternalLinkIcon, MoveIcon, WidthIcon } from "@radix-ui/react-icons";
import { Badge } from "@radix-ui/themes";
import clsx from "clsx";
import { DATA_UPDATE_SUBSCRIPTION } from "../../gql/subscriptions";
import { GET_LAST_ACTIVITIES } from "../../gql/queries";
import { useEffect, useState } from "react";
import Skeleton from "../utils/Skeleton";

// Define TypeScript interfaces for GraphQL responses
interface Activity {
  id: string;
  method: "swap" | "move";
  block_timestamp: string | number;
  decoded: {
    amount0Out: number;
  };
  transaction_hash: string;
}

interface LastActivitiesResponse {
  lastActivities: {
    rows: Activity[];
  };
}

interface DataUpdateResponse {
  dataUpdate: Activity;
}

export default function LastActivities() {
  const [lastActivities, setLastActivities] = useState<Activity[]>([]);
  const [isDataUpdated, setIsDataUpdated] = useState<boolean>(false);
  const { loading } = useQuery<LastActivitiesResponse>(GET_LAST_ACTIVITIES, {
    onCompleted(data) {
      console.log("fetched last activities");
      if (data?.lastActivities?.rows) {
        setLastActivities(data.lastActivities.rows);
      }
    },
  });

  // Subscription to listen for real-time updates
  useSubscription<DataUpdateResponse>(DATA_UPDATE_SUBSCRIPTION, {
    onData({ data }) {
      if (data.loading || data.error || !data.data?.dataUpdate) return;
      setLastActivities(
        [data.data.dataUpdate, ...lastActivities].slice(
          0,
          lastActivities.length
        )
      );
      setIsDataUpdated(true);
      setTimeout(() => {
        setIsDataUpdated(false);
      }, 1000);
    },
  });

  return (
    <div className="container flex flex-col p-4 md:p-0">
      <div className="dark:text-dark-secondary text-sm">Last Activities</div>
      <div className="mt-3 overflow-x-auto rounded-content">
        <table className="w-full text-left rtl:text-right min-w-[800px]">
          <thead className="text-xxs dark:bg-dark-elevation-3 dark:text-dark-secondary">
            <tr className="border-b-2 dark:border-dark-elevation">
              <th scope="col" className="px-6 py-3">
                Activities
              </th>
              <th scope="col" className="px-6 py-3">
                Points
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                TXID
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {loading
              ? Array.from({ length: 6 }).map((_, index) => (
                  <tr
                    className="border-b-2 dark:border-dark-elevation dark:bg-dark-elevation-1"
                    key={index}
                  >
                    <td className="px-6 py-6 text-xs md:w-1/4">
                      <Skeleton width="25%" height="10px" />
                    </td>
                    <td className="px-6 py-6 text-xxs md:w-1/4">
                      <Skeleton width="25%" height="10px" />
                    </td>
                    <td className="px-6 py-6 dark:text-dark-secondary md:w-1/4">
                      <Skeleton width="50%" height="10px" />
                    </td>
                    <td className="px-6 py-6 dark:text-dark-secondary text-xs md:w-1/4">
                      <Skeleton width="50%" height="10px" />
                    </td>
                  </tr>
                )) // Adjust number of skeleton loaders as needed
              : lastActivities.length > 0 &&
                lastActivities.map((tx, index) => {
                  console.log(tx.block_timestamp);
                  const time = new Date(
                    !!Number(tx.block_timestamp)
                      ? Number(tx.block_timestamp)
                      : tx.block_timestamp
                  );

                  return (
                    <tr
                      key={tx.transaction_hash}
                      className={clsx(
                        "border-b-2 dark:border-dark-elevation dark:bg-dark-elevation-1 w-full transition-all duration-500 ease-in-out",
                        {
                          "dark:bg-dark-elevation-2": index % 2 !== 0,
                        },
                        {
                          "dark:bg-dark-secondary-100":
                            index == 0 && isDataUpdated,
                        }
                      )}
                    >
                      <td className="px-6 py-5 text-xs md:w-1/4">
                        <div className="flex items-center">
                          <span className="mr-1">
                            {tx.method === "swap" ? (
                              <WidthIcon />
                            ) : (
                              <MoveIcon />
                            )}
                          </span>
                          <span>{tx.method}</span>
                        </div>
                      </td>
                      <td className="px-6 py-5 text-xxs md:w-1/4">
                        <Badge
                          variant="soft"
                          className="dark:bg-dark-success-1 text-dark-success py-1 px-2 rounded-corner"
                        >
                          +{tx.decoded.amount0Out}
                        </Badge>
                      </td>
                      <td className="px-6 py-5 dark:text-dark-secondary md:w-1/4">
                        <span className="text-xs">
                          {`${time.getDate()}.${
                            time.getMonth() + 1
                          }.${time.getFullYear()} `}
                        </span>
                        <Badge
                          variant="soft"
                          className="dark:bg-dark-secondary-50 py-1 px-2 text-xxs rounded-corner"
                        >
                          {`${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`}
                        </Badge>
                      </td>
                      <td className="px-6 py-5 dark:text-dark-secondary text-xs md:w-1/4">
                        <div className="flex justify-between">
                          <span>
                            <span className="mr-2">
                              {`${tx.transaction_hash.slice(
                                0,
                                5
                              )}...${tx.transaction_hash.slice(-4)}`}
                            </span>
                            <Badge
                              variant="soft"
                              className="dark:bg-dark-secondary-50 py-1 px-2 text-xxs rounded-corner"
                            >
                              <button>Copy</button>
                            </Badge>
                          </span>
                          <button>
                            <ExternalLinkIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
