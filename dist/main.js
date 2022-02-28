"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    process.env['PORT'] = '5000';
    const port = process.env.PORT;
    await app.listen(port ? port : 3000);
    console.log(port);
}
bootstrap();
//# sourceMappingURL=main.js.map