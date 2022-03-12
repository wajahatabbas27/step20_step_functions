import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as ddb from 'aws-cdk-lib/aws-dynamodb';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as stepFunctions from 'aws-cdk-lib/aws-stepfunctions';
import * as stepFunctionsTasks from 'aws-cdk-lib/aws-stepfunctions-tasks';


export class Step00SimpleStepFunctionStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    //create a DynamoDb table
    const DynamoTable = new ddb.Table(this, "AddData", {
      partitionKey: {
        name: 'id',
        type: ddb.AttributeType.STRING
      }
    });

    //lambda function that adds data to the dynamoDb table
    const addData = new lambda.Function(this, "addData", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'addData.handler'
    });

    //this function logs the status of the operation

    const echoStatus = new lambda.Function(this, "echoStatus", {
      runtime: lambda.Runtime.NODEJS_12_X,
      code: lambda.Code.fromAsset('lambda'),
      handler: 'echoStatus.handler'
    });

    //giving access to lambda to use dynamodb table
    DynamoTable.grantFullAccess(addData);

    //making environment variable for the lambda to use in the function
    addData.addEnvironment("DynamoTable", DynamoTable.tableName);


    //creating step for the step function here using lambda
    const firstStep = new stepFunctionsTasks.LambdaInvoke(this, "InvokeAddDataLambda", {
      lambdaFunction: addData
    });


    const secondStep = new stepFunctionsTasks.LambdaInvoke(this, "InvokeEchoStatusLambda", {
      lambdaFunction: echoStatus,
      // inputPath: "$.payload"                          -- payload direct bhjdega abhi hmein payload. krna prega
    });

    //creating the chain to define the sequence of execution  - automatically event jrha hai yhn pe second step mein first step se 
    const chain = stepFunctions.Chain.start(firstStep).next(secondStep)                             //yh order hai execution ka 

    //create a state machine to execute or to run
    new stepFunctions.StateMachine(this, "simpleStateMachine", {
      definition: chain
    });

  }
}
