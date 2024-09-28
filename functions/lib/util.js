const { logger } = require('firebase-functions')

const pkgCms = [
  { altura: 4, largura: 16, comprimento: 24 },
  { altura: 4, largura: 36, comprimento: 28 },
  { altura: 9, largura: 27, comprimento: 18 },
  { altura: 9, largura: 18, comprimento: 13.5 },
  { altura: 13.5, largura: 27, comprimento: 22.5 },
  { altura: 18, largura: 36, comprimento: 27 },
  { altura: 27, largura: 36, comprimento: 27 },
  { altura: 27, largura: 54, comprimento: 36 },
  { altura: 36, largura: 70, comprimento: 36 }
]
const getBestPackage = (pkgCm3Vol) => {
  let smallestPkg
  let smallestPkgCm3
  pkgCms.forEach((currentPkg) => {
    let currentPkgCm3 = 1
    Object.values(currentPkg).forEach((cm) => {
      currentPkgCm3 *= cm
    })
    if (currentPkgCm3 < pkgCm3Vol) return
    if (!smallestPkgCm3 || smallestPkgCm3 > currentPkgCm3) {
      smallestPkg = currentPkg
      smallestPkgCm3 = currentPkgCm3
    }
  })
  return smallestPkg
}

const debugAxiosError = error => {
  const err = new Error(error.message)
  if (error.response) {
    err.status = error.response.status
    err.response = error.response.data
  }
  err.request = error.config
  logger.error(err)
}

module.exports = {
  getBestPackage,
  debugAxiosError
}
