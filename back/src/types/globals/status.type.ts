const STATUS = {
  TO_DO: "TO_DO",
  IN_PROGRESS: "IN_PROGRESS",
  FINISHED: "FINISHED",
} as const;

type ObjectValue<T> = T[keyof T];
type Status = ObjectValue<typeof STATUS>;
export { STATUS, type Status };
