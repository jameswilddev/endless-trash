import { generateBase64Pattern } from ".";

describe(`generateBase64Pattern`, () => {
  const base64Samples = [
    ``,
    `Ng==`,
    `Ngg=`,
    `NgjV`,
    `NgjV/Q==`,
    `NgjV/So=`,
    `NgjV/Sqy`,
    `NgjV/SqyuA==`,
    `NgjV/SqyuGc=`,
    `NgjV/SqyuGcB`,
    `NgjV/SqyuGcBYA==`,
    `NgjV/SqyuGcBYOE=`,
    `NgjV/SqyuGcBYOE+`,
    `NgjV/SqyuGcBYOE++g==`,
    `NgjV/SqyuGcBYOE++jw=`,
    `NgjV/SqyuGcBYOE++jx3`,
  ];

  for (
    let sampleLength = 0;
    sampleLength < base64Samples.length;
    sampleLength++
  ) {
    const sample = base64Samples[sampleLength];

    describe(`given ${sampleLength} bytes`, () => {
      let result: string;

      beforeAll(() => {
        result = generateBase64Pattern(sampleLength);
      });

      it(`accepts shorter data`, () => {
        for (
          let shorterBytes = 0;
          shorterBytes < sampleLength;
          shorterBytes++
        ) {
          expect(base64Samples[shorterBytes]).toMatch(result);
        }
      });

      it(`accepts data of the correct length`, () => {
        expect(base64Samples[sampleLength]).toMatch(result);
      });

      for (let index = 0; index < sampleLength; index++) {
        it(`rejects where base64 except at index ${index}`, () => {
          const broken = `${sample.slice(0, index)}$${sample.slice(index + 1)}`;

          expect(broken).not.toMatch(result);
        });
      }

      it(`rejects longer data`, () => {
        for (
          let longerBytes = sampleLength + 1;
          longerBytes < base64Samples.length;
          longerBytes++
        ) {
          expect(base64Samples[longerBytes]).not.toMatch(result);
        }
      });
    });
  }

  describe(`given no length limit`, () => {
    let result: string;

    beforeAll(() => {
      result = generateBase64Pattern(null);
    });

    for (
      let sampleLength = 0;
      sampleLength < base64Samples.length;
      sampleLength++
    ) {
      const sample = base64Samples[sampleLength];

      it(`accepts base64 which is ${sampleLength} bytes long`, () => {
        expect(sample).toMatch(result);
      });

      for (let index = 0; index < sampleLength; index++) {
        it(`rejects where base64 except at index ${index}`, () => {
          const broken = `${sample.slice(0, index)}$${sample.slice(index + 1)}`;

          expect(broken).not.toMatch(result);
        });
      }
    }
  });
});
