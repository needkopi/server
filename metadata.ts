import { Router } from './router.ts';
import { ControllerMetadata } from './metadata/controller.ts';

export class MetaData {
  // property controller contain ?
  //
  //
  static controllers: {[key: string]: any} = {};
  
  // property mmethod contain
  static methods: any[] = [];
  static middlewares: any[] = []

  static objects() {
    return {
      controllers: this.controllers,
    };
  }

  static addController(name: string, routeurl: string, target: any) {
    const meta: any = {};
    meta.url = routeurl;
    meta.router = new Router();
    meta.methods = []
    this.methods.filter(method => method.controller === name).forEach(method => {
      meta.methods.push(method);
    });

    if (!this.controllers[name]) this.controllers[name] = new target();
    this.controllers[name].meta = meta;
    //console.log(meta)

    this.buildRoute(name, this.controllers[name].meta);
  }

  static buildRoute(name: string, meta: any) {
    let { url, router, methods } = meta;
    methods.forEach((method: any) => {
      switch (method.method) {
        case 'GET':
          router.get(`${method.url}` || '', method.target.bind(this.controllers[name]) || new Function());
          break;
        default:
          break;
      }
    });
  }

  static addMethod(method: string, controller: string, url: string, target: Function) {
    //const middleware: Function;
    const middleware = this.middlewares.filter(m => m.name === controller && m.target === target).forEach(m => {
        return  m.middleware;
    });
    this.methods.push({
      controller,
      method,
      url,
      middleware,
      target,
    });
  }

  static addMiddleware(middleware: Function,name: string, target: Function){
    this.middlewares.push({
        middleware,
        name,
        target,
    })
  }

}
