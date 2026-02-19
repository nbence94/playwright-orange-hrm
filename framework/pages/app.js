import SideBar from "./sideBar";
import AdminPage from "./adminPage";

export default class App {

    constructor(page) {
        this.navigate = new SideBar(page);
        this.admin = new AdminPage(page);
    }

}