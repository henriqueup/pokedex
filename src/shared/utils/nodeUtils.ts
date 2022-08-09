export const handleEnterAsClick =
  (callback: (event: Event) => void) =>
  (event: KeyboardEvent): void => {
    if (event.key === "Enter") {
      callback(event);
    }
  };
