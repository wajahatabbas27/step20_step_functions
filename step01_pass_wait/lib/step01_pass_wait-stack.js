"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step01PassWaitStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const stepFunctions = require("aws-cdk-lib/aws-stepfunctions");
class Step01PassWaitStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // creating steps for the step function
        // Pass does not do any processing. It only takes the input (or filters input) and can add some more data to the state
        // In this case it adds { ..., "subObject": { "triggerTime": 2 } } to the current JSON state
        const pass = new stepFunctions.Pass(this, "Pass", {
            result: stepFunctions.Result.fromObject({ triggerTime: 2 }),
            resultPath: "$.subObject",
        });
        // Wait does not do anything except for waiting for the defined time and then passing the input state to the output.
        // In this case we are waiting for 2 seconds. The value '2' is coming from the previous state {subObject:{"triggerTime": 2}}
        const wait = new stepFunctions.Wait(this, "Wait for Trigger Time", {
            time: stepFunctions.WaitTime.secondsPath("$.subObject.triggerTime")
        });
        //creating chain to define the sequence of execution
        const chain = stepFunctions.Chain.start(pass).next(wait);
        //create a state machine
        new stepFunctions.StateMachine(this, "state_machine_pass_wait", {
            definition: chain
        });
    }
}
exports.Step01PassWaitStack = Step01PassWaitStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDAxX3Bhc3Nfd2FpdC1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0ZXAwMV9wYXNzX3dhaXQtc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBQWdEO0FBRWhELCtEQUErRDtBQUcvRCxNQUFhLG1CQUFvQixTQUFRLG1CQUFLO0lBQzVDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBa0I7UUFDMUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFeEIsdUNBQXVDO1FBRXZDLHNIQUFzSDtRQUN0SCw0RkFBNEY7UUFFNUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUU7WUFDaEQsTUFBTSxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDO1lBQzNELFVBQVUsRUFBRSxhQUFhO1NBQzFCLENBQUMsQ0FBQztRQUVILG9IQUFvSDtRQUNwSCw0SEFBNEg7UUFDNUgsTUFBTSxJQUFJLEdBQUcsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSx1QkFBdUIsRUFBRTtZQUNqRSxJQUFJLEVBQUUsYUFBYSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMseUJBQXlCLENBQUM7U0FDcEUsQ0FBQyxDQUFDO1FBRUgsb0RBQW9EO1FBQ3BELE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUV6RCx3QkFBd0I7UUFDeEIsSUFBSSxhQUFhLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBRTtZQUM5RCxVQUFVLEVBQUUsS0FBSztTQUNsQixDQUFDLENBQUE7SUFDSixDQUFDO0NBQ0Y7QUE1QkQsa0RBNEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RhY2ssIFN0YWNrUHJvcHMgfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIHN0ZXBGdW5jdGlvbnMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXN0ZXBmdW5jdGlvbnMnO1xuaW1wb3J0ICogYXMgc3RlcEZ1bmN0aW9uc1N0ZXBzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zdGVwZnVuY3Rpb25zLXRhc2tzJztcblxuZXhwb3J0IGNsYXNzIFN0ZXAwMVBhc3NXYWl0U3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gY3JlYXRpbmcgc3RlcHMgZm9yIHRoZSBzdGVwIGZ1bmN0aW9uXG5cbiAgICAvLyBQYXNzIGRvZXMgbm90IGRvIGFueSBwcm9jZXNzaW5nLiBJdCBvbmx5IHRha2VzIHRoZSBpbnB1dCAob3IgZmlsdGVycyBpbnB1dCkgYW5kIGNhbiBhZGQgc29tZSBtb3JlIGRhdGEgdG8gdGhlIHN0YXRlXG4gICAgLy8gSW4gdGhpcyBjYXNlIGl0IGFkZHMgeyAuLi4sIFwic3ViT2JqZWN0XCI6IHsgXCJ0cmlnZ2VyVGltZVwiOiAyIH0gfSB0byB0aGUgY3VycmVudCBKU09OIHN0YXRlXG5cbiAgICBjb25zdCBwYXNzID0gbmV3IHN0ZXBGdW5jdGlvbnMuUGFzcyh0aGlzLCBcIlBhc3NcIiwge1xuICAgICAgcmVzdWx0OiBzdGVwRnVuY3Rpb25zLlJlc3VsdC5mcm9tT2JqZWN0KHsgdHJpZ2dlclRpbWU6IDIgfSksXG4gICAgICByZXN1bHRQYXRoOiBcIiQuc3ViT2JqZWN0XCIsXG4gICAgfSk7XG5cbiAgICAvLyBXYWl0IGRvZXMgbm90IGRvIGFueXRoaW5nIGV4Y2VwdCBmb3Igd2FpdGluZyBmb3IgdGhlIGRlZmluZWQgdGltZSBhbmQgdGhlbiBwYXNzaW5nIHRoZSBpbnB1dCBzdGF0ZSB0byB0aGUgb3V0cHV0LlxuICAgIC8vIEluIHRoaXMgY2FzZSB3ZSBhcmUgd2FpdGluZyBmb3IgMiBzZWNvbmRzLiBUaGUgdmFsdWUgJzInIGlzIGNvbWluZyBmcm9tIHRoZSBwcmV2aW91cyBzdGF0ZSB7c3ViT2JqZWN0OntcInRyaWdnZXJUaW1lXCI6IDJ9fVxuICAgIGNvbnN0IHdhaXQgPSBuZXcgc3RlcEZ1bmN0aW9ucy5XYWl0KHRoaXMsIFwiV2FpdCBmb3IgVHJpZ2dlciBUaW1lXCIsIHtcbiAgICAgIHRpbWU6IHN0ZXBGdW5jdGlvbnMuV2FpdFRpbWUuc2Vjb25kc1BhdGgoXCIkLnN1Yk9iamVjdC50cmlnZ2VyVGltZVwiKVxuICAgIH0pO1xuXG4gICAgLy9jcmVhdGluZyBjaGFpbiB0byBkZWZpbmUgdGhlIHNlcXVlbmNlIG9mIGV4ZWN1dGlvblxuICAgIGNvbnN0IGNoYWluID0gc3RlcEZ1bmN0aW9ucy5DaGFpbi5zdGFydChwYXNzKS5uZXh0KHdhaXQpO1xuXG4gICAgLy9jcmVhdGUgYSBzdGF0ZSBtYWNoaW5lXG4gICAgbmV3IHN0ZXBGdW5jdGlvbnMuU3RhdGVNYWNoaW5lKHRoaXMsIFwic3RhdGVfbWFjaGluZV9wYXNzX3dhaXRcIiwge1xuICAgICAgZGVmaW5pdGlvbjogY2hhaW5cbiAgICB9KVxuICB9XG59XG4iXX0=