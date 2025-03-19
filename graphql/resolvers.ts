import { User } from "./users/resolvers";
import { Movement } from "./movements/resolvers";

const customResolvers  = [User, Movement];

export { customResolvers  };