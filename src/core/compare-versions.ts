import { coerce, eq } from "semver";

/**
 * Compare two version strings.
 * @param a First version
 * @param b Second version
 * @returns True if the versions are equal
 */
export function equalVersions(
  a: string | undefined | null,
  b: string | undefined | null,
) {
  if (!a || !b) {
    return false;
  }
  const versionA = coerce(a);
  const versionB = coerce(b);
  return Boolean(versionA && versionB && eq(versionA, versionB));
}

function isMajorMinorVersion(value: string) {
  return /^v?\d+\.\d+$/.test(value.trim());
}

/**
 * Determine if an installed version satisfies the requested version.
 *
 * When `allowPatchVersionMismatch` is enabled, a requested `x.y` version
 * is considered satisfied by an installed `x.y.z` where `z > 0`.
 */
export function versionSatisfiesRequest(
  requested: string | undefined | null,
  installed: string | undefined | null,
  options: { allowPatchVersionMismatch?: boolean } = {},
) {
  if (equalVersions(requested, installed)) {
    return true;
  }

  if (!options.allowPatchVersionMismatch || !requested || !installed) {
    return false;
  }

  if (!isMajorMinorVersion(requested)) {
    return false;
  }

  const requestedVersion = coerce(requested);
  const installedVersion = coerce(installed);
  if (!requestedVersion || !installedVersion) {
    return false;
  }

  return (
    requestedVersion.major === installedVersion.major &&
    requestedVersion.minor === installedVersion.minor &&
    installedVersion.patch > 0
  );
}
