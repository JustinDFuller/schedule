// Config is the top-level object of the Schedule Config.
// This is the entire object you will save in your Github Variable.
export type Config = {
  // timeZone is REQUIRED and must be a valid IANA (otherwise known as tz) location string.
  // You can find a list of valid timeZone options here: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  readonly timeZone: string;
  // schedules is REQUIRED and must adhere to the Schedule type defined below.
  // There MUST be at least one schedule.
  readonly schedules: Schedule[];
};

// There are two types of schedules.
// 1. A day-based schedule which looks for a particular day of the week. This is useful for defining weekdays and weekends.
// 2. A date-based schedule which looks for a particular date. This is useful for defining special events, such as a holiday schedule.
// If you do not adhere to either of these schedules, you will receive an error.
export type Schedule = DaySchedule | DateSchedule;

// ScheduleBase defines properties that are available for all schedule types.
type ScheduleBase = {
  // every schedule MUST define a name. This is the only way it is accessible through step outputs.
  // The name in the output will format as UPPER_SNAKE_CASE.
  readonly name: string;
  // startHour is a REQUIRED field where you define the hour the window starts.
  // valid inputs are 0-24.
  readonly startHour: number;
  // startMinute is an OPTIONAL field where you can define the minute the window begins.
  // valid inputs are 0-60.
  // default is 0.
  readonly startMinute?: number;
  // startSecond is an OPTIONAL field where you can define the second the window begins.
  // valid inputs are 0-60.
  // default is 0.
  readonly startSecond?: number;
  // endHour is a REQUIRED field where you define the hour the window ends.
  // valid inputs are 0-24.
  readonly endHour: number;
  // endMinute is an OPTIONAL field where you can define the minute the window ends.
  // valid inputs are 0-60.
  // default is 0.
  readonly endMinute?: number;
  // endSecond is an OPTIONAL field where you can define the second the window ends.
  // valid inputs are 0-60.
  // default is 0.
  readonly endSecond?: number;
};

// A Day schedule matches one or more days of the week.
// At least one day must be provided.
// For other fields, see ScheduleBase above.
export type DaySchedule = ScheduleBase & {
  // days defines the days this schedule will match.
  // valid entries are: "monday", "tuesday", "wednesday", "thursday", "friday", "saturday", and "sunday".
  readonly days: Day[];
};

// Day defines valid Day inputs.
export enum Day {
  sunday = "sunday",
  monday = "monday",
  tuesday = "tuesday",
  wednesday = "wednesday",
  thursday = "thursday",
  friday = "friday",
  saturday = "saturday",
}

// Days provides a convenient mapping of day strings to numeric values.
// This also expresses the allowed day values.
export const DAYS: string[] = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

// A Date schedule matches one or more dates.
// At least one date must be provided.
// For other fields, see ScheduleBase above.
export type DateSchedule = ScheduleBase & {
  // dates defines the dates this schedule will match.
  // See validDateFormats below for the allowed string formats.
  readonly dates: string[];
};

// validDateFormats defines all the date formats supported by the Date schedule type.
// Since strict parsing is enabled, the string must EXACTLY match one of these formats.
// That include delimiters, so "-" is required and cannot be replaced with "/".
// Also, there cannot be anything extra in the string.
export const validDateFormats: string[] = [
  "YYYY-MM-DD", // 2024-01-31 (run on this exact day, month and year)
  "MM-DD", // 01-31 (repeat on this month and day each year)
  "DD", // 31 (repeat on this day each month)
];
