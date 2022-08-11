import App from '@/app';
import AuthRoute from '@/modules/login/auth.route';
import IndexRoute from '@/index.route';
import UsersRoute from '@/modules/users/users.route';
import validateEnv from '@utils/validateEnv';
import CardRoute from "@/modules/cards/route";

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new CardRoute()]);

app.listen();
