import { FeatureResponse } from './FeatureResponse';

export class FeaturesResponse {
  public features: FeatureResponse[] = [];

  constructor(features: FeatureResponse[]) {
    this.features = features;
  }

  public toJson() {
    return this.features.map(feature => {
      return feature.toJson();
    });
  }
}