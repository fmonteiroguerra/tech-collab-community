import { useLocation } from "react-router-dom";
import { useMemo } from "react";

export function useQuery(){
    const { search } = useLocation();

    return useMemo( ()=> new URLSearchParams(search), [search])
    //o useMemo esta executando semlhante ao useEffect, ele executará só uma vez a função assim que search mudar de valor
    
}