import * as bcrypt from "bcryptjs"

const authServiceFactory = () => {

    const validate = async (password: any, dbPassword: any) => {
        return await bcrypt.compare(password, dbPassword);
    };

    return {validate};
};

module.exports = {
    authServiceFactory
};