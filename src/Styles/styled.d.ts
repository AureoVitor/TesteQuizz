import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    pallet: {
      primary: string;
      semantic: { success: string; warning: string; error: string };
    };
  }
}
