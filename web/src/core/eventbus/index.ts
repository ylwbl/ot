function dispatchEvent(event: any) {
  if (window.dispatchEvent) {
    window.dispatchEvent(event);
  } else {
    let t: any = window;
    t.fireEvent && t.fireEvent(event);
  }
}
function setupEvent(eventName: string, detail: any) {
  return new CustomEvent(eventName, {
    detail: detail
  });
}
export { dispatchEvent, setupEvent };
