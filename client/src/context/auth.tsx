import { User } from '../types';
import { createContext } from 'react';

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

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
