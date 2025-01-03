import { User } from "../model/model.js";

const getExpoToken = async (uid) => {
    const getUserToken = await User.findOne({_id: uid}).select('token'); // Select only the 'token' fielddd
console.log(getUserToken)
    return getUserToken.token
}

export default getExpoToken;
