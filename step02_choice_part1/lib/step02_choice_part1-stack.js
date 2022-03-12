"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step02ChoicePart1Stack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const lambda = require("aws-cdk-lib/aws-lambda");
const ddb = require("aws-cdk-lib/aws-dynamodb");
const stepFunction = require("aws-cdk-lib/aws-stepfunctions");
const stepFunctionTasks = require("aws-cdk-lib/aws-stepfunctions-tasks");
class Step02ChoicePart1Stack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
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
            runtime: lambda.Runtime.NODEJS_12_X,
            code: lambda.Code.fromAsset("lambda"),
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
        });
    }
}
exports.Step02ChoicePart1Stack = Step02ChoicePart1Stack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDAyX2Nob2ljZV9wYXJ0MS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0ZXAwMl9jaG9pY2VfcGFydDEtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQWdEO0FBRWhELGlEQUFpRDtBQUNqRCxnREFBZ0Q7QUFDaEQsOERBQThEO0FBQzlELHlFQUF5RTtBQUV6RSxNQUFhLHNCQUF1QixTQUFRLG1CQUFLO0lBQy9DLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsMkJBQTJCO1FBRTNCLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ3JELFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQy9CO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsZ0RBQWdEO1FBRWhELE1BQU0sT0FBTyxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsU0FBUyxFQUFFO1lBQ25ELE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDbkMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxPQUFPLEVBQUUsaUJBQWlCO1NBQzNCLENBQUMsQ0FBQztRQUVILDhFQUE4RTtRQUU5RSxXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3JDLE9BQU8sQ0FBQyxjQUFjLENBQUMsYUFBYSxFQUFFLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU3RCwwRUFBMEU7UUFDMUUsTUFBTSxRQUFRLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQy9FLGNBQWMsRUFBRSxPQUFPO1NBQ3hCLENBQUMsQ0FBQztRQUVILDJGQUEyRjtRQUMzRixNQUFNLE9BQU8sR0FBRyxJQUFJLFlBQVksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRTVELHNGQUFzRjtRQUN0RixNQUFNLFNBQVMsR0FBRyxJQUFJLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUMxRCxLQUFLLEVBQUUsbUJBQW1CO1lBQzFCLEtBQUssRUFBRSxvQ0FBb0M7U0FDNUMsQ0FBQyxDQUFDO1FBR0gsNkhBQTZIO1FBQzdILGlGQUFpRjtRQUNqRiwrRUFBK0U7UUFFL0UsTUFBTSxNQUFNLEdBQUcsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO1FBRXBFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsK0JBQStCLEVBQUUsSUFBSSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbEcsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQywrQkFBK0IsRUFBRSxLQUFLLENBQUMsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUVyRyxxREFBcUQ7UUFDckQsTUFBTSxLQUFLLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBRTlELHdCQUF3QjtRQUN4QixJQUFJLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ3hELFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQTtJQUVKLENBQUM7Q0FDRjtBQTNERCx3REEyREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgbGFtYmRhIGZyb20gJ2F3cy1jZGstbGliL2F3cy1sYW1iZGEnO1xuaW1wb3J0ICogYXMgZGRiIGZyb20gJ2F3cy1jZGstbGliL2F3cy1keW5hbW9kYic7XG5pbXBvcnQgKiBhcyBzdGVwRnVuY3Rpb24gZnJvbSAnYXdzLWNkay1saWIvYXdzLXN0ZXBmdW5jdGlvbnMnO1xuaW1wb3J0ICogYXMgc3RlcEZ1bmN0aW9uVGFza3MgZnJvbSAnYXdzLWNkay1saWIvYXdzLXN0ZXBmdW5jdGlvbnMtdGFza3MnO1xuXG5leHBvcnQgY2xhc3MgU3RlcDAyQ2hvaWNlUGFydDFTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICAvLyBjcmVhdGVkIGEgZHluYW1vZGIgVGFibGVcblxuICAgIGNvbnN0IER5bmFtb1RhYmxlID0gbmV3IGRkYi5UYWJsZSh0aGlzLCBcIkR5bmFtb1RhYmxlXCIsIHtcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiBcImlkXCIsXG4gICAgICAgIHR5cGU6IGRkYi5BdHRyaWJ1dGVUeXBlLlNUUklORyxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyB0aGlzIGZ1bmN0aW9uIGFkZHMgZGF0YSB0byB0aGUgZHluYW1vREIgdGFibGVcblxuICAgIGNvbnN0IGFkZERhdGEgPSBuZXcgbGFtYmRhLkZ1bmN0aW9uKHRoaXMsIFwiYWRkRGF0YVwiLCB7XG4gICAgICBydW50aW1lOiBsYW1iZGEuUnVudGltZS5OT0RFSlNfMTJfWCwgLy8gZXhlY3V0aW9uIGVudmlyb25tZW50XG4gICAgICBjb2RlOiBsYW1iZGEuQ29kZS5mcm9tQXNzZXQoXCJsYW1iZGFcIiksIC8vIGNvZGUgbG9hZGVkIGZyb20gXCJsYW1iZGFcIiBkaXJlY3RvcnlcbiAgICAgIGhhbmRsZXI6IFwiYWRkRGF0YS5oYW5kbGVyXCIsXG4gICAgfSk7XG5cbiAgICAvLyBnaXZpbmcgYWNjZXNzIHRvIHRoZSBsYW1iZGEgZnVuY3Rpb24gdG8gZG8gb3BlcmF0aW9ucyBvbiB0aGUgZHluYW1vZGIgdGFibGVcblxuICAgIER5bmFtb1RhYmxlLmdyYW50RnVsbEFjY2VzcyhhZGREYXRhKTtcbiAgICBhZGREYXRhLmFkZEVudmlyb25tZW50KFwiRHluYW1vVGFibGVcIiwgRHluYW1vVGFibGUudGFibGVOYW1lKTtcblxuICAgIC8vIGNyZWF0aW5nIHN0ZXBzIGZvciB0aGUgc3RlcCBmdW5jdGlvbiB0YWtlIHN0YXJ0IGF1ciBuZXh0IG1laW4gZGVpbiBpc2tvXG4gICAgY29uc3QgbGFtYmRhRm4gPSBuZXcgc3RlcEZ1bmN0aW9uVGFza3MuTGFtYmRhSW52b2tlKHRoaXMsIFwiSW52b2tlQWRkRGF0YUxhbWJkYVwiLCB7XG4gICAgICBsYW1iZGFGdW5jdGlvbjogYWRkRGF0YVxuICAgIH0pO1xuXG4gICAgLy8gUmVhY2hpbmcgYSBTdWNjZWVkIHN0YXRlIHRlcm1pbmF0ZXMgdGhlIHN0YXRlIG1hY2hpbmUgZXhlY3V0aW9uIHdpdGggYSBzdWNjZXNmdWwgc3RhdHVzLlxuICAgIGNvbnN0IHN1Y2Nlc3MgPSBuZXcgc3RlcEZ1bmN0aW9uLlN1Y2NlZWQodGhpcywgXCJXZSBkaWQgaXRcIik7XG5cbiAgICAvLyBSZWFjaGluZyBhIEZhaWwgc3RhdGUgdGVybWluYXRlcyB0aGUgc3RhdGUgbWFjaGluZSBleGVjdXRpb24gd2l0aCBhIGZhaWx1cmUgc3RhdHVzLlxuICAgIGNvbnN0IGpvYkZhaWxlZCA9IG5ldyBzdGVwRnVuY3Rpb24uRmFpbCh0aGlzLCBcIkpvYiBGYWlsZWRcIiwge1xuICAgICAgY2F1c2U6IFwiTGFtYmRhIEpvYiBGYWlsZWRcIixcbiAgICAgIGVycm9yOiBcImNvdWxkIG5vdCBhZGQgZGF0YSB0byB0aGUgZHluYW1vRGJcIixcbiAgICB9KTtcblxuXG4gICAgLy8gSGVyZSB3ZSBhcmUgcHV0dGluZyBhIGNvbmRpdGlvbiB0byBjaG9vc2Ugb3VyIG5leHQgc3RhdGUuIElmIHRoZSBsYXN0IHN0YXRlIChsYW1iZGFmbikgcmV0dXJucyB7b3BlcmF0aW9uU3VjY2Vzc2Z1bDogdHJ1ZX1cbiAgICAvLyB0aGVuIHdlIGVuZCBvdXIgc3RhdGUgbWFjaGluZSB3aXRoIGEgc3VjY2VzcyBzdGF0ZSBvdGhlcndpc2Ugd2l0aCBhIGZhaWwgc3RhdGVcbiAgICAvL2FnciBzdWNjZXNzIGhvZ2EgdG8gcGhyIGhtIGV4ZWN1dGUga3JkZWluZ2Ugd3JuYSBmYWlsZWQgd2FsYSBleGVjdXRlIGtyZGVpbmdlXG5cbiAgICBjb25zdCBjaG9pY2UgPSBuZXcgc3RlcEZ1bmN0aW9uLkNob2ljZSh0aGlzLCBcIm9wZXJhdGlvblN1Y2Nlc2Z1bD9cIik7XG5cbiAgICBjaG9pY2Uud2hlbihzdGVwRnVuY3Rpb24uQ29uZGl0aW9uLmJvb2xlYW5FcXVhbHMoXCIkLlBheWxvYWQub3BlcmF0aW9uU3VjY2Vzc2Z1bFwiLCB0cnVlKSwgc3VjY2Vzcyk7XG4gICAgY2hvaWNlLndoZW4oc3RlcEZ1bmN0aW9uLkNvbmRpdGlvbi5ib29sZWFuRXF1YWxzKFwiJC5QYXlsb2FkLm9wZXJhdGlvblN1Y2Nlc3NmdWxcIiwgZmFsc2UpLCBqb2JGYWlsZWQpO1xuXG4gICAgLy8gY3JlYXRpbmcgY2hhaW4gdG8gZGVmaW5lIHRoZSBzZXF1ZW5jZSBvZiBleGVjdXRpb25cbiAgICBjb25zdCBjaGFpbiA9IHN0ZXBGdW5jdGlvbi5DaGFpbi5zdGFydChsYW1iZGFGbikubmV4dChjaG9pY2UpO1xuXG4gICAgLy9jcmVhdGUgYSBzdGF0ZSBtYWNoaW5lXG4gICAgbmV3IHN0ZXBGdW5jdGlvbi5TdGF0ZU1hY2hpbmUodGhpcywgXCJjaG9pY2VTdGF0ZU1hY2hpbmVcIiwge1xuICAgICAgZGVmaW5pdGlvbjogY2hhaW5cbiAgICB9KVxuXG4gIH1cbn1cbiJdfQ==