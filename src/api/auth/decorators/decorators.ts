import { createParamDecorator } from '@nestjs/common';
import { Response } from 'express';
import { AuthenticatedUser } from '../DTOs/authenticatedUser.class';

export const ResGql = createParamDecorator(
  ( data, [ root, args, ctx, info ] ): Response => ctx.res,
);

export const ReqGql = createParamDecorator(
  ( data, [ root, args, ctx, info ] ): Request => ctx.req,
);

export const GqlUser = createParamDecorator(
  ( data, [ root, args, ctx, info ] ): AuthenticatedUser => ctx.req && ctx.req.user,
);
