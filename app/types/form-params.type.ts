import { ApiRequest } from './api-request.type';

export declare namespace FormParams {
  type LoginByEmail = ApiRequest.LoginByEmail;

  type RegisterByPhoneNumber = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
  };
}
