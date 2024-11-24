export class BadArgumentException extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class EntityNotFoundException extends Error {
  constructor(type: string, message?: string) {
    const defaultMessage = `${type} not found`;
    super(message ?? defaultMessage);
  }
}