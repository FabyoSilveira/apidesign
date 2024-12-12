import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';

export const Modules = [UserModule, DatabaseModule, AuthModule, MovieModule];
