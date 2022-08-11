import App from '@/app';
import AuthRoute from '@/modules/login/auth.route';
import IndexRoute from '@/index.route';
import UsersRoute from '@/modules/users/users.route';
import validateEnv from '@utils/validateEnv';
import CardsRoute from "@/modules/cards/cards.route";

validateEnv();

const app = new App([new IndexRoute(), new UsersRoute(), new AuthRoute(), new CardsRoute()]);

app.listen();
