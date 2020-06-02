import React from 'react';
import { Grid } from 'semantic-ui-react';
import pic from './assets/google-play-badge.png';
import app from './assets/app.png';
import talking from './assets/people-talking.png';
import talking2 from './assets/people-talking2.png';
import insta from './assets/instagram.png';
import twitter from './assets/twitter.png';
import linkedin from './assets/linkedin.png';
import logo from './assets/logo.png';
import user from './assets/user.png';

import chat from './assets/chat.png';

import './Landing.css';

export const LandingPage: React.FC<{}> = ({}) => (
	<div>
		<Grid>
			<Grid.Row centered columns='2' className='banner'>
				<Grid.Column width={5}>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>{' '}
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
						<p className='promo-title'>
							{' '}
							CONNECTING YOU TO YOUR DREAM UNIVERSITY{' '}
						</p>
					</Grid.Row>{' '}
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
						{' '}
						<p className='add'>
							Take your first step towards your dream university with us. We do
							all the hardwork and get you in touch with the university of your
							choice ! Keep the conversation going !{' '}
						</p>{' '}
					</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='play'>
						{' '}
						<img src={pic} className='playstore' />{' '}
					</Grid.Row>{' '}
					<Grid.Row className='Hidden'>....</Grid.Row>
				</Grid.Column>

				<Grid.Column width={7}>
					<Grid.Row className='Hidden'>....</Grid.Row>{' '}
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
						<img src={app} className='Appimage' />
					</Grid.Row>{' '}
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				{' '}
				<h1> What we do </h1>
			</Grid.Row>
			<Grid.Row className='Hidden'>....</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={4}>
					<img src={talking} className='whatwedo' />{' '}
				</Grid.Column>
				<Grid.Column width={4}>
					{' '}
					<img src={talking2} className='whatwedo' height='100%' />
				</Grid.Column>
				<Grid.Column width={4}>
					{' '}
					<img src={talking} className='whatwedo' />
				</Grid.Column>{' '}
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={4}>
					{' '}
					<h4> Get in touch with your new university </h4>
				</Grid.Column>
				<Grid.Column width={4}>
					{' '}
					<h4> We help you ease those nerves. </h4>
				</Grid.Column>
				<Grid.Column width={4}>
					{' '}
					<h4> We've partnered with over 2000 universities </h4>
				</Grid.Column>{' '}
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={4}>
					<p className='descwedo'>
						{' '}
						With our easy to use app, get chatting with your new university
						ambassador. Ease those nerves{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={4}>
					<p className='descwedo'>
						{' '}
						Your university ambassador will be able to help calm your questions.{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={4}>
					<p className='descwedo'>
						{' '}
						We have the most extensive network of university ambassador -
						student communication.{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column></Grid.Column>
				<Grid.Column width={5}></Grid.Column>{' '}
				<Grid.Column width={5}>
					<button type='button' className='btn-primary'>
						<p className='Button'> All Services </p>{' '}
					</button>{' '}
				</Grid.Column>
				<Grid.Column width={5}></Grid.Column> <Grid.Column></Grid.Column>
			</Grid.Row>
			<Grid.Row centered columns={1} only='mobile'>
				<Grid.Column width={14}>
					<Grid.Row className='Hidden'>........</Grid.Row>
					<Grid.Row className='Hidden'>........</Grid.Row>

					<Grid.Row>
						{' '}
						<img src={talking} className='whatwedo' />{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<h4> Get in touch with your new university </h4>{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<p className='descwedo'>
							{' '}
							With our easy to use app, get chatting with your new university
							ambassador. Ease those nerves{' '}
						</p>{' '}
					</Grid.Row>

					<Grid.Row className='Hidden'>........</Grid.Row>
					<Grid.Row className='Hidden'>........</Grid.Row>

					<Grid.Row>
						{' '}
						<img src={talking2} className='whatwedo' height='100%' />{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<h4> We help you ease those nerves. </h4>{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<p className='descwedo'>
							{' '}
							Your university ambassador will be able to help calm your
							questions.{' '}
						</p>{' '}
					</Grid.Row>

					<Grid.Row className='Hidden'>........</Grid.Row>
					<Grid.Row className='Hidden'>........</Grid.Row>

					<Grid.Row>
						{' '}
						<img src={talking} className='whatwedo' />{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<h4> We've partnered with over 2000 universities </h4>{' '}
					</Grid.Row>

					<Grid.Row>
						{' '}
						<p className='descwedo'>
							{' '}
							We have the most extensive network of university ambassador -
							student communication.{' '}
						</p>{' '}
					</Grid.Row>
				</Grid.Column>{' '}
			</Grid.Row>
			<Grid.Row only='mobile' columns={1} centered>
				<Grid.Column width={6}>
					<button type='button' className='btn-primary'>
						<p className='Button'> All Services </p>{' '}
					</button>{' '}
				</Grid.Column>
			</Grid.Row>
			<Grid.Row only='tablet'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={4}>
					<img src={talking} className='whatwedo' />{' '}
				</Grid.Column>
				<Grid.Column width={4}>
					{' '}
					<img src={talking2} className='whatwedo' height='100%' />
				</Grid.Column>
				<Grid.Column width={4}>
					{' '}
					<img src={talking} className='whatwedo' />
				</Grid.Column>{' '}
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='tablet'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={4}>
					{' '}
					<h4> Get in touch with your new university </h4>
				</Grid.Column>
				<Grid.Column width={4}>
					{' '}
					<h4> We help you ease those nerves. </h4>
				</Grid.Column>
				<Grid.Column width={4}>
					{' '}
					<h4> We've partnered with over 2000 universities </h4>
				</Grid.Column>{' '}
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='tablet'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={4}>
					<p className='descwedo'>
						{' '}
						With our easy to use app, get chatting with your new university
						ambassador. Ease those nerves{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={4}>
					<p className='descwedo'>
						{' '}
						Your university ambassador will be able to help calm your questions.{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={4}>
					<p className='descwedo'>
						{' '}
						We have the most extensive network of university ambassador -
						student communication.{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='tablet'>
				<Grid.Column></Grid.Column>
				<Grid.Column width={5}></Grid.Column>{' '}
				<Grid.Column width={5}>
					<button type='button' className='btn-primary'>
						<p className='Button'> All Services </p>{' '}
					</button>{' '}
				</Grid.Column>
				<Grid.Column width={5}></Grid.Column> <Grid.Column></Grid.Column>
			</Grid.Row>
			<Grid.Row>
				{' '}
				<h1> Why choose us? </h1>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					<Grid.Row className='Hidden'>................</Grid.Row>
					<Grid.Row className='Hidden'>................</Grid.Row>
					<ul>
						<li>
							<p className='list'> Chat with ambassadors</p>
						</li>
						<li>
							<p className='list'> Bookmark Universities</p>
						</li>
						<li>
							<p className='list'> Accomodation Information</p>{' '}
						</li>
						<li>
							<p className='list'> Mark your favourites</p>
						</li>

						<li>
							{' '}
							<p className='list'>Never miss out on university deadlines </p>
						</li>
						<li>
							<p className='list'> We are experts </p>
						</li>
					</ul>
				</Grid.Column>
				<Grid.Column width={6}>
					{' '}
					<Grid.Row className='Hidden'>................</Grid.Row>{' '}
					<Grid.Row className='Hidden'>................</Grid.Row>{' '}
					<Grid.Row className='Hidden'>................</Grid.Row>{' '}
					<Grid.Row>
						<img src={chat} className='Phone' />
					</Grid.Row>
				</Grid.Column>{' '}
				<Grid.Column width={3} className='Hidden'>
					{' '}
					...............{' '}
				</Grid.Column>
			</Grid.Row>
			<Grid.Row only='tablet' columns={2} centered>
				<Grid.Column width={6}>
					<Grid.Row className='Hidden'>................</Grid.Row>
					<Grid.Row className='Hidden'>................</Grid.Row>
					<ul>
						<li>
							<p className='list'> Chat with ambassadors</p>
						</li>
						<li>
							<p className='list'> Bookmark Universities</p>
						</li>
						<li>
							<p className='list'> Accomodation Information</p>{' '}
						</li>
						<li>
							<p className='list'> Mark your favourites</p>
						</li>

						<li>
							{' '}
							<p className='list'>Never miss out on university deadlines </p>
						</li>
						<li>
							<p className='list'> We are experts </p>
						</li>
					</ul>
				</Grid.Column>
				<Grid.Column width={6}>
					{' '}
					<Grid.Row className='Hidden'>................</Grid.Row>{' '}
					<Grid.Row className='Hidden'>................</Grid.Row>{' '}
					<Grid.Row className='Hidden'>................</Grid.Row>{' '}
					<Grid.Row centered>
						<img src={chat} className='Phone' />
					</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row className='Hidden' only='mobile'></Grid.Row>{' '}
			<Grid.Row className='Hidden' only='mobile'></Grid.Row>
			<Grid.Row only='mobile' columns={2} centered>
				{' '}
				<Grid.Column width={14} textAlign='center'>
					<img src={chat} className='Phone' />{' '}
				</Grid.Column>
			</Grid.Row>
			<Grid.Row only='mobile' columns={1} centered>
				{' '}
				<Grid.Column width={10}>
					<ul>
						<li>
							<p className='list'> Chat with ambassadors</p>
						</li>
						<li>
							<p className='list'> Bookmark Universities</p>
						</li>
						<li>
							<p className='list'> Accomodation Information</p>{' '}
						</li>
						<li>
							<p className='list'> Mark your favourites</p>
						</li>
						<li>
							{' '}
							<p className='list'>Never miss out on university deadlines </p>
						</li>
						<li>
							<p className='list'> We are experts </p>
						</li>
					</ul>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row>
				{' '}
				<h1> User Reviews </h1>
			</Grid.Row>
			<Grid.Row className='Hidden'>................</Grid.Row>
			<Grid.Row centered columns={1} only='mobile'>
				<Grid.Column width={12}>
					<Grid.Row>
						<p className='Testimonial'>
							{' '}
							I love using this app. It has helped me settle into university
							life get started living in another country.{' '}
						</p>
					</Grid.Row>
					<Grid.Row>
						<img src={user} className='Phonescreenuserimg' width='20%' />
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>Jogn Doe</p>
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>
							Successfully settled into Aston University{' '}
						</p>
					</Grid.Row>
					<Grid.Row className='Hidden'>................</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row centered columns={1} only='mobile'>
				<Grid.Column width={12}>
					<Grid.Row>
						<p className='Testimonial'>
							{' '}
							I love using this app. It has helped me settle into university
							life get started living in another country.{' '}
						</p>
					</Grid.Row>
					<Grid.Row>
						<img src={user} className='Phonescreenuserimg' width='20%' />
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>Jogn Doe</p>
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>
							Successfully settled into Aston University{' '}
						</p>
					</Grid.Row>
					<Grid.Row className='Hidden'>................</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row centered columns={1}>
				<Grid.Column width={12} only='mobile'>
					<Grid.Row>
						<p className='Testimonial'>
							{' '}
							I love using this app. It has helped me settle into university
							life get started living in another country.{' '}
						</p>
					</Grid.Row>
					<Grid.Row>
						<img src={user} className='Phonescreenuserimg' width='20%' />
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>Jogn Doe</p>
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>
							Successfully settled into Aston University{' '}
						</p>
					</Grid.Row>
					<Grid.Row className='Hidden'>................</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row centered columns={1}>
				<Grid.Column width={12} only='mobile'>
					<Grid.Row>
						<p className='Testimonial'>
							{' '}
							I love using this app. It has helped me settle into university
							life get started living in another country.{' '}
						</p>
					</Grid.Row>
					<Grid.Row>
						<img src={user} className='Phonescreenuserimg' width='20%' />
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>Jogn Doe</p>
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>
							Successfully settled into Aston University{' '}
						</p>
					</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row centered columns={1} only='tablet'>
				<Grid.Column width={10}>
					<Grid.Row>
						<p className='Testimonial'>
							{' '}
							I love using this app. It has helped me settle into university
							life get started living in another country.{' '}
						</p>
					</Grid.Row>
					<Grid.Row>
						<img src={user} className='Phonescreenuserimg' width='20%' />
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>Jogn Doe</p>
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>
							Successfully settled into Aston University{' '}
						</p>
					</Grid.Row>
					<Grid.Row className='Hidden'>................</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row centered columns={1}>
				<Grid.Column width={10} only='tablet'>
					<Grid.Row>
						<p className='Testimonial'>
							{' '}
							I love using this app. It has helped me settle into university
							life get started living in another country.{' '}
						</p>
					</Grid.Row>
					<Grid.Row>
						<img src={user} className='Phonescreenuserimg' width='20%' />
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>Jogn Doe</p>
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>
							Successfully settled into Aston University{' '}
						</p>
					</Grid.Row>
					<Grid.Row className='Hidden'>................</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row centered columns={1}>
				<Grid.Column width={10} only='tablet'>
					<Grid.Row>
						<p className='Testimonial'>
							{' '}
							I love using this app. It has helped me settle into university
							life get started living in another country.{' '}
						</p>
					</Grid.Row>
					<Grid.Row>
						<img src={user} className='Phonescreenuserimg' width='20%' />
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>Jogn Doe</p>
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>
							Successfully settled into Aston University{' '}
						</p>
					</Grid.Row>
					<Grid.Row className='Hidden'>................</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row centered columns={1}>
				<Grid.Column width={10} only='tablet'>
					<Grid.Row>
						<p className='Testimonial'>
							{' '}
							I love using this app. It has helped me settle into university
							life get started living in another country.{' '}
						</p>
					</Grid.Row>
					<Grid.Row>
						<img src={user} className='Phonescreenuserimg' width='20%' />
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>Jogn Doe</p>
					</Grid.Row>
					<Grid.Row>
						<p className='Testimonial'>
							Successfully settled into Aston University{' '}
						</p>
					</Grid.Row>
					<Grid.Row className='Hidden'>................</Grid.Row>
				</Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<p className='Testimonial'>
						{' '}
						I love using this app. It has helped me settle into university life
						get started living in another country.{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<p className='Testimonial'>
						{' '}
						I love using this app. It has helped me settle into university life
						get started living in another country.{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={2}>
					{' '}
					<img src={user} width='55%' />{' '}
				</Grid.Column>
				<Grid.Column width={3}>
					{' '}
					<p className='Testimonial'>Jogn Doe</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={2}>
					{' '}
					<img src={user} width='55%' />{' '}
				</Grid.Column>
				<Grid.Column wuidth={3}>
					{' '}
					<p className='Testimonial'>Jogn Doe</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<p className='Testimonial'>
						{' '}
						Successfully settled into Aston University{' '}
					</p>
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<p className='Testimonial'>
						Successfully settled into Aston University{' '}
					</p>
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row className='Hidden' only='computer'>
				....
			</Grid.Row>
			<Grid.Row className='Hidden' only='computer'>
				....
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<p className='Testimonial'>
						{' '}
						I love using this app. It has helped me settle into university life
						get started living in another country.{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<p className='Testimonial'>
						{' '}
						I love using this app. It has helped me settle into university life
						get started living in another country.{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={2}>
					{' '}
					<img src={user} width='55%' />{' '}
				</Grid.Column>
				<Grid.Column width={3}>
					{' '}
					<p className='Testimonial'>Jogn Doe</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={2}>
					{' '}
					<img src={user} width='55%' />{' '}
				</Grid.Column>
				<Grid.Column wuidth={3}>
					{' '}
					<p className='Testimonial'>Jogn Doe</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row only='computer'>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<p className='Testimonial'>
						{' '}
						Successfully settled into Aston University{' '}
					</p>
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={5}>
					{' '}
					<p className='Testimonial'>
						Successfully settled into Aston University{' '}
					</p>{' '}
				</Grid.Column>
				<Grid.Column width={2}></Grid.Column>
			</Grid.Row>
			<Grid.Row className='Hidden' only='computer'>
				....
			</Grid.Row>
			<Grid.Row className='Hidden'>....</Grid.Row>
			<Grid.Row className='Media'>
				{' '}
				<h3>Find us on social media</h3>
			</Grid.Row>
			<Grid.Row className='social-icons'>
				<Grid.Column width={5}></Grid.Column>
				<Grid.Column width={2}>
					<img src={insta} className='Mediaimg' />{' '}
				</Grid.Column>
				<Grid.Column width={2}>
					{' '}
					<img src={linkedin} className='Mediaimg' />
				</Grid.Column>
				<Grid.Column width={2}>
					{' '}
					<img src={twitter} className='Mediaimg' />
				</Grid.Column>

				<Grid.Column width={5}></Grid.Column>
			</Grid.Row>
			<Grid.Row className='Media'></Grid.Row>
			<Grid.Row className='Hidden'>....</Grid.Row>
			<Grid.Row className='banner'>
				{' '}
				<Grid.Column></Grid.Column>
				<Grid.Column width={4}>
					<Grid.Row className='Hidden'>
						......................................................................................................................
						..........................................................................................................
						..................................................{' '}
					</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
						<h5>CONTACT US</h5>{' '}
					</Grid.Row>{' '}
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
						<p className='Endthing'> An Address </p>
					</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
						<p className='Endthing'> 99999999999 </p>
					</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
						<p className='Endthing'> xyz@gmail.com </p>
					</Grid.Row>
				</Grid.Column>{' '}
				<Grid.Column width={2}></Grid.Column>
				<Grid.Column width={8}>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
						<img src={logo} className='logo' />{' '}
					</Grid.Row>{' '}
					<Grid.Row className='Hidden'>....</Grid.Row>
					<Grid.Row>
						{' '}
						<p className='Endthing'>
							Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur
							aut illo similique corrupti hic delectus quis repellendus,
							nesciunt sequi quae autem quia? Amet ducimus perspiciatis incidunt
							necessitatibus ullam quisquam commodi!
						</p>{' '}
					</Grid.Row>
				</Grid.Column>{' '}
				<Grid.Column></Grid.Column>
			</Grid.Row>
		</Grid>
	</div>
);
