import { of, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const test1 = of(2).pipe(
    map((value) => {
        console.log('test1');
        return value * 10;
    })
);

const a = () => {
    b();
    console.log('function a')
    return test1.pipe(tap(() => console.log('in test1 tap')));
};
const b = () => {
    console.log('funtion b');
};

const c = () => {
    b();
    return of(3)
}

const d = a().pipe(map((value) => value * 100));
// d = b() + test1.pipe(map((value) => value * 10));
    

c().subscribe();
c().subscribe();
c().subscribe();
