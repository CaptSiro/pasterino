export type ImpulseListener<T> = (value: T) => any;



export type ImpulseOptions = {
  pulseOnDuplicate?: boolean
}



export default class Impulse<T = void> {
  private lastValue: T | undefined;
  private readonly listeners: ImpulseListener<T>[];

  constructor(private readonly options?: ImpulseOptions | undefined) {
    this.listeners = [];
    this.lastValue = undefined;
  }

  listen(listener: ImpulseListener<T>): void {
    this.listeners.push(listener);
  }

  removeListener(listener: ImpulseListener<T>): void {
    const i = this.listeners.indexOf(listener);

    if (i === -1) {
      return;
    }

    this.listeners.splice(i, 1);
  }

  pulse(value: T): void {
    if (this.options?.pulseOnDuplicate === false && value === this.lastValue) {
      return;
    }

    this.lastValue = value;

    for (let i = 0; i < this.listeners.length; i++) {
      this.listeners[i](value);
    }
  }

  value(): T | undefined {
    return this.lastValue;
  }
}