const assert = require(`assert`);
const generateEntity = require(`../src/generate-entity.js`);

const {
  COMMENTS,
  EFFECTS,
} = require(`../src/data.js`);

const {
  eachIsInArray,
  eachLengthIsLt,
  eachStartsWithSymbol,
  eachIsUnique,
} = require(`../src/utils.js`);

describe(`generateEntity`, () => {
  let entity;

  beforeEach(() => {
    entity = generateEntity();
  });

  it(`should return object`, () => {
    assert.equal(typeof entity, `object`);
  });

  describe(`.url`, () => {
    it(`should look like /api/posts/DATE/image`, () => {
      assert(/api\/posts\/\d+\/image/.test(entity.url));
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
    it(`should be from EFFECTS list`, () => {
      assert(EFFECTS.includes(entity.effect));
    });
  });

  describe(`.hashtags`, () => {
    it(`should be string`, () => {
      assert(typeof entity.hashtags === `string`);
    });
    it(`should contain no more than 5 words`, () => {
      assert(entity.hashtags.split(` `).length <= 5);
    });
    it(`should contain words that starts with #`, () => {
      assert(eachStartsWithSymbol(entity.hashtags ? entity.hashtags.split(` `) : [], `#`));
    });
    it(`should contain unique words`, () => {
      assert(eachIsUnique(entity.hashtags.split(` `)));
    });
    it(`should contain words less than 20 symbols each`, () => {
      assert(eachLengthIsLt(entity.hashtags.split(` `), 20));
    });
  });

  describe(`.description`, () => {
    it(`should be string`, () => {
      assert.equal(typeof entity.description, `string`);
    });
    it(`should be no more than 140 symbols`, () => {
      assert(entity.description.length <= 140);
    });
    it(`should be from COMMENTS list`, () => {
      assert(COMMENTS.includes(entity.description));
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
    it(`should contain elements less than 140 symbols each`, () => {
      assert(eachLengthIsLt(entity.comments, 140));
    });
    it(`should contain elements from COMMENTS list`, () => {
      assert(eachIsInArray(entity.comments, COMMENTS));
    });
  });
});
