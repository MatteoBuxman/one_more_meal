class OrderAlreadyContainsMealUUIDsError extends Error {
  constructor(message: string) {
    super(message);
  }
}