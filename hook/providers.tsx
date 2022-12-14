import type { BuiltInProviderType } from "next-auth/providers";
import type { ClientSafeProvider, LiteralUnion } from "next-auth/react";
import { getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

const useInfoProviders = () => {
  const [providers, setproviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>();
  useEffect(() => {
    const setTheProviders = async () => {
      const setupProviders = await getProviders();
      setproviders(setupProviders);
    };
    setTheProviders();
  }, []);

  return { providers };
};

export default useInfoProviders;
