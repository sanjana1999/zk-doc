const userController = require("../controllers/User");


const routes = [
    {type:"get", path:"/get-user", controller: userController.getUser},
    {type:"post", path:"/save-user", controller: userController.saveUser}
];

const Router = {
    init: (app)=> {
        routes.forEach(route => {
            app[route.type](route.path, route.controller)
        })
    }
}

module.exports = Router;
