import { createContext, useContext } from "react";
import type { IContainer } from "../../application/IContainer";
import { container } from "../../infrastructure/container";

export const ContainerContext = createContext<IContainer>(container);

export function useContainer(): IContainer {
  return useContext(ContainerContext);
}
