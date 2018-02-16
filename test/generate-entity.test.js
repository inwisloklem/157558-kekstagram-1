const assert = require(`assert`);
const generateEntity = require(`../src/generate-entity.js`);
const {EFFECTS} = require(`../src/data.js`);

describe(`generateEntity`, () => {
  let entity;

  beforeEach(() => {
    entity = generateEntity();
  });

  it(`should return object`, () => {
    assert.equal(typeof entity, `object`);
  });

  describe(`.url`, () => {
    it(`should be equal to 'https://picsum.photos/600/?random'`, () => {
      assert.equal(entity.url, `https://picsum.photos/600/?random`);
    });
  });

  describe(`.scale`, () => {
    it(`should be integer`, () => {
      assert(Number.isInteger(entity.scale));
    });
    it(`should be in range between 0 and 100`, () => {
      assert(entity.scale >= 0 && entity.scale <= 100);
    });
  });

  describe(`.effect`, () => {
    it(`should be value from EFFECTS list`, () => {
      assert.notEqual(EFFECTS.indexOf(entity.effect), -1);
    });
  });

  describe(`.hashtags`, () => {
    it(`should be array`, () => {
      assert(Array.isArray(entity.hashtags));
    });
    it(`should contain no more than 5 elements`, () => {
      assert(entity.hashtags.length <= 5);
    });
  });

  describe(`.description`, () => {
    it(`should be string`, () => {
      assert.equal(typeof entity.description, `string`);
    });
    it(`should be no more than 140 symbols`, () => {
      assert(entity.description.length <= 140);
    });
  });

  describe(`.likes`, () => {
    it(`should be integer`, () => {
      assert(Number.isInteger(entity.likes));
    });
    it(`should be in range between 0 and 1000`, () => {
      assert(entity.likes >= 0 && entity.likes <= 1000);
    });
  });

  describe(`.comments`, () => {
    it(`should be array`, () => {
      assert(Array.isArray(entity.comments));
    });
  });
});
