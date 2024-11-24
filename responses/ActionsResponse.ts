import { ActionResponse } from './ActionResponse';

export class ActionsResponse {
  public actions: ActionResponse[] = [];

  constructor(actions: ActionResponse[]) {
    this.actions = actions;
  }

  public toJson() {
    return this.actions.map(action => {
      return action.toJson();
    });
  }
}