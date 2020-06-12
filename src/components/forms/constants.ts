export const validators = {
	email: {
		regex: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$',
		message: 'Enter valid email',
	},
	password: {
		regex: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{6,15}$',
		message:
			'Must be at least six characters. One upper and lower case letter each and a number.',
	},
	phone: {
		regex: '^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$',
		message: 'Enter valid phone number',
	},
	any: { regex: '[\\s\\S]*', message: '' },
	name: {
		regex: "^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
		message: 'Invalid Name',
	},
	code: { regex: '^[0-9A-Z\\-]{8,9}$', message: 'Enter valid code format.' },
};

export interface ValidatorType {
	email: string;
	password: string;
	name: string;
	any: string;
	phone: number;
	code: string;
}
