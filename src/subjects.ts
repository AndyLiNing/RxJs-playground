import {
    AsyncSubject,
    BehaviorSubject,
    Observable,
    ReplaySubject,
    Subject,
} from 'rxjs';

type TypeOfSubject =
    | 'Subject'
    | 'BehaviorSubject'
    | 'ReplaySubject'
    | 'AsyncSubject';

export function SubjectsFactory(
    subjectType: TypeOfSubject
): Observable<string> {
    let sub$: Subject<string>;

    switch (subjectType) {
        case 'Subject':
            initSubject();
            break;
        case 'BehaviorSubject':
            sub$ = new BehaviorSubject('BehaviorSubject');
            break;
        case 'ReplaySubject':
            initReplay();
            break;
        case 'AsyncSubject':
            initAsync();
            break;
    }
    function initSubject() {
        sub$ = new Subject();
        sub$.next('Subject1');
        sub$.next('Subject2');
        sub$.next('Subject3');
        sub$.complete();
    }
    function initReplay() {
        sub$ = new ReplaySubject(1);
        sub$.next('ReplaySubject1');
        sub$.next('ReplaySubject2');
        sub$.next('ReplaySubject3');
        sub$.complete();
    }
    function initAsync() {
        sub$ = new AsyncSubject();
        sub$.next('AsyncSubject1');
        sub$.next('AsyncSubject2');
        sub$.next('AsyncSubject3');
        sub$.complete();
    }
    // @ts-ignore
    return sub$.asObservable();
}
