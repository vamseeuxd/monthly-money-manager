// @ts-ignore
import request from 'supertest';
import IndexRoute from "@/index.route";
import App from "./app";
// @ts-ignore
describe('Testing Index', () => {
  // @ts-ignore
  afterAll(async () => {
    await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
  });
  // @ts-ignore
  describe('[GET] /', () => {
    // @ts-ignore
    it('response statusCode 200', () => {
      const indexRoute = new IndexRoute();

      const app = new App([indexRoute]);
      return request(app.getServer()).get(`${indexRoute.path}`).expect(200);
    });
  });
});

