import { Errors } from '@shared/interfaces/errors/base.interface';

export interface AuthError extends Errors {
  /** This is a description of the id codes.
   * 0 - user not found
   * 1 - password incorrect
   **/
  id: 0 | 1;
  key: 'password_incorrect' | 'not_found'
}
