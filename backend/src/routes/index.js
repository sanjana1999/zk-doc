const userRouter = require('./User')


const Router = {
    init : (app) => {
        userRouter.init(app);
    }
}

module.exports = Router
