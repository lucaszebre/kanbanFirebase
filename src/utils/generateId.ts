export function generateId(): string {
    const timestamp = Date.now().toString(36);
    const randomNum = Math.floor(Math.random() * 1000000).toString(36);
    return `${timestamp}-${randomNum}`;
  }