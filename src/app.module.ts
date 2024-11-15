import {ProductsModule} from "./products/product.module";
import {AppController} from "./app.controller";
import {Module} from "@nestjs/common";
import {AppService} from "./app.service";

@Module({
  imports: [ProductsModule],
  controllers: [AppController],
  // add the DatabaseService provider
  providers: [AppService],
})
export class AppModule {}