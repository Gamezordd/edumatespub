import { RegisterFieldType } from './types';
import { DropdownItemProps } from 'semantic-ui-react';

/*
TODO: Make all fields for users. StudentFields and AmbassadorFields are keys inside the data map.

Refer to this link for icon values:
https://react.semantic-ui.com/elements/icon/

Update type interface in ./types.ts
*/

export const Genders: DropdownItemProps[] = [
	{ icon: 'man', value: 'male', text: 'Male' },
	{ icon: 'woman', value: 'female', text: 'Female' },
	{ icon: 'intersex', value: 'other', text: 'Other' },
];
export const SubjectInterests: DropdownItemProps[] = [
	{ value: 'Accounting and Finance', text: 'Accounting and Finance' },
	{ value: 'Aerospace Engineering', text: 'Aerospace Engineering' },
	{ value: 'Agriculture', text: 'Agriculture' },
	{ value: 'Air Transport Management', text: 'Air Transport Management' },
	{ value: 'American Studies', text: 'American Studies' },
	{ value: 'Animation', text: 'Animation' },
	{ value: 'Anthropology', text: 'Anthropology' },
	{ value: 'Architecture', text: 'Architecture' },
	{
		value: 'Architecture and Environmental Design',
		text: 'Architecture and Environmental Design',
	},
	{ value: 'Art', text: 'Art' },
	{ value: 'Biotechnology', text: 'Biotechnology' },
	{ value: 'Business and Management', text: 'Business and Management' },
	{ value: 'Chemistry', text: 'Chemistry' },
	{ value: 'Computer Science', text: 'Computer Science' },
	{ value: 'Dance', text: 'Dance' },
	{ value: 'Dentistry', text: 'Dentistry' },
	{ value: 'Design and Crafts', text: 'Design and Crafts' },
	{ value: 'Development Studies', text: 'Development Studies' },
	{ value: 'Digital Media', text: 'Digital Media' },
	{ value: 'Economics', text: 'Economics' },
	{ value: 'Education Studies', text: 'Education Studies' },
	{ value: 'Engineering', text: 'Engineering' },
	{ value: 'English Literature', text: 'English Literature' },
	{ value: 'Fashion Design', text: 'Fashion Design' },
	{ value: 'Film Production', text: 'Film Production' },
	{ value: 'Film Studies', text: 'Film Studies' },
	{ value: 'Floristry', text: 'Floristry' },
	{ value: 'Food Science', text: 'Food Science' },
	{ value: 'Forensic Science', text: 'Forensic Science' },
	{ value: 'Hospitality and Tourism', text: 'Hospitality and Tourism' },
	{ value: 'Hotel Management', text: 'Hotel Management' },
	{ value: 'Human Resources Management', text: 'Human Resources Management' },
	{ value: 'Interior Design', text: 'Interior Design' },
	{ value: 'International Relations', text: 'International Relations' },
	{ value: 'Journalism', text: 'Journalism' },
	{ value: 'Liberal Arts', text: 'Liberal Arts' },
	{ value: 'Linguistics', text: 'Linguistics' },
	{ value: 'Bachelor of Laws', text: 'Bachelor of Laws' },
	{ value: 'Master of Laws', text: 'Master of Laws' },
	{ value: 'Marketing', text: 'Marketing' },
	{ value: 'Mathematics', text: 'Mathematics' },
	{ value: 'Media and Communications', text: 'Media and Communications' },
	{ value: 'Medicine', text: 'Medicine' },
	{ value: 'Music', text: 'Music' },
	{ value: 'Nursing', text: 'Nursing' },
	{ value: 'Oil and Gas Engineering', text: 'Oil and Gas Engineering' },
	{ value: 'Oil and Gas Management', text: 'Oil and Gas Management' },
	{ value: 'Pharmacy', text: 'Pharmacy' },
	{ value: 'Physiotherapy', text: 'Physiotherapy' },
	{ value: 'Politics', text: 'Politics' },
	{ value: 'Psychology Social Work', text: 'Psychology Social Work' },
	{ value: 'Sociology', text: 'Sociology' },
	{ value: 'Sports Science', text: 'Sports Science' },
	{ value: 'Supply Chain and Logistics', text: 'Supply Chain and Logistics' },
	{ value: 'TESOL', text: 'TESOL' },
	{ value: 'Veterinary Medicine', text: 'Veterinary Medicine' },
];

export const SportsInterests: DropdownItemProps[] = [
	{ value: 'American Football', text: 'American Football' },
	{ value: 'Archery', text: 'Archery' },
	{ value: 'Athletics', text: 'Athletics' },
	{ value: 'Badminton', text: 'Badminton' },
	{ value: 'Baseball', text: 'Baseball' },
	{ value: 'Basketball', text: 'Basketball' },
	{ value: 'Bowls', text: 'Bowls' },
	{ value: 'Boxing', text: 'Boxing' },
	{ value: 'Canoeing', text: 'Canoeing' },
	{ value: 'Cricket', text: 'Cricket' },
	{ value: 'Curling', text: 'Curling' },
	{ value: 'Cycling', text: 'Cycling' },
	{ value: 'Darts', text: 'Darts' },
	{ value: 'Disability Sport', text: 'Disability Sport' },
	{ value: 'Diving', text: 'Diving' },
	{ value: 'Equestrian', text: 'Equestrian' },
	{ value: 'Fencing', text: 'Fencing' },
	{ value: 'Football', text: 'Football' },
	{ value: 'Formula 1', text: 'Formula 1' },
	{ value: 'Gaelic Games', text: 'Gaelic Games' },
	{ value: 'Golf', text: 'Golf' },
	{ value: 'Gymnastics', text: 'Gymnastics' },
	{ value: 'Handball', text: 'Handball' },
	{ value: 'Hockey', text: 'Hockey' },
	{ value: 'Horse Racing', text: 'Horse Racing' },
	{ value: 'Ice Hockey', text: 'Ice Hockey' },
	{ value: 'Judo', text: 'Judo' },
	{ value: 'Mixed Martial Arts', text: 'Mixed Martial Arts' },
	{ value: 'Modern Pentathlon', text: 'Modern Pentathlon' },
	{ value: 'Motorsport', text: 'Motorsport' },
	{ value: 'Netball', text: 'Netball' },
	{ value: 'Olympic Sports', text: 'Olympic Sports' },
	{ value: 'Rowing', text: 'Rowing' },
	{ value: 'Rugby League', text: 'Rugby League' },
	{ value: 'Rugby Union', text: 'Rugby Union' },
	{ value: 'Sailing', text: 'Sailing' },
	{ value: 'Shooting', text: 'Shooting' },
	{ value: 'Snooker', text: 'Snooker' },
	{ value: 'Squash', text: 'Squash' },
	{ value: 'Swimming', text: 'Swimming' },
	{ value: 'Table Tennis', text: 'Table Tennis' },
	{ value: 'Taekwondo', text: 'Taekwondo' },
	{ value: 'Tennis', text: 'Tennis' },
	{ value: 'Triathlon', text: 'Triathlon' },
	{ value: 'Volleyball', text: 'Volleyball' },
	{ value: 'Weightlifting', text: 'Weightlifting' },
	{ value: 'Winter Sports', text: 'Winter Sports' },
	{ value: 'Wrestling', text: 'Wrestling' },
];

export const ExtraCurricular: DropdownItemProps[] = [
	{ value: 'Musical Instruments', text: 'Musical Instruments ' },
	{
		value: 'Choirs — community or religious',
		text: 'Choirs — community or religious',
	},
	{ value: 'Marching bands', text: 'Marching bands' },
	{ value: 'Singing lessons', text: 'Singing lessons' },
	{
		value: 'Sound engineering or mixing classes for older children',
		text: 'Sound engineering or mixing classes for older children',
	},
	{
		value: 'Drawing and painting classes',
		text: 'Drawing and painting classes',
	},
	{ value: 'Animation', text: 'Animation' },
	{ value: 'Graphic design', text: 'Graphic design' },
	{ value: 'Fashion design', text: 'Fashion design' },
	{ value: 'Photography', text: 'Photography' },
	{ value: 'Weaving', text: 'Weaving' },
	{ value: 'Jewelry design', text: 'Jewelry design' },
	{ value: 'Sewing', text: 'Sewing' },
	{ value: 'Sculpture', text: 'Sculpture' },
	{ value: 'Language clubs or classes', text: 'Language clubs or classes' },
	{
		value: 'Poetry clubs, classes or workshops',
		text: 'Poetry clubs, classes or workshops',
	},
	{ value: 'Storytelling sessions', text: 'Storytelling sessions' },
	{
		value: 'Creative writing classes or clubs',
		text: 'Creative writing classes or clubs',
	},
	{
		value: 'Working on a school magazine or journal',
		text: 'Working on a school magazine or journal',
	},
	{ value: 'Journalism or media clubs', text: 'Journalism or media clubs' },
	{ value: 'Movie making', text: 'Movie making' },
	{ value: 'Debate clubs', text: 'Debate clubs' },
	{ value: 'Clubs for advanced math', text: 'Clubs for advanced math' },
	{
		value:
			'Clubs for the sciences (Physics, Biology, Chemistry, Astronomy, etc.)',
		text:
			'Clubs for the sciences (Physics, Biology, Chemistry, Astronomy, etc.)',
	},
	{ value: 'Engineering clubs', text: 'Engineering clubs' },
	{ value: 'Electronics clubs', text: 'Electronics clubs' },
	{ value: 'Economics clubs', text: 'Economics clubs' },
	{
		value: 'Web design/coding clubs or classes',
		text: 'Web design/coding clubs or classes',
	},
	{
		value: 'Choreography or dance clubs/classes',
		text: 'Choreography or dance clubs/classes',
	},
	{
		value:
			'Sports such as football, basketball, volleyball, cricket, swimming etc.',
		text:
			'Sports such as football, basketball, volleyball, cricket, swimming etc.',
	},
	{ value: 'Martial arts classes', text: 'Martial arts classes' },
	{ value: 'Acting classes', text: 'Acting classes' },
	{ value: 'Gymnastics', text: 'Gymnastics' },
	{ value: 'Ballet', text: 'Ballet' },
	{ value: 'MUN (Model United Nations)', text: 'MUN (Model United Nations)' },
	{ value: 'Student Council', text: 'Student Council' },
	{
		value:
			'Community service (volunteering in orphanages or old age homes, running charity drives, etc.)',
		text:
			'Community service (volunteering in orphanages or old age homes, running charity drives, etc.)',
	},
	{ value: 'Yoga classes', text: 'Yoga classes' },
	{ value: 'Meditation', text: 'Meditation' },
	{ value: 'Psychology Club', text: 'Psychology Club' },
	{ value: 'Environmental Club', text: 'Environmental Club' },
	{ value: 'Gardening', text: 'Gardening' },
	{ value: 'Working at animal shelters', text: 'Working at animal shelters' },
];

export const UserTypes: DropdownItemProps[] = [
	{ value: 'ambassador', text: 'Ambassador' },
	{ value: 'student', text: 'Student' },
];
export const Years: DropdownItemProps[] = [
	{ value: '0', text: '0' },
	{ value: '1', text: '1' },
	{ value: '2', text: '2' },
	{ value: '3', text: '3' },
	{ value: '4', text: '4' },
	{ value: '5', text: '5' },
	{ value: '6', text: '6' },
	{ value: '7', text: '7' },
	{ value: '8', text: '8' },
	{ value: '9', text: '9' },
	{ value: '10+', text: '10+' },
];

export const RadioQuestions = [
	{ ques: 'University Rank:', key: 'universityRank' },
	{ ques: 'University Location:', key: 'universityLocation' },
	{ ques: 'Courses you are applying to:', key: 'coursesApplying' },
	{ ques: 'Sports facilities:', key: 'sportsFacilities' },
	{ ques: 'Societies offered by University:', key: 'societiesOffered' },
	{ ques: 'Enterprise opportunities:', key: 'enterpriseOpportunities' },
	{ ques: 'Overall Student Experience:', key: 'overallExperience' },
	{ ques: 'Networking Oppurtunities:', key: 'networkingOpportunities' },
	{ ques: 'Desired population in University', key: 'desiredPopulation' },
];

export const CommonFields: RegisterFieldType[] = [
	{
		key: 'email',
		validate: 'email',
		properties: {
			type: 'text',
			placeholder: 'E-mail',
			icon: 'mail',
			required: true,
			iconPosition: 'left',
		},
	},
	{
		key: 'phone',
		validate: 'phone',
		properties: {
			type: 'text',
			placeholder: 'Mobile no',
			icon: 'phone',
			required: true,
			iconPosition: 'left',
		},
	},
	{
		key: 'name',
		validate: 'name',
		properties: {
			type: 'name',
			placeholder: 'Name',
			icon: 'user',
			required: true,
			iconPosition: 'left',
		},
	},
	{
		key: 'password',
		validate: 'password',
		properties: {
			type: 'password',
			placeholder: 'Password:',
			icon: 'lock',
			required: true,
			iconPosition: 'left',
		},
	},
];

export const StudentFields: RegisterFieldType[] = [
	{
		key: 'currentInstitute',
		validate: 'name',
		properties: {
			type: 'text',
			placeholder: 'Current Institute:',
			icon: 'university',
			required: true,
			iconPosition: 'left',
		},
	},
];

export const AmbassadorFields: RegisterFieldType[] = [
	{
		key: 'code',
		validate: 'code',
		properties: {
			type: 'text',
			placeholder: 'Access Code:',
			icon: 'tag',
			required: true,
			iconPosition: 'left',
		},
	},
];
