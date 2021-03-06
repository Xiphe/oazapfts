import { QS } from "./ApiStub";
const { query, pipe, form, space, deep, explode } = QS;

describe("delimited", () => {
  it("should use commas", () => {
    expect(form({ id: [3, 4, 5] })).toEqual("id=3,4,5");
  });
  it("should use pipes", () => {
    expect(pipe({ id: [3, 4, 5] })).toEqual("id=3|4|5");
  });
  it("should use spaces", () => {
    expect(space({ id: [3, 4, 5] })).toEqual("id=3%204%205");
  });
  it("should enumerate entries", () => {
    expect(form({ author: { firstName: "Felix", role: "admin" } })).toEqual(
      "author=firstName,Felix,role,admin"
    );
  });
  it("should omit undefined values", () => {
    expect(form({ id: 23, foo: undefined })).toEqual("id=23");
  });
});

describe("explode", () => {
  it("should explode arrays", () => {
    expect(explode({ id: [3, 4, 5] })).toEqual("id=3&id=4&id=5");
  });
  it("should explode objects", () => {
    expect(explode({ author: { firstName: "Felix", role: "admin" } })).toEqual(
      "firstName=Felix&role=admin"
    );
  });
  it("should omit undefined values", () => {
    expect(explode({ id: 23, foo: undefined })).toEqual("id=23");
  });
});

describe("deep", () => {
  it("should serialize objects", () => {
    expect(deep({ author: { firstName: "Felix", role: "admin" } })).toEqual(
      "author[firstName]=Felix&author[role]=admin"
    );
  });
  it("should serialize nested objects", () => {
    expect(
      deep({ author: { name: { first: "Felix", last: "Gnass" } } })
    ).toEqual("author[name][first]=Felix&author[name][last]=Gnass");
  });
  it("should omit undefined values", () => {
    expect(deep({ author: { name: "Felix", role: undefined } })).toEqual(
      "author[name]=Felix"
    );
  });
});

describe("query", () => {
  it("should return an empty string", () => {
    expect(query()).toEqual("");
  });
  it("should add a leading questionmark", () => {
    expect(query("foo=bar")).toEqual("?foo=bar");
  });
  it("should join multiple params", () => {
    expect(query("foo=bar", "boo=baz")).toEqual("?foo=bar&boo=baz");
  });
});
