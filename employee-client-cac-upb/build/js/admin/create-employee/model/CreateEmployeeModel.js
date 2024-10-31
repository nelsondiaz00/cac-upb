import Environment from '../../../shared/types/Environment.js';
import Subject from '../../../shared/types/Subject.js';
export default class CreateEmployeeModel extends Subject {
    constructor() {
        super();
    }
    init = async () => {
        // console.log('appointment model init');
        this.notifyAllObservers();
    };
    createEmployee = async (employee) => {
        const response = await fetch(await Environment.createEmployee(), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: employee.getName(),
                lastname: employee.getLastname(),
                identification: employee.getIdentification(),
                birthday: employee.getBirthday().toISOString(),
                address: employee.getAddress(),
                email: employee.getEmail(),
                password: employee.getPassword(),
                role: employee.getRole(),
            }),
        });
        // const errorData = await response.json();
        if (!response.ok) {
            console.log('Error creating appointment');
            return false;
        }
        else {
            console.log('Appointment created');
            return true;
        }
    };
}
