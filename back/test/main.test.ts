import mocha, { suite } from "mocha";
//mocha.setup(() => ({
//  ui: "tdd",
//  dryRun: true,
//  asyncOnly: true,
//}));
// Examples of options:
// mocha.setup("qunic");
//mocha.setup("tdd");
const runner = new mocha.Runner(
  suite("", () => {}),
  {
    dryRun: true,
    cleanReferencesAfterRun: true,
  }
);
const test = new mocha.reporters.spec(runner, {
  reporter: "spec",
  ui: "tdd",
  reporterOptions: {},
});
mocha.interfaces.tdd(
  suite("RUN ALL", () => {
    suite("USER", () => {
      require("./userTest/create.test");
      require("./userTest/login.test");
    });
    suite("BOARDS", () => {
      require("./boardTest/createBoard.test");
      require("./boardTest/getAll.test");
      require("./boardTest/getById.test");
      require("./boardTest/update.test");
      require("./boardTest/delete.test");
    });
    suite("STORIES", () => {
      require("./storyTest/create.test");
      require("./storyTest/getAll.test");
      require("./storyTest/getById.test");
      require("./storyTest/update.test");
      require("./storyTest/delete.test");
      require("./storyTest/getByBoardId.test");
    });
    suite("TASK", () => {
      require("./taskTest/create.test");
      require("./taskTest/getAll.test");
      require("./taskTest/getById.test");
      require("./taskTest/update.test");
      require("./taskTest/delete.test");
      require("./taskTest/getByStoryId.test");
    });
  })
);
