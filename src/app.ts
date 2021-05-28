import { Handler, Context } from 'aws-lambda';
import { findMultiple } from './services/findMultiple';

// Lambda handler for findMultiple function
export const printHandler: Handler = (event: any, context: Context) => findMultiple(event, context);