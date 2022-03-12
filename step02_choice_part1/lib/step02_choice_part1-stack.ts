import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as stepFunction from 'aws-cdk-lib/aws-stepfunctions';
import * as stepFunctionTasks from 'aws-cdk-lib/aws-stepfunctions-tasks';

export class Step02ChoicePart1Stack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // created a dynamodb Table

    const DynamoTable = new ddb.Table(this, "DynamoTable", {
      partitionKey: {
        name: "id",
        type: ddb.AttributeType.STRING,
      },
    });

    // this function adds data to the dynamoDB table

    const addData = new lambda.Function(this, "addData", {
      runtime: lambda.Runtime.NODEJS_12_X, // execution environment
      code: lambda.Code.fromAsset("lambda"), // code loaded from "lambda" directory
      handler: "addData.handler",
    });

    // giving access to the lambda function to do operations on the dynamodb table

    DynamoTable.grantFullAccess(addData);
    addData.addEnvironment("DynamoTable", DynamoTable.tableName);

    // creating steps for the step function take start aur next mein dein isko
    const lambdaFn = new stepFunctionTasks.LambdaInvoke(this, "InvokeAddDataLambda", {
      lambdaFunction: addData
    });

    // Reaching a Succeed state terminates the state machine execution with a succesful status.
    const success = new stepFunction.Succeed(this, "We did it");

    // Reaching a Fail state terminates the state machine execution with a failure status.
    const jobFailed = new stepFunction.Fail(this, "Job Failed", {
      cause: "Lambda Job Failed",
      error: "could not add data to the dynamoDb",
    });


    // Here we are putting a condition to choose our next state. If the last state (lambdafn) returns {operationSuccessful: true}
    // then we end our state machine with a success state otherwise with a fail state
    //agr success hoga to phr hm execute krdeinge wrna failed wala execute krdeinge

    const choice = new stepFunction.Choice(this, "operationSuccesful?");

    choice.when(stepFunction.Condition.booleanEquals("$.Payload.operationSuccessful", true), success);
    choice.when(stepFunction.Condition.booleanEquals("$.Payload.operationSuccessful", false), jobFailed);

    // creating chain to define the sequence of execution
    const chain = stepFunction.Chain.start(lambdaFn).next(choice);

    //create a state machine
    new stepFunction.StateMachine(this, "choiceStateMachine", {
      definition: chain
    })

  }
}
