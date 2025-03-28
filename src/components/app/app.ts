// import StartPage from "../startPage/startPage";
import SetLogin from "../setLogin/setLogin";
export default class App {
  start() {
    new SetLogin().setLoginToLS();
  }
}
