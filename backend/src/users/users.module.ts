import { Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { PasswordService } from "src/auth/password.service";
import { AuthService } from "src/auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { AuthModule } from "src/auth/auth.module";
import { AuthResolver } from "src/auth/auth.resolver";
import { JwtStrategy } from "src/auth/jwt.strategy";
import { GqlAuthGuard } from "src/auth/gql-auth.guard";

@Module({
  imports: [AuthModule],
  providers: [
    UsersResolver,
    AuthService,
    JwtService,
    UsersService,
    PasswordService,
    AuthService,
    AuthResolver,
    JwtStrategy,
    GqlAuthGuard,
    PasswordService,
  ],
})
export class UsersModule {}
