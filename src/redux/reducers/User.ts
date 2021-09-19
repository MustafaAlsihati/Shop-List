import { User } from '../../constants/types';

interface ActionProps {
  type: string;
  user: User | null;
}

export const SET_USER = 'SET_USER';
export default (state: User | null = null, action: ActionProps) => {
  switch (action.type) {
    case SET_USER:
      return (state = action.user);
    default:
      return state;
  }
};
