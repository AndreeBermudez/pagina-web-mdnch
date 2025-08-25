import { useQuery } from "@tanstack/react-query"
import { getMenus } from "../services/getMenus"

export const useMenusQuery = () => {
    return useQuery({
        queryKey: ['menus'],
        queryFn: getMenus,
    })
}