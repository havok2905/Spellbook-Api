import { CastingTimeResponse } from './CastingTimeResponse';

export class CastingTimesResponse {
  public castingTimes: CastingTimeResponse[] = [];

  constructor(castingTimes: CastingTimeResponse[]) {
    this.castingTimes = castingTimes;
  }

  public toJson() {
    return this.castingTimes.map(castingTime => {
      return castingTime.toJson();
    });
  }
}