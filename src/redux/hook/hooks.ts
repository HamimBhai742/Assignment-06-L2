import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store/store';
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppDispatch = useDispatch.withTypes();
