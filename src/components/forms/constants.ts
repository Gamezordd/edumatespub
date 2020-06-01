export enum validators {
	EMAIL = '/^(([^<>()[].,;:s@"]+(.[^<>()[].,;:s@"]+)*)|(".+"))@(([^<>()[].,;:s@"]+.)+[^<>()[].,;:s@"]{2,})$/i',
	PASSWORD = '^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$',
}

export enum messages {
	EMAIL = 'Enter calid email',
	PASSWORD = 'Must contain at least 1 letter and 1 number. Minimum 8 characters.',
}
