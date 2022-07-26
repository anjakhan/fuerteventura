
export class ValueDebounce<T> {

  private readonly callback: (value: T) => void;
  private timeoutHandle?: number;
  private value: T;

  timeout: number = 1000;

  constructor(callback: (value: T) => void) {
    this.callback = callback;
  }

  change(value: T, timeout: number = 1000) {
    this.value = value;
    window.clearTimeout(this.timeoutHandle);
    this.timeoutHandle = window.setTimeout(() => {
      this.callback(this.value);
    }, timeout);
  }

  immediate(value: T) {
    this.value = value;
    this.callback(value);
  }

}
