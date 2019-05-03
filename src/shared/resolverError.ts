import { log } from './logger';

interface ResolverErrorOptions {
  message?: string;
  debugMessage?: string;
  error?: ResolverError | Error;
  statusCode?: number;
}

export class ResolverError extends Error {
  public statusCode: number;
  public debugMessage: string;
  public originalError: ResolverError | Error | null;

  constructor({ message, debugMessage, error, statusCode }: ResolverErrorOptions) {
    super(message);
    this.name = 'ResolverError';
    this.statusCode = statusCode || 500;
    this.debugMessage = debugMessage;
    this.originalError = error || null;
    if (!message || statusCode === 500) {
      this.message = 'Sorry, an error has occurred try again later.';
    }
    log.error({ debugMessage: this.debugMessage, originalError: this.originalError });
  }
}
