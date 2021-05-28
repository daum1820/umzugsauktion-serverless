import lambdaTester from 'lambda-tester';
import { expect } from 'chai';

import { printHandler } from '../src/app';
import { StatusCode } from '../src/utils/result';

describe('printHandler [GET]', () => {
  it('should not accept string as input', () => {
    try {

      return lambdaTester(printHandler)
        .event({ pathParameters: { x: "a", y: "b" } })
        .expectResult((result: any) => {
          expect(result.statusCode).to.equal(StatusCode.BAD_REQUEST);
        });

    } catch (err) {
      console.log(err);
    }
  });

  it('should not accept negative number as input', () => {
    try { 

      return lambdaTester(printHandler)
        .event({ pathParameters: { x: "10", y: "-1" } })
        .expectResult((result: any) => {
          expect(result.statusCode).to.equal(StatusCode.BAD_REQUEST);
        });

    } catch (err) {
      console.log(err);
    }
  });

  it('should only accept positive number as input', () => {
    try {

      return lambdaTester(printHandler)
        .event({ pathParameters: { x: "3", y: "5" } })
        .expectResult((result: any) => {
          expect(result.statusCode).to.equal(StatusCode.OK);
        });

    } catch (err) {
      console.log(err);
    }
  });

  it('should not print "UmzugsAuktion" because of Prime Numbers', () => {
    try {

      const expectedString = "12345678910111213141516171819202122232425262728293031323334353637383940414243444546474849505152Umzugs54555657585960616263646566676869707172737475767778798081828384858687888990919293949596Auktion9899100";

      return lambdaTester(printHandler)
        .event({ pathParameters: { x: "53", y: "97" } })
        .expectResult((result: any) => {
          expect(result.statusCode).to.equal(StatusCode.OK);

          const body = JSON.parse(result.body);
          expect(body.message).to.equal(expectedString);
        });

    } catch (err) {
      console.log(err);
    }
  });

  it('should not print "Umzugs" or "Auktion" because of the high input values', () => {
    try {

      const expectedString = "123456789101112131415161718192021222324252627282930313233343536373839404142434445464748495051525354555657585960616263646566676869707172737475767778798081828384858687888990919293949596979899100";

      return lambdaTester(printHandler)
        .event({ pathParameters: { x: "101", y: "102" } })
        .expectResult((result: any) => {
          expect(result.statusCode).to.equal(StatusCode.OK);

          const body = JSON.parse(result.body);
          expect(body.message).to.equal(expectedString);
        });

    } catch (err) {
      console.log(err);
    }
  });

  it('should ends with "UmzugsAuktion" instead of 90 and "UmzugsAuktion" instead of 99 and 100', () => {
    try {
      const expectedEndString = "UmzugsAuktion9192939495969798UmzugsAuktion";

      return lambdaTester(printHandler)
        .event({ pathParameters: { x: "9", y: "10" } })
        .expectResult((result: any) => {
          expect(result.statusCode).to.equal(StatusCode.OK);

          const body = JSON.parse(result.body);
          const endsWith = body.message.endsWith(expectedEndString);
          expect(endsWith).to.be.true;
        });

    } catch (err) {
      console.log(err);
    }
  });

  it('should starts with "12Umzugs4AuktionUmzugs78UmzugsAuktion11Umzugs1314UmzugsAuktion" instead of multiples from 3 and 5', () => {
    try {
      const expectedStartString = "12Umzugs4AuktionUmzugs78UmzugsAuktion11Umzugs1314UmzugsAuktion";

      return lambdaTester(printHandler)
        .event({ pathParameters: { x: "3", y: "5" } })
        .expectResult((result: any) => {
          expect(result.statusCode).to.equal(StatusCode.OK);

          const body = JSON.parse(result.body);
          const startsWith = body.message.startsWith(expectedStartString);
          expect(startsWith).to.be.true;
        });

    } catch (err) {
      console.log(err);
    }
  });

});