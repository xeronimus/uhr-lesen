import AnalogClockConfig from './AnalogClockConfig';

export default interface Level {
  title: string;
  clockConfig: AnalogClockConfig;

  /*
  higher levels earn more points. a correct solution is multiplied with this factor
   */
  pointFactor: number;

  /*
  the amount of points a user must have so that this level is available
   */
  threshold: number;

  getRandomTime: () => [number, number];
}
