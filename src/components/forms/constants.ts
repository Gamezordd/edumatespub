export const validators = {
	email: {
		regex: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$',
		message: 'Enter valid email',
	},
	password: {
		regex: '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$',
		message: 'Enter valid password',
	},
	phone: { regex: '^[0-9]{8}', message: 'Enter valid phone number' },
	any: { regex: '[\\s\\S]*', message: '' },
	gre: {
		regex: '^([0-9]|[1-8][0-9]|9[0-9]|[12][0-9]{2}|3[0-3][0-9]|340)$',
		message: 'Enter valid GRE score',
	},
	gpa: {
		regex: '^([0]|[0-3].([0-9]{2})|[4].[0])$',
		message: 'Enter valdi GPA',
	},
};

export interface ValidatorType {
	email: string;
	password: string;
	any: string;
	phone: number;
	gre: number;
	gpa: number;
}
