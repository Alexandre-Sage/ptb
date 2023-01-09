import mocha, { describe } from "mocha";
// mocha.setupr("tdd");
// Examples of options:
//mocha.setup({
//  allowUncaught: true,
//  asyncOnly: true,
//  bail: true,
//  checkLeaks: true,
//  dryRun: true,
//  failZero: true,
//  forbidOnly: true,
//  forbidPending: true,
//  global: ['MyLib'],
//  retries: 3,
//  rootHooks: { beforeEach(done) { ... done();} },
//  slow: '100',
//  timeout: '2000',
//  ui: 'bdd'
//});
describe("RUN ALL", () => {
  describe("USER", () => {
    require("./userTest/create.test");
    require("./userTest/login.test");
  });
  describe("BOARDS", () => {
    require("./boardTest/createBoard.test");
    require("./boardTest/getAll.test");
    require("./boardTest/getById.test");
    require("./boardTest/update.test");
    require("./boardTest/delete.test");
  });
  describe("STORIES", async () => {
    require("./storyTest/create.test");
    require("./storyTest/getAll.test");
    require("./storyTest/getById.test");
    require("./storyTest/update.test");
    require("./storyTest/delete.test");
  });
});
