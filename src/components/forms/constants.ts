export const validators = {
	email: {
		regex: '^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$',
		message: 'Enter valid email',
	},
	password: { regex: '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$', message: '' },
	any: { regex: '[\\s\\S]*', message: '' },
};

export interface ValidatorType {
	email: string;
	password: string;
	any: string;
}
