import { Router } from '../router.ts';

export interface MethodMetadata {
  method?: string;
  url?: string;
  middleware: Function;
  target: Function;
}

export interface MiddlewareMetadata{

    // middleware is function for handle middleware
    // ex authenticatin middleware or another
    middleware?: Function;
    
    // targer is function for next request
    // its representative for method
    target?: Function;
}

export interface ControllerMetadata {
  url?: string;
  target?: Function;
  router?: Router;
  methods?: MethodMetadata[];
}
