import User from '../entity/User';

export{};

declare global{
    namespace Egg {
        export interface Request{
            currentUser?:User;
        }
    }
}