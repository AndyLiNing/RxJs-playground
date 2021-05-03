import {Observable, Subscriber} from 'rxjs'

export function MyObservable<T>(data: T, numToEmit: number): Observable<T> {
    return new Observable<T>((subscriber: Subscriber<T>) => {
        let counter = 0
            let intervalHandler = setInterval(() => {
               if(counter < numToEmit){
                   subscriber.next( data );
                   counter++;
               }
               else {
                   subscriber.complete();
                   clearInterval(intervalHandler);
               }
            },   1000)

    });
}
