import { useLayoutEffect } from "react";

export function DocumentTitle({ title }) {
  useLayoutEffect(() => {
    const prev = document.title;
    document.title = title;
    return () => {
      document.title = prev;
    };
  }, [title]);
  return null;
}
