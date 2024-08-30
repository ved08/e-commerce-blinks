import { getTheUser } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export const useGetUserDetails = (publicKey: string) => {
  return useQuery({
    queryKey: ["user", publicKey],
    queryFn: async () => {
      const data = await getTheUser(publicKey);
      return data;
    },
    enabled: !!publicKey,
  });
};
