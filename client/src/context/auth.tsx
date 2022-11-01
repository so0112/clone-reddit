import { User } from '../styles/types';
import {
	createContext,
	useContext,
	useReducer
} from 'react';

interface State {
	authenticated: boolean;
	user: User | undefined;
	loading: boolean;
}

// Context 생성
const StateContext = createContext<State>({
	authenticated: false,
	user: undefined,
	loading: true
});

// State 업데이트에 필요한 Dispatch 생성
const DispatchContext = createContext<any>(null);

interface Action {
	type: string;
	payload: any;
}

const reducer = (
	state: State,
	{ type, payload }: Action
) => {
	switch (type) {
		case 'LOGIN':
			return {
				...state,
				authenticated: true,
				user: payload
			};
		case 'LOGOUT':
			return {
				...state,
				authenticated: false,
				user: null
			};
		case 'STOP_LOADING':
			return {
				...state,
				loading: false
			};
		default:
			throw new Error(`알려지지않은 액션 타입": ${type}`);
	}
};

export const AuthProvider = ({
	children
}: {
	children: React.ReactNode;
}) => {
	const [state, defaultDispatch] = useReducer(reducer, {
		user: null,
		authenticated: false,
		loading: true
	});

	const dispatch = (type: string, payload?: any) => {
		defaultDispatch({ type, payload });
	};

	console.log(state);

	return (
		<DispatchContext.Provider value={dispatch}>
			<StateContext.Provider value={state}>
				{children}
			</StateContext.Provider>
		</DispatchContext.Provider>
	);
};

export const useAuthState = () => useContext(StateContext);
export const useAuthDispatch = () =>
	useContext(DispatchContext);
