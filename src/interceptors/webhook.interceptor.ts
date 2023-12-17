import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';
import { IncomingWebhook } from '@slack/client';
import * as Sentry from '@sentry/minimal';
import configuration from 'src/config/configuration';

@Injectable()
export class WebhookInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((error) => {
        Sentry.captureException(error);
        const webhook = new IncomingWebhook(configuration().sentryWebhookUrl);
        process.env.NODE_ENV !== 'test' &&
          webhook.send({
            attachments: [
              {
                color: 'danger',
                text: '🚨 Cherish Dev - 에러 발생 🚨',
                fields: [
                  {
                    title: `Request Message: ${error.message}`,
                    value: error.stack,
                    short: false,
                  },
                ],
                ts: Math.floor(new Date().getTime() / 1000).toString(),
              },
            ],
          });
        return throwError(() => error);
      }),
    );
  }
}
