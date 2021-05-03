import { of, pipe } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const test1 = of('test1 observable');

const observableFactoryA = () => {
    console.log('function observableFactoryA');
    sideEffect();
    return test1.pipe(tap(() => console.log('tap test1 observable ')));
};
const sideEffect = () => {
    console.log('funtion sideEffect');
};

const d = observableFactoryA().pipe(map((value) => value + value));
// d = sideEffect() + test1.pipe(tap(() => console.log('tap test1 observable ')));
// d.subscribe() = sideEffect() + test1.pipe(tap(() => console.log('tap test1 observable '))).subscribe();

d.subscribe();
d.subscribe();
d.subscribe();



// const observableFactoryB = () => {
//     sideEffect();
//     return of(3)
// }
// const e = observableFactoryB()
// e.subscribe();
// e.subscribe();
// e.subscribe();
