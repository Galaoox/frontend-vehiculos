import { useContext } from "react";
import { LoadingContext } from '@context/loading';

export function useLoading() {
    return useContext(LoadingContext);
}