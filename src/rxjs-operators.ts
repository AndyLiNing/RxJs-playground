import { EMPTY, Observable, of, throwError } from 'rxjs';
import { delay, expand, mergeMap, retryWhen } from 'rxjs/operators';

// expand operator, behavior similar to mergeMap, but call the src and inner observable recursively
of(1, 2, 3)
    .pipe(expand((x) => (x < 3 ? EMPTY : of(x - 1))))
    .subscribe((x) => {
        console.log('output: ', x);
    });

type rxjsOperatorReturnType = (src: Observable<any>) => Observable<any>;
// RxJs custom operator example
function rxjsOperatorFunction<T>(): rxjsOperatorReturnType {
    return (src: Observable<T>) => {
        return new Observable();
    };
}

// RxJs retry strategy operator
function retryWhenFailure<T>(
    maxTry: number,
    retryDelay: number
) {
    return (src: Observable<T>) =>
        src.pipe(
            retryWhen((errors: Observable<any>) =>
                errors.pipe(
                    delay(retryDelay),
                    mergeMap((error) =>
                        maxTry-- > 0 ? of(error) : throwError(error)
                    )
                )
            )
        );
}
