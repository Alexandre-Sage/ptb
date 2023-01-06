interface ComposeHigherOrderAsync<Type> {
  firstToExecute: (firstParam: Type) => Promise<Type>;
  secondToExecute: (secondParam: Type) => Promise<Type>;
}
interface ComposeHigherOrderMultiTypeAsync<InputType, ReturnedType> {
  firstToExecute: (firstParam: InputType) => Promise<InputType>;
  secondToExecute: (secondParam: InputType) => Promise<ReturnedType>;
}
interface ComposeHigherOrder<Type> {
  firstToExecute: (firstParam: Type) => Type;
  secondToExecute: (secondParam: Type) => Type;
}
interface ComposeHigherOrderMultiType<InputType, ReturnedType> {
  firstToExecute: (firstParam: InputType) => InputType;
  secondToExecute: (secondParam: InputType) => ReturnedType;
}
const composeHigherOrderAsync =
  <FirstType>({
    firstToExecute,
    secondToExecute,
  }: ComposeHigherOrderAsync<FirstType>) =>
  async (param: FirstType) =>
    secondToExecute(await firstToExecute(param));

const composeHigherOrderMutliTypeAsync =
  <InputType, ReturnedType>({
    firstToExecute,
    secondToExecute,
  }: ComposeHigherOrderMultiTypeAsync<InputType, ReturnedType>) =>
  async (param: InputType) =>
    secondToExecute(await firstToExecute(param));

const composeHigherOrder =
  <FirstType>({
    firstToExecute,
    secondToExecute,
  }: ComposeHigherOrder<FirstType>) =>
  async (param: FirstType) =>
    secondToExecute(firstToExecute(param));
const composeHigherOrderMultiType =
  <InputType, ReturnedType>({
    firstToExecute,
    secondToExecute,
  }: ComposeHigherOrderMultiType<InputType, ReturnedType>) =>
  async (param: InputType) =>
    secondToExecute(firstToExecute(param));
export {
  composeHigherOrderAsync,
  ComposeHigherOrderAsync,
  composeHigherOrderMutliTypeAsync,
  ComposeHigherOrder,
  ComposeHigherOrderMultiType,
  ComposeHigherOrderMultiTypeAsync,
  composeHigherOrder,
  composeHigherOrderMultiType,
};
