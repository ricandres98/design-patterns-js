abstract class HttpAdapter {
  constructor(private _type: string) {}
  abstract get(): void;
  abstract post(): void;
  abstract put(): void;
  abstract delete(): void;

  get type() {
    return this._type;
  }
}

class RestHttpAdapter extends HttpAdapter {
  constructor() {
    super("REST");
  }
  get(): void {
    console.log(`GET. Adapter type: ${this.type}`);
  }
  post(): void {
    console.log(`POST. Adapter type: ${this.type}`);
  }
  put(): void {
    console.log(`PUT. Adapter type: ${this.type}`);
  }
  delete(): void {
    console.log(`DELETE. Adapter type: ${this.type}`);
  }
}

interface HttpAdapterFactory {
  makeAdapter(): HttpAdapter;
}

class RestHttpAdapterFactory implements HttpAdapterFactory {
  makeAdapter(): HttpAdapter {
    return new RestHttpAdapter();
  }
}

function appFactory(factory: HttpAdapterFactory) {
    console.log('--- [JS] Calling appFactory ---\n');
  
    if (!factory) {
      console.log('--- No factory provided ---');
      return;
    }
  
    const adapter = factory.makeAdapter();
    console.log(`Http Adapter is ${adapter.type}\n`);
    adapter.get();
    adapter.post();
    adapter.put();
    adapter.delete();
  }
  
  appFactory(new RestHttpAdapterFactory());