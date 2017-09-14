import { Aurelia } from "aurelia-framework";

/**
 * The configuration function.
 */
export async function configure(aurelia: Aurelia) {
    aurelia.use
        .basicConfiguration()
         .router()
         .history()
        //.developmentLogging();

    await aurelia.start();
    aurelia.setRoot("app/app");
}
