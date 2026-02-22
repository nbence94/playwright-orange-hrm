import SideBar from "./sideBar";
import AdminPage from "./adminPage";
import TestDataGenerator from "../utils/generator";

export default class App {

    constructor(page) {
        this.navigate = new SideBar(page);
        this.admin = new AdminPage(page);
        this.generate = new TestDataGenerator();
    }

}