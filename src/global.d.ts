import 'reactn';

declare module 'reactn/default' {
    export interface Reducers {
        getUser: (
            global: State,
            dispatch: Dispatch,
            username: string,
        ) => Pick<State, 'users'>;

        getSets: (
            global: State,
            dispatch: Dispatch,
        ) => Pick<State, 'sets'>;
    }

    export interface State {
        sets: Object[],
        users: Object,
        options: Object,
        frequentlyUsed: string[],
    }
}
