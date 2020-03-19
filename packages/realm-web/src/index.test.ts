import { expect } from "chai";

import * as Realm from ".";

describe("Realm Web", () => {
    it("expose the App constructor", () => {
        expect(typeof Realm.App).to.equal("function");
    });

    describe("Credentials", () => {
        it("expose a credentials factory", () => {
            expect(typeof Realm.Credentials).to.equal("function");
        });

        // Check the exposure of all the providers

        it("expose the anonymous credential", () => {
            expect(typeof Realm.Credentials.anonymous).to.equal("function");
            const credentials = Realm.Credentials.anonymous();
            expect(credentials).to.be.instanceOf(
                Realm.Credentials.AnonymousCredentials
            );
        });

        it("expose the username password credential", () => {
            expect(typeof Realm.Credentials.usernamePassword).to.equal(
                "function"
            );
            const credentials = Realm.Credentials.usernamePassword(
                "gilfoil",
                "s3cr3t"
            );
            expect(credentials).to.be.instanceOf(
                Realm.Credentials.UsernamePasswordCredentials
            );
            expect(credentials.username).to.equal("gilfoil");
            expect(credentials.password).to.equal("s3cr3t");
        });
    });

    describe("static app function", () => {
        it("return the same App instance only if ids match", () => {
            const app1 = Realm.app("default-app-id");
            expect(app1).to.be.instanceOf(Realm.App);
            const app2 = Realm.app("default-app-id");
            expect(app2).to.equal(app1);
            const app3 = Realm.app("another-app-id");
            expect(app2).to.not.equal(app3);
        });
    });
});
