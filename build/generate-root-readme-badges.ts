export function generateRootReadmeBadges(): string {
  return [
    `[![Continuous Integration](https://github.com/jameswilddev/endless-trash/workflows/Continuous%20Integration/badge.svg)](https://github.com/jameswilddev/endless-trash/actions)`,
    `[![License](https://img.shields.io/github/license/jameswilddev/endless-trash.svg)](https://github.com/jameswilddev/endless-trash/blob/master/license)`,
    `[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2Fjameswilddev%2Fendless-trash.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2Fjameswilddev%2Fendless-trash?ref=badge_shield)`,
    `[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)`,
  ].join(` `);
}
