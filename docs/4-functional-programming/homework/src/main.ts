import {
  Either,
  fromPromise,
  ap,
  right,
  left,
  getOrElse,
  flatten,
} from "./fp/either";
import { pipe } from "./fp/utils";
import { fetchClient, fetchExecutor } from "./fetching";
import { ClientUser, ExecutorUser, Demand, Point } from "./types";
import { Maybe, isSome } from "./fp/maybe";
import { fromNullable } from "./fp/maybe";
import { fromCompare, ordNumber } from "./fp/ord";
import { sort } from "./fp/array";

type Response<R> = Promise<Either<string, R>>;

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => {
  const toMaybeDemand = (arr: Array<Demand>): Maybe<Array<Demand>> =>
    fromNullable(arr);
  const clientsPromise = fetchClient().then((clients) => {
    return clients.map((client) => {
      return { ...client, demands: toMaybeDemand(client.demands) };
    });
  });
  return fromPromise(clientsPromise);
};

export enum SortBy {
  distance = "distance",
  reward = "reward",
}

const getDistance = (point1: Point, point2: Point) => {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.round(Math.sqrt(dx * dx + dy * dy) * 1000) / 1000;
};

export const show =
  (sortBy: SortBy) =>
  (clients: Array<ClientUser>) =>
  (executor: ExecutorUser): Either<string, string> => {
    const clientsFilteredByDemand = clients.filter((client) => {
      return isSome(client.demands)
        ? client.demands.value.some((demand) =>
            executor.possibilities.includes(demand)
          )
        : client;
    });

    const clientSordOrd =
      sortBy === SortBy.reward
        ? fromCompare((client2: ClientUser, client1: ClientUser) =>
            ordNumber.compare(client1[sortBy], client2[sortBy])
          )
        : fromCompare((client2: ClientUser, client1: ClientUser) => {
            return ordNumber.compare(
              getDistance(client2.position, executor.position),
              getDistance(client1.position, executor.position)
            );
          });

    const getFullMessage = (
      sortedClients: Array<ClientUser>,
      clients: Array<ClientUser>,
      sortBy: SortBy
    ) =>
      `This executor meets the demands of only ${sortedClients.length} out of ${
        clients.length
      } clients\n
Available clients sorted by ${
        sortBy === SortBy.reward ? "highest reward" : "distance to executor"
      }:`;

    const getSortedClientsString = (sortedClients: Array<ClientUser>) =>
      sortedClients.reduce((acc, client) => {
        acc += `\nname: ${client.name}, distance: ${getDistance(
          client.position,
          executor.position
        )}, reward: ${client.reward}`;
        return acc;
      }, "");

    return clientsFilteredByDemand.length > 0
      ? clientsFilteredByDemand.length === clients.length
        ? right("This executor meets all demands of all clients!")
        : right(
            `${getFullMessage(
              clientsFilteredByDemand,
              clients,
              sortBy
            )}${getSortedClientsString(
              sort(clientSordOrd)(clientsFilteredByDemand)
            )}`
          )
      : left("This executor cannot meet the demands of any client!");
  };

export const main = (sortBy: SortBy): Promise<string> =>
  Promise.all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) =>
      pipe(
        /**
         * Since the "show" function takes two parameters, the value of which is inside Either
         * clients is Either<string, Array<Client>>, an executor is Either<string, Executor>. How to pass only Array<Client> and Executor to the show?
         * Either is an applicative type class, which means that we can apply each parameter by one
         */
        right(show(sortBy)), // Firstly, we need to lift our function to the Either
        ap(clients), // Apply first parameter
        ap(executor), // Apply second parameter
        flatten, // show at the end returns Either as well, so the result would be Either<string, Either<string, string>>. We need to flatten the result
        getOrElse((err) => err) // In case of any left (error) value, it would be stopped and show error. So, if clients or executor is left, the show would not be called, but onLeft in getOrElse would be called
      )
    );
