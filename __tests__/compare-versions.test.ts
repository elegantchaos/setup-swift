import { versionSatisfiesRequest } from "../src/core";

describe("version matching", () => {
  it("matches exact versions", () => {
    expect(versionSatisfiesRequest("5.10.1", "5.10.1")).toBe(true);
  });

  it("does not allow patch mismatch by default", () => {
    expect(versionSatisfiesRequest("5.10", "5.10.2")).toBe(false);
  });

  it("allows patch mismatch when requested", () => {
    expect(
      versionSatisfiesRequest("5.10", "5.10.2", {
        allowPatchVersionMismatch: true,
      }),
    ).toBe(true);
  });

  it("does not allow mismatch when request includes patch", () => {
    expect(
      versionSatisfiesRequest("5.10.0", "5.10.2", {
        allowPatchVersionMismatch: true,
      }),
    ).toBe(false);
  });

  it("does not allow different minor versions", () => {
    expect(
      versionSatisfiesRequest("5.10", "5.11.1", {
        allowPatchVersionMismatch: true,
      }),
    ).toBe(false);
  });
});
