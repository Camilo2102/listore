import { useEffect, useRef } from "react";

export default function useDidMountEffect (func: (t?: any) => any, deps: any[]) {
    const didMount = useRef(false);

    useEffect(() => {
      if (didMount.current) {
        func();
      } else {
        didMount.current = true;
      }
    }, deps);
  };
  