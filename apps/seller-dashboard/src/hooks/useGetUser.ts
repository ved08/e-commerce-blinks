import { getSellerBlink, getTheUser } from "@/lib/action";
import { useQuery } from "@tanstack/react-query";

export const useGetSellerDetails = (publicKey: string) => {
  return useQuery({
    queryKey: ["seller-profile", publicKey],
    queryFn: async () => {
      const data = await getTheUser(publicKey);
      return data;
    },
    enabled: !!publicKey,
  });
};

export const useGetSellerHook = (address: string) => {
  return useQuery({
    queryKey: ["seller-blink", address],
    queryFn: async () => {
      const data = await getSellerBlink(address);
      return data;
    },
    enabled: !!address,
  });
};
