import Mocha from "mocha";

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
  describe("STORIES", () => {
    require("./storyTest/create.test");
    require("./storyTest/getAll.test");
  });
});
