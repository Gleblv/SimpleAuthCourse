class AuthController {
    async register(req, res) {
        try {

        } catch (err) {
            console.log(err);
        }
    }

    async login(req, res) {
        try {

        } catch (err) {
            console.log(err);
        }
    }

    async getUsers(req, res) {
        try {
            res.json('server work');
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = new AuthController();