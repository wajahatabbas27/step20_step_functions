"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Step03ParallelStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const stepFunctions = require("aws-cdk-lib/aws-stepfunctions");
class Step03ParallelStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        const parallelBranch1 = new stepFunctions.Pass(this, "parallelBranch1", {
            result: stepFunctions.Result.fromObject({
                message: "hello parallel branch 1",
            }),
            resultPath: "$.parallel_branch_1",
        });
        const parallelBranch2 = new stepFunctions.Pass(this, "parallelBranch2", {
            result: stepFunctions.Result.fromObject({
                message: "hello parallel branch 2",
            }),
            resultPath: "$.parallel_branch_2",
        });
        const parallelBranch3 = new stepFunctions.Pass(this, "parallelBranch3", {
            result: stepFunctions.Result.fromObject({
                message: "hello parallel branch 3",
            }),
            resultPath: "$.parallel_branch_3",
        });
        const failureBranch = new stepFunctions.Pass(this, "failureBranch", {
            result: stepFunctions.Result.fromObject({
                message: "hello failure branch",
            }),
            resultPath: "$.failure_branch",
        });
        const success = new stepFunctions.Succeed(this, "successBranch");
        //defining parallel for the branch to run all things in parallel
        const parallel = new stepFunctions.Parallel(this, "Do the work in parallel");
        // Add branches to be executed in parallel at the same time
        parallel.branch(parallelBranch1);
        parallel.branch(parallelBranch2);
        parallel.branch(parallelBranch3);
        // Retry the whole workflow if something goes wrong
        parallel.addRetry({ maxAttempts: 1 });
        // How to recover from errors
        parallel.addCatch(failureBranch);
        // What to do in case everything succeeded
        parallel.next(success);
        // create a chain
        const chain = stepFunctions.Chain.start(parallel);
        // create a state machine
        new stepFunctions.StateMachine(this, "parallelStateMachine", {
            definition: chain,
        });
    }
}
exports.Step03ParallelStack = Step03ParallelStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RlcDAzX3BhcmFsbGVsLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic3RlcDAzX3BhcmFsbGVsLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDZDQUFnRDtBQUVoRCwrREFBK0Q7QUFHL0QsTUFBYSxtQkFBb0IsU0FBUSxtQkFBSztJQUM1QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLE1BQU0sZUFBZSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDdEUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUN0QyxPQUFPLEVBQUUseUJBQXlCO2FBQ25DLENBQUM7WUFDRixVQUFVLEVBQUUscUJBQXFCO1NBQ2xDLENBQUMsQ0FBQztRQUVILE1BQU0sZUFBZSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDdEUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUN0QyxPQUFPLEVBQUUseUJBQXlCO2FBQ25DLENBQUM7WUFDRixVQUFVLEVBQUUscUJBQXFCO1NBQ2xDLENBQUMsQ0FBQztRQUVILE1BQU0sZUFBZSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDdEUsTUFBTSxFQUFFLGFBQWEsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDO2dCQUN0QyxPQUFPLEVBQUUseUJBQXlCO2FBQ25DLENBQUM7WUFDRixVQUFVLEVBQUUscUJBQXFCO1NBQ2xDLENBQUMsQ0FBQztRQUVILE1BQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsZUFBZSxFQUFFO1lBQ2xFLE1BQU0sRUFBRSxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztnQkFDdEMsT0FBTyxFQUFFLHNCQUFzQjthQUNoQyxDQUFDO1lBQ0YsVUFBVSxFQUFFLGtCQUFrQjtTQUMvQixDQUFDLENBQUM7UUFFSCxNQUFNLE9BQU8sR0FBRyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRWpFLGdFQUFnRTtRQUNoRSxNQUFNLFFBQVEsR0FBRyxJQUFJLGFBQWEsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLHlCQUF5QixDQUFDLENBQUM7UUFFN0UsMkRBQTJEO1FBQzNELFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDakMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNqQyxRQUFRLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBRWpDLG1EQUFtRDtRQUNuRCxRQUFRLENBQUMsUUFBUSxDQUFDLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFdEMsNkJBQTZCO1FBQzdCLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFakMsMENBQTBDO1FBQzFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFdkIsaUJBQWlCO1FBRWpCLE1BQU0sS0FBSyxHQUFHLGFBQWEsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRWxELHlCQUF5QjtRQUV6QixJQUFJLGFBQWEsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQzNELFVBQVUsRUFBRSxLQUFLO1NBQ2xCLENBQUMsQ0FBQztJQUVMLENBQUM7Q0FDRjtBQTlERCxrREE4REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTdGFjaywgU3RhY2tQcm9wcyB9IGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgc3RlcEZ1bmN0aW9ucyBmcm9tICdhd3MtY2RrLWxpYi9hd3Mtc3RlcGZ1bmN0aW9ucyc7XG5pbXBvcnQgKiBhcyBzdGVwRnVuY3Rpb25zVGFza3MgZnJvbSAnYXdzLWNkay1saWIvYXdzLXN0ZXBmdW5jdGlvbnMtdGFza3MnO1xuXG5leHBvcnQgY2xhc3MgU3RlcDAzUGFyYWxsZWxTdGFjayBleHRlbmRzIFN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBTdGFja1Byb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG5cbiAgICBjb25zdCBwYXJhbGxlbEJyYW5jaDEgPSBuZXcgc3RlcEZ1bmN0aW9ucy5QYXNzKHRoaXMsIFwicGFyYWxsZWxCcmFuY2gxXCIsIHtcbiAgICAgIHJlc3VsdDogc3RlcEZ1bmN0aW9ucy5SZXN1bHQuZnJvbU9iamVjdCh7XG4gICAgICAgIG1lc3NhZ2U6IFwiaGVsbG8gcGFyYWxsZWwgYnJhbmNoIDFcIixcbiAgICAgIH0pLFxuICAgICAgcmVzdWx0UGF0aDogXCIkLnBhcmFsbGVsX2JyYW5jaF8xXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXJhbGxlbEJyYW5jaDIgPSBuZXcgc3RlcEZ1bmN0aW9ucy5QYXNzKHRoaXMsIFwicGFyYWxsZWxCcmFuY2gyXCIsIHtcbiAgICAgIHJlc3VsdDogc3RlcEZ1bmN0aW9ucy5SZXN1bHQuZnJvbU9iamVjdCh7XG4gICAgICAgIG1lc3NhZ2U6IFwiaGVsbG8gcGFyYWxsZWwgYnJhbmNoIDJcIixcbiAgICAgIH0pLFxuICAgICAgcmVzdWx0UGF0aDogXCIkLnBhcmFsbGVsX2JyYW5jaF8yXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBwYXJhbGxlbEJyYW5jaDMgPSBuZXcgc3RlcEZ1bmN0aW9ucy5QYXNzKHRoaXMsIFwicGFyYWxsZWxCcmFuY2gzXCIsIHtcbiAgICAgIHJlc3VsdDogc3RlcEZ1bmN0aW9ucy5SZXN1bHQuZnJvbU9iamVjdCh7XG4gICAgICAgIG1lc3NhZ2U6IFwiaGVsbG8gcGFyYWxsZWwgYnJhbmNoIDNcIixcbiAgICAgIH0pLFxuICAgICAgcmVzdWx0UGF0aDogXCIkLnBhcmFsbGVsX2JyYW5jaF8zXCIsXG4gICAgfSk7XG5cbiAgICBjb25zdCBmYWlsdXJlQnJhbmNoID0gbmV3IHN0ZXBGdW5jdGlvbnMuUGFzcyh0aGlzLCBcImZhaWx1cmVCcmFuY2hcIiwge1xuICAgICAgcmVzdWx0OiBzdGVwRnVuY3Rpb25zLlJlc3VsdC5mcm9tT2JqZWN0KHtcbiAgICAgICAgbWVzc2FnZTogXCJoZWxsbyBmYWlsdXJlIGJyYW5jaFwiLFxuICAgICAgfSksXG4gICAgICByZXN1bHRQYXRoOiBcIiQuZmFpbHVyZV9icmFuY2hcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IHN1Y2Nlc3MgPSBuZXcgc3RlcEZ1bmN0aW9ucy5TdWNjZWVkKHRoaXMsIFwic3VjY2Vzc0JyYW5jaFwiKTtcblxuICAgIC8vZGVmaW5pbmcgcGFyYWxsZWwgZm9yIHRoZSBicmFuY2ggdG8gcnVuIGFsbCB0aGluZ3MgaW4gcGFyYWxsZWxcbiAgICBjb25zdCBwYXJhbGxlbCA9IG5ldyBzdGVwRnVuY3Rpb25zLlBhcmFsbGVsKHRoaXMsIFwiRG8gdGhlIHdvcmsgaW4gcGFyYWxsZWxcIik7XG5cbiAgICAvLyBBZGQgYnJhbmNoZXMgdG8gYmUgZXhlY3V0ZWQgaW4gcGFyYWxsZWwgYXQgdGhlIHNhbWUgdGltZVxuICAgIHBhcmFsbGVsLmJyYW5jaChwYXJhbGxlbEJyYW5jaDEpO1xuICAgIHBhcmFsbGVsLmJyYW5jaChwYXJhbGxlbEJyYW5jaDIpO1xuICAgIHBhcmFsbGVsLmJyYW5jaChwYXJhbGxlbEJyYW5jaDMpO1xuXG4gICAgLy8gUmV0cnkgdGhlIHdob2xlIHdvcmtmbG93IGlmIHNvbWV0aGluZyBnb2VzIHdyb25nXG4gICAgcGFyYWxsZWwuYWRkUmV0cnkoeyBtYXhBdHRlbXB0czogMSB9KTtcblxuICAgIC8vIEhvdyB0byByZWNvdmVyIGZyb20gZXJyb3JzXG4gICAgcGFyYWxsZWwuYWRkQ2F0Y2goZmFpbHVyZUJyYW5jaCk7XG5cbiAgICAvLyBXaGF0IHRvIGRvIGluIGNhc2UgZXZlcnl0aGluZyBzdWNjZWVkZWRcbiAgICBwYXJhbGxlbC5uZXh0KHN1Y2Nlc3MpO1xuXG4gICAgLy8gY3JlYXRlIGEgY2hhaW5cblxuICAgIGNvbnN0IGNoYWluID0gc3RlcEZ1bmN0aW9ucy5DaGFpbi5zdGFydChwYXJhbGxlbCk7XG5cbiAgICAvLyBjcmVhdGUgYSBzdGF0ZSBtYWNoaW5lXG5cbiAgICBuZXcgc3RlcEZ1bmN0aW9ucy5TdGF0ZU1hY2hpbmUodGhpcywgXCJwYXJhbGxlbFN0YXRlTWFjaGluZVwiLCB7XG4gICAgICBkZWZpbml0aW9uOiBjaGFpbixcbiAgICB9KTtcblxuICB9XG59XG4iXX0=