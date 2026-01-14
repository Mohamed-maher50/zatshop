/**
 * Validates if a string is a valid MongoDB ObjectId format
 * @param id - The ID string to validate
 * @returns boolean - true if valid ObjectId format, false otherwise
 */
export function isValidObjectId(id: string | undefined | null): boolean {
  if (!id || typeof id !== "string") {
    return false;
  }
  // MongoDB ObjectId is 24 character hex string
  const objectIdRegex = /^[0-9a-fA-F]{24}$/;
  return objectIdRegex.test(id);
}
