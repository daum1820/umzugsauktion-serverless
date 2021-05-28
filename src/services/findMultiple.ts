import { Context } from "aws-lambda";
import { StatusCode, ResultBuilder } from "../utils/result";

/**
 * TODO: use .env to make it custom.
 */
const ARRAY_SIZE: number = 100;

/**
 * When the @testNumber is @multipleOf, we add a @replacementString to the @response
 */
const isMultiple = (testNumber: number, multipleOf: number, response: string[], replacementString: string) => {
  if (testNumber % multipleOf === 0) {
    response.push(replacementString);
  }
}

export const findMultiple = async (event: any, context?: Context) =>{
  console.log(`[START] context=${context.functionName}`, event.pathParameters);

  try {
    let result: string = '';

    const x: number = Number(event.pathParameters.x);
    const y: number = Number(event.pathParameters.y);
  
    // Validate inputs if their as number and positives.
    if (isNaN(x) || isNaN(y) || Math.min(x, y , 1) < 1) {
      return ResultBuilder.error(StatusCode.BAD_REQUEST, "The input values must be positives numbers.");
    }
  
    for (let i = 1; i <= ARRAY_SIZE; i++) {
      let response: string[] = [];
      
      isMultiple(i, x, response, "Umzugs");
      isMultiple(i, y, response, "Auktion");
  
      // add replacement strings to response or the number itself, if it is the case.
      if (response.length === 0) {
        result += i;
      } else {
        result += response.join('');
      }
    }
  
    const rb = ResultBuilder.success(result);
    console.log(`[END] context=${context.functionName}`);
    return rb;

  } catch (e) {
    return ResultBuilder.error(StatusCode.INTERNAL_SERVER_ERROR, e);
  }
}