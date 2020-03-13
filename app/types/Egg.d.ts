import User from '../model/User';

export{};

declare global{
    namespace Egg {
        export interface Request{
            currentUser?:User;
        }
    }
}