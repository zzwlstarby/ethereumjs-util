const assert = require('assert')
const ethUtils = require('../dist/index.js')
const BN = require('bn.js')
const eip1014Testdata = require('./testdata/eip1014Examples.json')

describe('constants', function() {
  it('should match constants', function () {
    assert.equal(
      ethUtils.MAX_INTEGER.toString('hex'),
      'ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    )

    assert.equal(
      ethUtils.TWO_POW256.toString('hex'),
      '10000000000000000000000000000000000000000000000000000000000000000'
    )

    assert.equal(
      ethUtils.KECCAK256_NULL_S,
      'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
    )

    assert.equal(
      ethUtils.KECCAK256_NULL.toString('hex'),
      'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
    )

    assert.equal(
      ethUtils.KECCAK256_RLP_ARRAY_S,
      '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'
    )

    assert.equal(
      ethUtils.KECCAK256_RLP_ARRAY.toString('hex'),
      '1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347'
    )

    assert.equal(
      ethUtils.KECCAK256_RLP_S,
      '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421'
    )

    assert.equal(
      ethUtils.KECCAK256_RLP.toString('hex'),
      '56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421'
    )
  })
})

describe('zeros function', function () {
  it('should produce lots of 0s', function () {
    const z60 = ethUtils.zeros(30)
    const zs60 = '000000000000000000000000000000000000000000000000000000000000'
    assert.equal(z60.toString('hex'), zs60)
  })
})

describe('zero address', function () {
  it('should generate a zero address', function () {
    const zeroAddress = ethUtils.zeroAddress()
    assert.equal(zeroAddress, '0x0000000000000000000000000000000000000000')
  })
})

describe('is zero address', function () {
  it('should return true when a zero address is passed', function () {
    const isZeroAddress = ethUtils.isZeroAddress('0x0000000000000000000000000000000000000000')
    assert.equal(isZeroAddress, true)
  })

  it('should return false when the address is not equal to zero', function () {
    const nonZeroAddress = '0x2f015c60e0be116b1f0cd534704db9c92118fb6a'
    assert.equal(ethUtils.isZeroAddress(nonZeroAddress), false)
  })
})

describe('keccak', function () {
  it('should produce a hash', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28'
    const hash = ethUtils.keccak(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('keccak256', function () {
  it('should produce a hash (keccak(a, 256) alias)', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28'
    const hash = ethUtils.keccak256(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('keccak without hexprefix', function () {
  it('should produce a hash', function () {
    const msg = '3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '22ae1937ff93ec72c4d46ff3e854661e3363440acd6f6e4adf8f1a8978382251'
    const hash = ethUtils.keccak(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('keccak-512', function () {
  it('should produce a hash', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '36fdacd0339307068e9ed191773a6f11f6f9f99016bd50f87fd529ab7c87e1385f2b7ef1ac257cc78a12dcb3e5804254c6a7b404a6484966b831eadc721c3d24'
    const hash = ethUtils.keccak(msg, 512)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('sha256', function () {
  it('should produce a sha256', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '58bbda5e10bc11a32d808e40f9da2161a64f00b5557762a161626afe19137445'
    const hash = ethUtils.sha256(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('ripemd160', function () {
  it('should produce a ripemd160', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '4bb0246cbfdfddbe605a374f1187204c896fabfd'
    const hash = ethUtils.ripemd160(msg)
    assert.equal(hash.toString('hex'), r)
  })

  it('should produce a padded ripemd160', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '0000000000000000000000004bb0246cbfdfddbe605a374f1187204c896fabfd'
    const hash = ethUtils.ripemd160(msg, true)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('rlphash', function () {
  it('should produce a keccak-256 hash of the rlp data', function () {
    const msg = '0x3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1'
    const r = '33f491f24abdbdbf175e812b94e7ede338d1c7f01efb68574acd279a15a39cbe'
    const hash = ethUtils.rlphash(msg)
    assert.equal(hash.toString('hex'), r)
  })
})

describe('unpad', function () {
  it('should unpad a string', function () {
    const str = '0000000006600'
    const r = ethUtils.unpad(str)
    assert.equal(r, '6600')
  })
})

describe('unpad a hex string', function () {
  it('should unpad a string', function () {
    const str = '0x0000000006600'
    const r = ethUtils.unpad(str)
    assert.equal(r, '6600')
  })
})

describe('pad', function () {
  it('should left pad a Buffer', function () {
    const buf = Buffer.from([9, 9])
    const padded = ethUtils.setLength(buf, 3)
    assert.equal(padded.toString('hex'), '000909')
  })
  it('should left truncate a Buffer', function () {
    const buf = Buffer.from([9, 0, 9])
    const padded = ethUtils.setLength(buf, 2)
    assert.equal(padded.toString('hex'), '0009')
  })
  it('should left pad a Buffer - alias', function () {
    const buf = Buffer.from([9, 9])
    const padded = ethUtils.setLengthLeft(buf, 3)
    assert.equal(padded.toString('hex'), '000909')
  })
})

describe('rpad', function () {
  it('should right pad a Buffer', function () {
    const buf = Buffer.from([9, 9])
    const padded = ethUtils.setLength(buf, 3, true)
    assert.equal(padded.toString('hex'), '090900')
  })
  it('should right truncate a Buffer', function () {
    const buf = Buffer.from([9, 0, 9])
    const padded = ethUtils.setLength(buf, 2, true)
    assert.equal(padded.toString('hex'), '0900')
  })
  it('should right pad a Buffer - alias', function () {
    const buf = Buffer.from([9, 9])
    const padded = ethUtils.setLengthRight(buf, 3)
    assert.equal(padded.toString('hex'), '090900')
  })
})

describe('bufferToHex', function () {
  it('should convert a buffer to hex', function () {
    const buf = Buffer.from('5b9ac8', 'hex')
    const hex = ethUtils.bufferToHex(buf)
    assert.equal(hex, '0x5b9ac8')
  })
  it('empty buffer', function () {
    const buf = Buffer.alloc(0)
    const hex = ethUtils.bufferToHex(buf)
    assert.strictEqual(hex, '0x')
  })
})

describe('intToHex', function () {
  it('should convert a int to hex', function () {
    const i = 6003400
    const hex = ethUtils.intToHex(i)
    assert.equal(hex, '0x5b9ac8')
  })
})

describe('intToBuffer', function () {
  it('should convert a int to a buffer', function () {
    const i = 6003400
    const buf = ethUtils.intToBuffer(i)
    assert.equal(buf.toString('hex'), '5b9ac8')
  })
})

describe('bufferToInt', function () {
  it('should convert a int to hex', function () {
    const buf = Buffer.from('5b9ac8', 'hex')
    const i = ethUtils.bufferToInt(buf)
    assert.equal(i, 6003400)
    assert.equal(ethUtils.bufferToInt(Buffer.allocUnsafe(0)), 0)
  })
  it('should convert empty input to 0', function () {
    assert.equal(ethUtils.bufferToInt(Buffer.allocUnsafe(0)), 0)
  })
})

describe('fromSigned', function () {
  it('should convert an unsigned (negative) buffer to a singed number', function () {
    const neg = '-452312848583266388373324160190187140051835877600158453279131187530910662656'
    const buf = Buffer.allocUnsafe(32).fill(0)
    buf[0] = 255

    assert.equal(ethUtils.fromSigned(buf), neg)
  })
  it('should convert an unsigned (positive) buffer to a singed number', function () {
    const neg = '452312848583266388373324160190187140051835877600158453279131187530910662656'
    const buf = Buffer.allocUnsafe(32).fill(0)
    buf[0] = 1

    assert.equal(ethUtils.fromSigned(buf), neg)
  })
})

describe('toUnsigned', function () {
  it('should convert a signed (negative) number to unsigned', function () {
    const neg = '-452312848583266388373324160190187140051835877600158453279131187530910662656'
    const hex = 'ff00000000000000000000000000000000000000000000000000000000000000'
    const num = new BN(neg)

    assert.equal(ethUtils.toUnsigned(num).toString('hex'), hex)
  })

  it('should convert a signed (positive) number to unsigned', function () {
    const neg = '452312848583266388373324160190187140051835877600158453279131187530910662656'
    const hex = '0100000000000000000000000000000000000000000000000000000000000000'
    const num = new BN(neg)

    assert.equal(ethUtils.toUnsigned(num).toString('hex'), hex)
  })
})

describe('isValidPrivate', function () {
  const SECP256K1_N = new ethUtils.BN('fffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141', 16)
  it('should fail on short input', function () {
    const tmp = '0011223344'
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on too big input', function () {
    const tmp = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on invalid curve (zero)', function () {
    const tmp = '0000000000000000000000000000000000000000000000000000000000000000'
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on invalid curve (== N)', function () {
    const tmp = SECP256K1_N.toString(16)
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should fail on invalid curve (>= N)', function () {
    const tmp = SECP256K1_N.addn(1).toString(16)
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), false)
  })
  it('should work otherwise (< N)', function () {
    const tmp = SECP256K1_N.subn(1).toString(16)
    assert.equal(ethUtils.isValidPrivate(Buffer.from(tmp, 'hex')), true)
  })
})

describe('isValidPublic', function () {
  it('should fail on too short input', function () {
    const pubKey = Buffer.from('3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae744', 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey), false)
  })
  it('should fail on too big input', function () {
    const pubKey = Buffer.from('3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d00', 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey), false)
  })
  it('should fail on SEC1 key', function () {
    const pubKey = Buffer.from('043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey), false)
  })
  it('shouldn\'t fail on SEC1 key with sanitize enabled', function () {
    const pubKey = Buffer.from('043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey, true), true)
  })
  it('should fail with an invalid SEC1 public key', function () {
    const pubKey = Buffer.from('023a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey, true), false)
  })
  it('should work with compressed keys with sanitize enabled', function () {
    const pubKey = Buffer.from('033a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a', 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey, true), true)
  })
  it('should work with sanitize enabled', function () {
    const pubKey = Buffer.from('043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey, true), true)
  })
  it('should work otherwise', function () {
    const pubKey = Buffer.from('3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.equal(ethUtils.isValidPublic(pubKey), true)
  })
})

describe('importPublic', function () {
  const pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
  it('should work with an Ethereum public key', function () {
    const tmp = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    assert.equal(ethUtils.importPublic(Buffer.from(tmp, 'hex')).toString('hex'), pubKey)
  })
  it('should work with uncompressed SEC1 keys', function () {
    const tmp = '043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    assert.equal(ethUtils.importPublic(Buffer.from(tmp, 'hex')).toString('hex'), pubKey)
  })
  it('should work with compressed SEC1 keys', function () {
    const tmp = '033a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a'
    assert.equal(ethUtils.importPublic(Buffer.from(tmp, 'hex')).toString('hex'), pubKey)
  })
})

describe('publicToAddress', function () {
  it('should produce an address given a public key', function () {
    const pubKey = Buffer.from('3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    const address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    const r = ethUtils.publicToAddress(pubKey)
    assert.equal(r.toString('hex'), address)
  })
  it('should produce an address given a SEC1 public key', function () {
    const pubKey = Buffer.from('043a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    const address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    const r = ethUtils.publicToAddress(pubKey, true)
    assert.equal(r.toString('hex'), address)
  })
  it('shouldn\'t produce an address given an invalid SEC1 public key', function () {
    const pubKey = Buffer.from('023a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d', 'hex')
    assert.throws(function () {
      ethUtils.publicToAddress(pubKey, true)
    })
  })
  it('shouldn\'t produce an address given an invalid public key', function () {
    const pubKey = Buffer.from('3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae744', 'hex')
    assert.throws(function () {
      ethUtils.publicToAddress(pubKey)
    })
  })
})

describe('publicToAddress 0x', function () {
  it('should produce an address given a public key', function () {
    const pubKey = '0x3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    const address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    const r = ethUtils.publicToAddress(pubKey)
    assert.equal(r.toString('hex'), address)
  })
})

describe('privateToPublic', function () {
  it('should produce a public key given a private key', function () {
    const pubKey = '3a443d8381a6798a70c6ff9304bdc8cb0163c23211d11628fae52ef9e0dca11a001cf066d56a8156fc201cd5df8a36ef694eecd258903fca7086c1fae7441e1d'
    const privateKey = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28, 95])
    const r = ethUtils.privateToPublic(privateKey).toString('hex')
    assert.equal(r.toString('hex'), pubKey)
  })
  it('shouldn\'t produce a public key given an invalid private key', function () {
    const privateKey1 = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28, 95, 42])
    const privateKey2 = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28])
    assert.throws(function () {
      ethUtils.privateToPublic(privateKey1)
    })
    assert.throws(function () {
      ethUtils.privateToPublic(privateKey2)
    })
  })
})

describe('privateToAddress', function () {
  it('should produce an address given a private key', function () {
    const address = '2f015c60e0be116b1f0cd534704db9c92118fb6a'
    // Our private key
    const privateKey = Buffer.from([234, 84, 189, 197, 45, 22, 63, 136, 201, 58, 176, 97, 87, 130, 207, 113, 138, 46, 251, 158, 81, 167, 152, 154, 171, 27, 8, 6, 126, 156, 28, 95])
    const r = ethUtils.privateToAddress(privateKey).toString('hex')
    assert.equal(r.toString('hex'), address)
  })
})

describe('generateAddress', function() {
  it('should produce an address given a public key', function() {
    const add = ethUtils
      .generateAddress(Buffer.from('990ccf8a0de58091c028d6ff76bb235ee67c1c39', 'utf8'), 14)
      .toString('hex')
    assert.equal(add.toString('hex'), '936a4295d8d74e310c0c95f0a63e53737b998d12')
  })
})

describe('generateAddress with hex prefix', function () {
  it('should produce an address given a public key', function () {
    const add = ethUtils.generateAddress('0x990ccf8a0de58091c028d6ff76bb235ee67c1c39', 14).toString('hex')
    assert.equal(add.toString('hex'), 'd658a4b8247c14868f3c512fa5cbb6e458e4a989')
  })
})

describe('generateAddress with nonce 0 (special case)', function () {
  it('should produce an address given a public key', function () {
    const add = ethUtils.generateAddress('0x990ccf8a0de58091c028d6ff76bb235ee67c1c39', 0).toString('hex')
    assert.equal(add.toString('hex'), 'bfa69ba91385206bfdd2d8b9c1a5d6c10097a85b')
  })
})

describe('generateAddress2: EIP-1014 testdata examples', function () {
  for (let i = 0; i <= 6; i++) {
    let e = eip1014Testdata[i]
    it(`${e['comment']}: should generate the addresses provided`, function () {
      let result = ethUtils.generateAddress2(e['address'], e['salt'], e['initCode'])
      assert.equal('0x' + result.toString('hex'), e['result'])
    })
  }
})

describe('hex prefix', function () {
  const string = 'd658a4b8247c14868f3c512fa5cbb6e458e4a989'
  it('should add', function () {
    assert.equal(ethUtils.addHexPrefix(string), '0x' + string)
  })
  it('should return on non-string input', function () {
    assert.equal(ethUtils.addHexPrefix(1), 1)
  })
})

describe('isPrecompiled', function () {
  it('should return true', function () {
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000001'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000002'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000003'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000004'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000005'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000006'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000007'), true)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000008'), true)
    assert.equal(ethUtils.isPrecompiled(Buffer.from('0000000000000000000000000000000000000001', 'hex')), true)
  })
  it('should return false', function () {
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000000'), false)
    assert.equal(ethUtils.isPrecompiled('0000000000000000000000000000000000000009'), false)
    assert.equal(ethUtils.isPrecompiled('1000000000000000000000000000000000000000'), false)
    assert.equal(ethUtils.isPrecompiled(Buffer.from('0000000000000000000000000000000000000000', 'hex')), false)
  })
})

describe('toBuffer', function () {
  it('should work', function () {
    // Buffer
    assert.deepEqual(ethUtils.toBuffer(Buffer.allocUnsafe(0)), Buffer.allocUnsafe(0))
    // Array
    assert.deepEqual(ethUtils.toBuffer([]), Buffer.allocUnsafe(0))
    // String
    assert.deepEqual(ethUtils.toBuffer('0x11'), Buffer.from([17]))
    assert.deepEqual(ethUtils.toBuffer('0x1234').toString('hex'), '1234')
    assert.deepEqual(ethUtils.toBuffer('0x'), Buffer.from([]))
    // Number
    assert.deepEqual(ethUtils.toBuffer(1), Buffer.from([1]))
    // null
    assert.deepEqual(ethUtils.toBuffer(null), Buffer.allocUnsafe(0))
    // undefined
    assert.deepEqual(ethUtils.toBuffer(), Buffer.allocUnsafe(0))
    // 'toBN'
    assert.deepEqual(ethUtils.toBuffer(new BN(1)), Buffer.from([1]))
    // 'toArray'
    assert.deepEqual(ethUtils.toBuffer({ toArray: function () { return [ 1 ] } }), Buffer.from([1]))
  })
  it('should fail', function () {
    assert.throws(function () {
      ethUtils.toBuffer({ test: 1 })
    })
  })

  it('should fail with non 0x-prefixed hex strings', function() {
    assert.throws(() => ethUtils.toBuffer('11'), '11')
    assert.throws(() => ethUtils.toBuffer(''))
    assert.throws(() => ethUtils.toBuffer('0xR'), '0xR')
  })
})

describe('baToJSON', function () {
  it('should turn a array of buffers into a pure json object', function () {
    const ba = [Buffer.from([0]), Buffer.from([1]), [Buffer.from([2])]]
    assert.deepEqual(ethUtils.baToJSON(ba), ['0x00', '0x01', ['0x02']])
  })
  it('should turn a buffers into string', function () {
    assert.deepEqual(ethUtils.baToJSON(Buffer.from([0])), '0x00')
  })
})

const echash = Buffer.from('82ff40c0a986c6a5cfad4ddf4c3aa6996f1a7837f9c398e17e5de5cbd5a12b28', 'hex')
const ecprivkey = Buffer.from('3c9229289a6125f7fdf1885a77bb12c37a8d3b4962d936f7e3084dece32a3ca1', 'hex')
const chainId = 3 // ropsten

describe('ecsign', function () {
  it('should produce a signature', function () {
    const sig = ethUtils.ecsign(echash, ecprivkey)
    assert.deepEqual(sig.r, Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex'))
    assert.deepEqual(sig.s, Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex'))
    assert.equal(sig.v, 27)
  })

  it('should produce a signature for Ropsten testnet', function () {
    const sig = ethUtils.ecsign(echash, ecprivkey, chainId)
    assert.deepEqual(sig.r, Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex'))
    assert.deepEqual(sig.s, Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex'))
    assert.equal(sig.v, 41)
  })
})

describe('ecrecover', function () {
  it('should recover a public key', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    const v = 27
    const pubkey = ethUtils.ecrecover(echash, v, r, s)
    assert.deepEqual(pubkey, ethUtils.privateToPublic(ecprivkey))
  })
  it('should recover a public key (chainId = 3)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    const v = 41
    const pubkey = ethUtils.ecrecover(echash, v, r, s, chainId)
    assert.deepEqual(pubkey, ethUtils.privateToPublic(ecprivkey))
  })
  it('should fail on an invalid signature (v = 21)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.throws(function () {
      ethUtils.ecrecover(echash, 21, r, s)
    })
  })
  it('should fail on an invalid signature (v = 29)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.throws(function () {
      ethUtils.ecrecover(echash, 29, r, s)
    })
  })
  it('should fail on an invalid signature (swapped points)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.throws(function () {
      ethUtils.ecrecover(echash, 27, s, r)
    })
  })
})

describe('hashPersonalMessage', function () {
  it('should produce a deterministic hash', function () {
    const h = ethUtils.hashPersonalMessage(Buffer.from('Hello world'))
    assert.deepEqual(h, Buffer.from('8144a6fa26be252b86456491fbcd43c1de7e022241845ffea1c3df066f7cfede', 'hex'))
  })
})

describe('isValidSignature', function () {
  it('should fail on an invalid signature (shorter r))', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1ab', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.equal(ethUtils.isValidSignature(27, r, s), false)
  })
  it('should fail on an invalid signature (shorter s))', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca', 'hex')
    assert.equal(ethUtils.isValidSignature(27, r, s), false)
  })
  it('should fail on an invalid signature (v = 21)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.equal(ethUtils.isValidSignature(21, r, s), false)
  })
  it('should fail on an invalid signature (v = 29)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    assert.equal(ethUtils.isValidSignature(29, r, s), false)
  })
  it('should fail when on homestead and s > secp256k1n/2', function () {
    const SECP256K1_N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16)

    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from(SECP256K1_N_DIV_2.add(new BN('1', 16)).toString(16), 'hex')

    const v = 27
    assert.equal(ethUtils.isValidSignature(v, r, s, true), false)
  })
  it('should not fail when not on homestead but s > secp256k1n/2', function () {
    const SECP256K1_N_DIV_2 = new BN('7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a0', 16)

    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from(SECP256K1_N_DIV_2.add(new BN('1', 16)).toString(16), 'hex')

    const v = 27
    assert.equal(ethUtils.isValidSignature(v, r, s, false), true)
  })
  it('should work otherwise', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    const v = 27
    assert.equal(ethUtils.isValidSignature(v, r, s), true)
  })
  it('should work otherwise(chainId=3)', function () {
    const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
    const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')
    const v = 41
    assert.equal(ethUtils.isValidSignature(v, r, s, false, chainId), true)
  })
  // FIXME: add homestead test
})

const eip55ChecksumAddresses = [
  // All caps
  '0x52908400098527886E0F7030069857D2E4169EE7',
  '0x8617E340B3D01FA5F11F306F4090FD50E238070D',
  // All Lower
  '0xde709f2102306220921060314715629080e2fb77',
  '0x27b1fdb04752bbc536007a920d24acb045561c26',
  // Normal
  '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed',
  '0xfB6916095ca1df60bB79Ce92cE3Ea74c37c5d359',
  '0xdbF03B407c01E7cD3CBea99509d93f8DDDC8C6FB',
  '0xD1220A0cf47c7B9Be7A2E6BA89F429762e7b9aDb'
]

const eip1191ChecksummAddresses = {
  1: [
    '0x88021160c5C792225E4E5452585947470010289d',
    '0x27b1FdB04752bBc536007a920D24ACB045561c26',
    '0x52908400098527886e0f7030069857D2e4169EE7',
    '0x5aaeB6053f3E94C9b9A09f33669435e7Ef1bEAed',
    '0x8617E340b3d01FA5F11F306f4090FD50E238070d',
    '0xd1220a0CF47C7B9Be7A2E6ba89F429762E7B9Adb',
    '0xdBf03b407c01e7cD3CBea99509d93f8dDDC8C6fB',
    '0xDe709F2102306220921060314715629080E2fb77',
    '0xfb6916095Ca1dF60bB79cE92ce3ea74C37c5D359',
  ],
  30: [
    '0x6549F4939460DE12611948B3F82B88C3C8975323',
    '0x27b1FdB04752BBc536007A920D24ACB045561c26',
    '0x3599689E6292B81B2D85451025146515070129Bb',
    '0x52908400098527886E0F7030069857D2E4169ee7',
    '0x5aaEB6053f3e94c9b9a09f33669435E7ef1bEAeD',
    '0x8617E340b3D01Fa5f11f306f4090fd50E238070D',
    '0xD1220A0Cf47c7B9BE7a2e6ba89F429762E7B9adB',
    '0xDBF03B407c01E7CD3cBea99509D93F8Dddc8C6FB',
    '0xDe709F2102306220921060314715629080e2FB77',
    '0xFb6916095cA1Df60bb79ce92cE3EA74c37c5d359'
  ],
  31: [
    '0x42712D45473476B98452F434E72461577D686318',
    '0x27B1FdB04752BbC536007a920D24acB045561C26',
    '0x3599689e6292b81b2D85451025146515070129Bb',
    '0x52908400098527886E0F7030069857D2e4169EE7',
    '0x5aAeb6053F3e94c9b9A09F33669435E7EF1BEaEd',
    '0x66f9664F97F2b50f62d13eA064982F936DE76657',
    '0x8617e340b3D01fa5F11f306F4090Fd50e238070d',
    '0xDE709F2102306220921060314715629080e2Fb77',
    '0xFb6916095CA1dF60bb79CE92ce3Ea74C37c5D359',
    '0xd1220a0CF47c7B9Be7A2E6Ba89f429762E7b9adB',
    '0xdbF03B407C01E7cd3cbEa99509D93f8dDDc8C6fB'
  ]
}

describe('.toChecksumAddress()', function () {
  describe("EIP55", function () {
    it('should work', function () {
      for (let i = 0; i < eip55ChecksumAddresses.length; i++) {
        let tmp = eip55ChecksumAddresses[i]
        assert.equal(ethUtils.toChecksumAddress(tmp.toLowerCase()), tmp)
      }
    })
  })

  describe("EIP1191", function () {
    it('Should encode the example addresses correctly', function () {
      for (const [chainId, addresses] of Object.entries(eip1191ChecksummAddresses)) {
        for (const addr of addresses) {
          assert.equal(ethUtils.toChecksumAddress(addr.toLowerCase(), chainId), addr)
        }
      }
    })
  })
})

describe('.isValidChecksumAddress()', function () {
  describe("EIP55", function () {
    it('should return true', function () {
      for (let i = 0; i < eip55ChecksumAddresses.length; i++) {
        assert.equal(ethUtils.isValidChecksumAddress(eip55ChecksumAddresses[i]), true)
      }
    })
    it('should validate', function () {
      assert.equal(ethUtils.isValidChecksumAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6a'), false)
    })
  })

  describe("EIP1191", function () {
    it('Should return true for the example addresses', function () {
      for (const [chainId, addresses] of Object.entries(eip1191ChecksummAddresses)) {
        for (const addr of addresses) {
          assert.equal(ethUtils.isValidChecksumAddress(addr, chainId), true)
        }
      }
    })

    it("Should return false for invalid cases", function () {
      // If we set the chain id, an EIP55 encoded address should be invalid
      for (let i = 0; i < eip55ChecksumAddresses.length; i++) {
        assert.equal(ethUtils.isValidChecksumAddress(eip55ChecksumAddresses[i], 1), false)
      }

      assert.equal(ethUtils.isValidChecksumAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6a', 1), false)
    })

    it("Should return false if the wrong chain id is used", function () {
      for (const [chainId, addresses] of Object.entries(eip1191ChecksummAddresses)) {
        for (const addr of addresses) {
          assert.equal(ethUtils.isValidChecksumAddress(addr, chainId + 1), false)
        }
      }
    })
  })
})

describe('.isValidAddress()', function () {
  it('should return true', function () {
    assert.equal(ethUtils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6a'), true)
    assert.equal(ethUtils.isValidAddress('0x52908400098527886E0F7030069857D2E4169EE7'), true)
  })
  it('should return false', function () {
    assert.equal(ethUtils.isValidAddress('2f015c60e0be116b1f0cd534704db9c92118fb6a'), false)
    assert.equal(ethUtils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6'), false)
    assert.equal(ethUtils.isValidAddress('0x2f015c60e0be116b1f0cd534704db9c92118fb6aa'), false)
    assert.equal(ethUtils.isValidAddress('0X52908400098527886E0F7030069857D2E4169EE7'), false)
    assert.equal(ethUtils.isValidAddress('x2f015c60e0be116b1f0cd534704db9c92118fb6a'), false)
  })
})

describe('message sig', function () {
  const r = Buffer.from('99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9', 'hex')
  const s = Buffer.from('129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca66', 'hex')

  it('should return hex strings that the RPC can use', function () {
    assert.equal(ethUtils.toRpcSig(27, r, s), '0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca661b')
    assert.deepEqual(ethUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca661b'), {
      v: 27,
      r: r,
      s: s
    })
    assert.deepEqual(ethUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca6600'), {
      v: 27,
      r: r,
      s: s
    })
  })

  it('should throw on invalid length', function () {
    assert.throws(function () {
      ethUtils.fromRpcSig('')
    })
    assert.throws(function () {
      ethUtils.fromRpcSig('0x99e71a99cb2270b8cac5254f9e99b6210c6c10224a1579cf389ef88b20a1abe9129ff05af364204442bdb53ab6f18a99ab48acc9326fa689f228040429e3ca660042')
    })
  })

  it('pad short r and s values', function () {
    assert.equal(ethUtils.toRpcSig(27, r.slice(20), s.slice(20)), '0x00000000000000000000000000000000000000004a1579cf389ef88b20a1abe90000000000000000000000000000000000000000326fa689f228040429e3ca661b')
  })

  it('should throw on invalid v value', function () {
    assert.throws(function () {
      ethUtils.toRpcSig(1, r, s)
    })
  })
})
