export default interface AnalogClockConfig {
  showMinuteNumbers: boolean;
  showMinuteTicks: boolean;
  show12HourNumbers: boolean;
  show24HourNumbers: boolean;
}

export function isAnalogClockConfig(obj: any): obj is AnalogClockConfig {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.showMinuteNumbers === 'boolean' &&
    typeof obj.showMinuteTicks === 'boolean' &&
    typeof obj.show12HourNumbers === 'boolean' &&
    typeof obj.show24HourNumbers === 'boolean'
  );
}
