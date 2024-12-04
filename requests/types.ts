export interface ApiRequest {
  validate(): boolean
}

export interface DescriptionOrderedListEntity {
  type: 'description-ordered-list-entity',
  items: string[];
}

export interface DescriptionUnorderedListEntity {
  type: 'description-unordered-list-entity',
  items: string[];
}

export type DescriptionEntity =
  DescriptionOrderedListEntity |
  DescriptionUnorderedListEntity |
  string;
