import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    console.log(request);
    if (!request?.userId) {
      throw new UnauthorizedException();
    }
    return request?.userId;
  },
);
