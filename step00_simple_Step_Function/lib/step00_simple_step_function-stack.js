"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step00SimpleStepFunctionStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const ddb = require("aws-cdk-lib/aws-dynamodb");
const lambda = require("aws-cdk-lib/aws-lambda");
const stepFunctions = require("aws-cdk-lib/aws-stepfunctions");
const stepFunctionsTasks = require("aws-cdk-lib/aws-stepfunctions-tasks");
class Step00SimpleStepFunctionStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
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
        });
        //creating the chain to define the sequence of execution  - automatically event jrha hai yhn pe second step mein first step se 
        const chain = stepFunctions.Chain.start(firstStep).next(secondStep); //yh order hai execution ka 
        //create a state machine to execute or to run
        new stepFunctions.StateMachine(this, "simpleStateMachine", {
            definition: chain
        });
    }
}
exports.Step00SimpleStepFunctionStack = Step00SimpleStepFunctionStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDAwX3NpbXBsZV9zdGVwX2Z1bmN0aW9uLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RlcDAwX3NpbXBsZV9zdGVwX2Z1bmN0aW9uLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFnRDtBQUVoRCxnREFBZ0Q7QUFDaEQsaURBQWlEO0FBQ2pELCtEQUErRDtBQUMvRCwwRUFBMEU7QUFHMUUsTUFBYSw2QkFBOEIsU0FBUSxtQkFBSztJQUN0RCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLHlCQUF5QjtRQUN6QixNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNqRCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsTUFBTTthQUMvQjtTQUNGLENBQUMsQ0FBQztRQUVILHNEQUFzRDtRQUN0RCxNQUFNLE9BQU8sR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFNBQVMsRUFBRTtZQUNuRCxPQUFPLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ25DLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7WUFDckMsT0FBTyxFQUFFLGlCQUFpQjtTQUMzQixDQUFDLENBQUM7UUFFSCxnREFBZ0Q7UUFFaEQsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxZQUFZLEVBQUU7WUFDekQsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVztZQUNuQyxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sRUFBRSxvQkFBb0I7U0FDOUIsQ0FBQyxDQUFDO1FBRUgsK0NBQStDO1FBQy9DLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFckMsbUVBQW1FO1FBQ25FLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUc3RCx1REFBdUQ7UUFDdkQsTUFBTSxTQUFTLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQ2pGLGNBQWMsRUFBRSxPQUFPO1NBQ3hCLENBQUMsQ0FBQztRQUdILE1BQU0sVUFBVSxHQUFHLElBQUksa0JBQWtCLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRTtZQUNyRixjQUFjLEVBQUUsVUFBVTtTQUUzQixDQUFDLENBQUM7UUFFSCwrSEFBK0g7UUFDL0gsTUFBTSxLQUFLLEdBQUcsYUFBYSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFBLENBQTZCLDRCQUE0QjtRQUU1SCw2Q0FBNkM7UUFDN0MsSUFBSSxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUN6RCxVQUFVLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUM7SUFFTCxDQUFDO0NBQ0Y7QUF0REQsc0VBc0RDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIGRkYiBmcm9tICdhd3MtY2RrLWxpYi9hd3MtZHluYW1vZGInO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgc3RlcEZ1bmN0aW9ucyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3RlcGZ1bmN0aW9ucyc7XG5pbXBvcnQgKiBhcyBzdGVwRnVuY3Rpb25zVGFza3MgZnJvbSAnYXdzLWNkay1saWIvYXdzLXN0ZXBmdW5jdGlvbnMtdGFza3MnO1xuXG5cbmV4cG9ydCBjbGFzcyBTdGVwMDBTaW1wbGVTdGVwRnVuY3Rpb25TdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvL2NyZWF0ZSBhIER5bmFtb0RiIHRhYmxlXG4gICAgY29uc3QgRHluYW1vVGFibGUgPSBuZXcgZGRiLlRhYmxlKHRoaXMsIFwiQWRkRGF0YVwiLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgdHlwZTogZGRiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvL2xhbWJkYSBmdW5jdGlvbiB0aGF0IGFkZHMgZGF0YSB0byB0aGUgZHluYW1vRGIgdGFibGVcbiAgICBjb25zdCBhZGREYXRhID0gbmV3IGxhbWJkYS5GdW5jdGlvbih0aGlzLCBcImFkZERhdGFcIiwge1xuICAgICAgcnVudGltZTogbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzEyX1gsXG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoJ2xhbWJkYScpLFxuICAgICAgaGFuZGxlcjogJ2FkZERhdGEuaGFuZGxlcidcbiAgICB9KTtcblxuICAgIC8vdGhpcyBmdW5jdGlvbiBsb2dzIHRoZSBzdGF0dXMgb2YgdGhlIG9wZXJhdGlvblxuXG4gICAgY29uc3QgZWNob1N0YXR1cyA9IG5ldyBsYW1iZGEuRnVuY3Rpb24odGhpcywgXCJlY2hvU3RhdHVzXCIsIHtcbiAgICAgIHJ1bnRpbWU6IGxhbWJkYS5SdW50aW1lLk5PREVKU18xMl9YLFxuICAgICAgY29kZTogbGFtYmRhLkNvZGUuZnJvbUFzc2V0KCdsYW1iZGEnKSxcbiAgICAgIGhhbmRsZXI6ICdlY2hvU3RhdHVzLmhhbmRsZXInXG4gICAgfSk7XG5cbiAgICAvL2dpdmluZyBhY2Nlc3MgdG8gbGFtYmRhIHRvIHVzZSBkeW5hbW9kYiB0YWJsZVxuICAgIER5bmFtb1RhYmxlLmdyYW50RnVsbEFjY2VzcyhhZGREYXRhKTtcblxuICAgIC8vbWFraW5nIGVudmlyb25tZW50IHZhcmlhYmxlIGZvciB0aGUgbGFtYmRhIHRvIHVzZSBpbiB0aGUgZnVuY3Rpb25cbiAgICBhZGREYXRhLmFkZEVudmlyb25tZW50KFwiRHluYW1vVGFibGVcIiwgRHluYW1vVGFibGUudGFibGVOYW1lKTtcblxuXG4gICAgLy9jcmVhdGluZyBzdGVwIGZvciB0aGUgc3RlcCBmdW5jdGlvbiBoZXJlIHVzaW5nIGxhbWJkYVxuICAgIGNvbnN0IGZpcnN0U3RlcCA9IG5ldyBzdGVwRnVuY3Rpb25zVGFza3MuTGFtYmRhSW52b2tlKHRoaXMsIFwiSW52b2tlQWRkRGF0YUxhbWJkYVwiLCB7XG4gICAgICBsYW1iZGFGdW5jdGlvbjogYWRkRGF0YVxuICAgIH0pO1xuXG5cbiAgICBjb25zdCBzZWNvbmRTdGVwID0gbmV3IHN0ZXBGdW5jdGlvbnNUYXNrcy5MYW1iZGFJbnZva2UodGhpcywgXCJJbnZva2VFY2hvU3RhdHVzTGFtYmRhXCIsIHtcbiAgICAgIGxhbWJkYUZ1bmN0aW9uOiBlY2hvU3RhdHVzLFxuICAgICAgLy8gaW5wdXRQYXRoOiBcIiQucGF5bG9hZFwiICAgICAgICAgICAgICAgICAgICAgICAgICAtLSBwYXlsb2FkIGRpcmVjdCBiaGpkZWdhIGFiaGkgaG1laW4gcGF5bG9hZC4ga3JuYSBwcmVnYVxuICAgIH0pO1xuXG4gICAgLy9jcmVhdGluZyB0aGUgY2hhaW4gdG8gZGVmaW5lIHRoZSBzZXF1ZW5jZSBvZiBleGVjdXRpb24gIC0gYXV0b21hdGljYWxseSBldmVudCBqcmhhIGhhaSB5aG4gcGUgc2Vjb25kIHN0ZXAgbWVpbiBmaXJzdCBzdGVwIHNlIFxuICAgIGNvbnN0IGNoYWluID0gc3RlcEZ1bmN0aW9ucy5DaGFpbi5zdGFydChmaXJzdFN0ZXApLm5leHQoc2Vjb25kU3RlcCkgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8veWggb3JkZXIgaGFpIGV4ZWN1dGlvbiBrYSBcblxuICAgIC8vY3JlYXRlIGEgc3RhdGUgbWFjaGluZSB0byBleGVjdXRlIG9yIHRvIHJ1blxuICAgIG5ldyBzdGVwRnVuY3Rpb25zLlN0YXRlTWFjaGluZSh0aGlzLCBcInNpbXBsZVN0YXRlTWFjaGluZVwiLCB7XG4gICAgICBkZWZpbml0aW9uOiBjaGFpblxuICAgIH0pO1xuXG4gIH1cbn1cbiJdfQ==