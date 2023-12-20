import { Either, fromPromise, ap, right, getOrElse, flatten } from './fp/either';
import { pipe } from './fp/utils';
import { fetchClient, fetchExecutor } from './fetching';
import { ClientUser, ExecutorUser } from './types';
import {fromNullable, isNone} from "./fp/maybe";
import {distance} from "./utils";
import {fromCompare, ordNumber, revert} from "./fp/ord";
import {sort} from "./fp/array";

type Response<R> = Promise<Either<string, R>>

const getExecutor = (): Response<ExecutorUser> => fromPromise(fetchExecutor());
const getClients = (): Response<Array<ClientUser>> => fromPromise(fetchClient().then(clients =>
        clients.map(client => ({
            ...client,
            demands: fromNullable(client.demands),
        })),
    ),
);

export enum SortBy {
  distance = 'distance',
  reward = 'reward',
}

const rewardPredicate = (curr: ClientUser, prev: ClientUser) =>
    ordNumber.compare(curr.reward, prev.reward);

export const show = (sortBy: SortBy) => (clients: Array<ClientUser>) => (executor: ExecutorUser): Either<string, string> => {
    const clientList = clients.filter(client =>
        isNone(client.demands)
            ? client
            : client.demands.value.every(demand =>
                executor.possibilities.some(possibility => possibility === demand),
            ),
    );

    const distancePredicate = (curr: ClientUser, prev: ClientUser) =>
        ordNumber.compare(distance(curr.position, executor.position), distance(prev.position, executor.position));

    const ordDistance = fromCompare(distancePredicate);

    const ordPredicate = fromCompare(rewardPredicate);

    const sortByReward = sort(revert(ordPredicate));
    const sortByDistance = sort(ordDistance);

    const sortedClients =
        sortBy === SortBy.distance ? sortByDistance(clientList) : sortByReward(clientList);

    const firstLine = sortedClients.length
        ? sortedClients.length === clients.length
            ? 'This executor meets all demands of all clients!'
            : `This executor meets the demands of only ${sortedClients.length} out of ${clients.length} clients`
        : 'This executor cannot meet the demands of any client!';

    const secondLine = sortBy === SortBy.distance ? 'distance to executor' : 'highest reward';

    const clientFullInfo = sortedClients
        .map(client =>
            `name: ${client.name}, distance: ${distance(client.position, executor.position)}, reward: ${
                client.reward
            }`.trim(),
        )
        .join('\n');

    const result = sortedClients.length
        ? firstLine + '\n' + '\n' + `Available clients sorted by ${secondLine}:` + '\n' + clientFullInfo
        : firstLine;

    return  sortedClients.length
        ? {
            _tag: 'Right',
            right: `${result}`,
        }
        : {
            _tag: 'Left',
            left: `${result}`,
        };
};

export const main = (sortBy: SortBy): Promise<string> => (
  Promise
    .all([getClients(), getExecutor()]) // Fetch clients and executor
    .then(([clients, executor]) => (
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
    ))
);
