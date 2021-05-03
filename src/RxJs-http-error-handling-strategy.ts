import axios from 'axios';
import {catchError, finalize, map} from 'rxjs/operators';
import { of, throwError } from 'rxjs';

const http$ = of(axios.get('https://jsonplaceholder.typicode.com/todos/1'));

// 1, The Catch and Replace Strategy
http$.pipe(catchError((err) => of([]))).subscribe(
    (res) => console.log('HTTP response', res),
    (err) => console.log('HTTP Error', err),
    () => console.log('HTTP request completed.')
);

// 2, The Catch and Rethrow Strategy
http$
    .pipe(
        catchError((err) => {
            console.log('Handling error locally and rethrowing it...', err);
            return throwError(err);
        })
    )
    .subscribe(
        (res) => console.log('HTTP response', res),
        (err) => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
    );
// 3, Using catchError multiple times in an Observable chain
http$
    .pipe(
        map(() => {}),
        catchError((err) => {
            console.log('caught mapping error and rethrowing', err);
            return throwError(err);
        }),
        catchError((err) => {
            console.log('caught rethrown error, providing fallback value');
            return of([]);
        })
    )
    .subscribe(
        (res) => console.log('HTTP response', res),
        (err) => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
    );
// 4, Finalize operator
/*
* Note the second finalize is executed after the subscribe()
* */
http$
    .pipe(
        map(() => {}),
        catchError(err => {
            console.log('caught mapping error and rethrowing', err);
            return throwError(err);
        }),
        finalize(() => console.log("first finalize() block executed")),
        catchError(err => {
            console.log('caught rethrown error, providing fallback value');
            return of([]);
        }),
        finalize(() => console.log("second finalize() block executed"))
    )
    .subscribe(
        res => console.log('HTTP response', res),
        err => console.log('HTTP Error', err),
        () => console.log('HTTP request completed.')
    );
