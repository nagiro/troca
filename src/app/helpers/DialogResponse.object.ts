export class DialogResponse<T> {
  Value: T;
  Status = 2; // 0 (Fail), 1 (Success), 2 (Equal)
  Error: string;

  constructor() {}

  setValue(v: T) {
      this.Value = v;
      this.Status = 1;
      this.Error = '';
  }

  setError(v: T, e = '') {
    this.Value = v;
    this.Status = 0;
    this.Error = e;
  }

  getValue() {
    return this.Value;
  }

  getError() {
    return this.Error;
  }

  hasError() {
    return (this.Status === 0);
  }

  setSuccess() {
    this.Status = 1;
  }

  hasSuccess() {
    return (this.Status === 1);
  }

  hasEqual() {
    return (this.Status === 2);
  }
}
