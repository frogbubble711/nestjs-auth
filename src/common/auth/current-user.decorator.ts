import { createParamDecorator } from '@nestjs/common';

export interface ICurrentUserParams {
  required?: boolean;
}

type CurrentUserDecorator = (params?: ICurrentUserParams) => any;

export const CurrentUser: CurrentUserDecorator = createParamDecorator(
  (data: ICurrentUserParams = { required: false }, req: Express.Request) => {
    const user = req.user;

    if (!user && data.required) {
      throw new Error('User not found');
    }

    return user;
  },
);
