import type React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "number-flow": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
      "number-flow-group": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export {};

