import { Module } from "@nestjs/common";

import { ApiModule } from "./api";
import { ConfigModule } from "./shared/config";
import { SecurityModule } from "./shared/security";
import { ThirdPartyModule } from "./shared/third-party";

@Module({
    imports: [
        ConfigModule,
        SecurityModule,
        ThirdPartyModule,
        ApiModule
    ],
})
export class MainModule {}