"use strict";
exports.handler = (event) => {
    console.log(event);
    if (event.operationSuccessful) {
        console.log("The data was added successfully");
    }
    else {
        console.log("The data was not added to the database");
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNob1N0YXR1cy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImVjaG9TdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUlBLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxLQUFZLEVBQUUsRUFBRTtJQUUvQixPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRW5CLElBQUksS0FBSyxDQUFDLG1CQUFtQixFQUFFO1FBQzNCLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUNBQWlDLENBQUMsQ0FBQztLQUNsRDtTQUFNO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQyxDQUFDO0tBQ3pEO0FBRUwsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsidHlwZSBFdmVudCA9IHtcbiAgICBvcGVyYXRpb25TdWNjZXNzZnVsOiBCb29sZWFuXG59XG5cbmV4cG9ydHMuaGFuZGxlciA9IChldmVudDogRXZlbnQpID0+IHtcblxuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcblxuICAgIGlmIChldmVudC5vcGVyYXRpb25TdWNjZXNzZnVsKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiVGhlIGRhdGEgd2FzIGFkZGVkIHN1Y2Nlc3NmdWxseVwiKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRoZSBkYXRhIHdhcyBub3QgYWRkZWQgdG8gdGhlIGRhdGFiYXNlXCIpO1xuICAgIH1cblxufSJdfQ==