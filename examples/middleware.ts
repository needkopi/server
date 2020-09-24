import { Server, AppModules, Request, Response } from '../mod.ts';
import { Controller, GET, Middleware } from '../decorator.ts';

const app: Server = new Server();

@Controller()
class IndexController {
  @GET()
  index(req: Request, res: Response) {
    res.send('halo');
  }
}

@Controller('/about')
class AboutController {

  @GET()
  index(req: Request, res: Response) {
    res.send('about');
  }

  @GET('/:id')
  @Middleware(AuthMiddleware)
  show() {
  }
}

function AuthMiddleware(){
    console.log("lolos uji middleware")
}

const modules: AppModules = {
  controllers: [
    IndexController,
    AboutController,
  ],
};

app
  .register(modules)
  .listen({ port: 8080 }, () => {
    console.log('app running bos');
  });
