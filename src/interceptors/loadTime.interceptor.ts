import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from "@nestjs/common";
import { map, Observable } from "rxjs";

export interface Response<T> {
  data: T;
}

@Injectable()
export class LoadTimeInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<Response<T>> {
    const now = Date.now();
    return next.handle().pipe(
      map((data) => ({
        ...data,
        serverLoad: Date.now() - now,
      }))
    );
  }
}
