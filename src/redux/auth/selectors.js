export const isAuthSelector = (state) => state.auth.status === 'authorized';
export const isCheckingAuthSelector = (state) => state.auth.status === 'checking';
