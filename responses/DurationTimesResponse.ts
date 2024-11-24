import { DurationTimeResponse } from './DurationTimeResponse';

export class DurationTimesResponse {
  public durationTimes: DurationTimeResponse[] = [];

  constructor(durationTimes: DurationTimeResponse[]) {
    this.durationTimes = durationTimes;
  }

  public toJson() {
    return this.durationTimes.map(durationTime => {
      return durationTime.toJson();
    });
  }
}