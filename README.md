# step20_step_functions

- Step functions basically do orchestration therefore they will going to tell which will be going to run , which lambda function will going to run .
- step functions basically tells which thing to run though , it changes the state basically therefore it will going to know what to do then therefore the next task what to do , it can be the steps in the lambda functions to run firstly a lambda then the second lambda and then the third according to the conditions and the priorities.
- Step Functions can be used to any of the service which ever we use.
- Step functions tells us about the workflow of the series of event driven steps.
- If we have 5 lambda functions and each one has a particular task , which lambda will firstly going to run , so we need to define the steps , it will going to run on the basis of the priorities , moreover the first input of the step function can be the event of the first lambda function , and the output of this lambda function can be the event of the second lambda function and then the output of that lambda function has branches - basically condition that if the output is true - so run this lambda (3) function else - if output is false run this lambda function.
- Step Functions is based on state machines and tasks. A state machine is a workflow. A task is a state in a workflow that represents a single unit of work that another AWS service performs. Each step in a workflow is a state.
- With Step Functions' built-in controls, you examine the state of each step in your workflow to make sure that your application runs in order and as expected. Depending on your use case, you can have Step Functions call AWS services, such as Lambda, to perform tasks.
- The best thing about step functions is that they nicely integrate with the event-driven architectures as they innately generate events and can also be triggered by them.

## Use Cases 0f Step Functions

- Chaining - run this first then the second one
- branching - runs lambda on the basis of the conditon
- Error handling - it uses try and catch basically , running a particular lambda for times then if it fails so then it runs the next lambda function.
- human in the loop - It works like chainging but in between it takes the input from any of the person.
- parallel processing - in parallel processing we can run many lambda functions at a particular time simultaneously.
- dynamic parallelism - Its basically the complex of chaining of the lambda function which works in complex form , So it tells us how in many ways we can use the step functions in the application.

### Sequence of Step function - how to define in stack

- create your steps for the step function
- create a chain to define the sequence of your steps - basically telling how to run
- Refer your chain to the state-machine - just create the state machine and it will execute the step functions.

## Implementation

- payload - next event has the input and it is inside the payload
- If there is Pass Step-function so its the step - there we donot need to tell that about service.
- pass - pass step just gives the pass input just add the output object to it as well,
- wait - wait step just delay the step for some time and then forward it and wait doesnot have any result change therefore in the step. It just makes us wait for the output just
- choice - there will be a condition whether its succeded or failed.
- parallel - works simultaneiusly
- map - it works similar to the function as map in javascript , it expects an array in the map for every particular iteration , it particularly runs the action.

# Conclusion

- Step Function is a better soution than the event bridge as there is rollback and many usecases.

- event bridge is not tightly coupled but difficult to debug, while in the step function its coupled hard but easy to debug.
