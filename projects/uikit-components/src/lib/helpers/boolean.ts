export function coerceBooleanProperty(value: any): boolean {
    return value != null && `${value}` !== 'false';
}

export function UkBoolean(){
    return function(target: any, propertyKey: string) {
        let _value: boolean;
        Object.defineProperty(target, propertyKey, {
            get: () => _value,
            set: value  => _value = coerceBooleanProperty(value),
            enumerable: true,
            configurable: true
        });
    }
}